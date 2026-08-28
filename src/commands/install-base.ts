import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import degit from 'degit';
import ora from 'ora';
import { execSync } from 'child_process';

const BASE_TEMPLATE_REPO = 'github:username/base_react';

export function registerInstallBaseCommand(program: Command): void {
    program
        .command('install:base [targetDir]')
        .alias('init')
        .description('Clone Base React Vite template lengkap dengan Authentication dan AppRouter')
        .action(async (targetDirArg?: string) => {
            console.log(pc.cyan('\n🚀 Gotra Base React Installer\n'));

            const targetFolder = targetDirArg
                ? targetDirArg.trim()
                : await input({
                    message: 'Nama folder / direktori proyek:',
                    default: 'my-react-app',
                    validate: (val) => val.trim().length > 0 || 'Nama folder tidak boleh kosong',
                });

            const destinationPath = path.resolve(process.cwd(), targetFolder);

            if (fs.existsSync(destinationPath)) {
                const files = await fs.readdir(destinationPath);
                if (files.length > 0) {
                    const proceed = await confirm({
                        message: `Folder "${targetFolder}" sudah ada dan tidak kosong. Lanjutkan proses?`,
                        default: false,
                    });
                    if (!proceed) return;
                }
            }

            const spinner = ora('Mengunduh Base React Starter Template...').start();

            try {
                // 1. Download source code repo tanpa commit history
                const emitter = degit(BASE_TEMPLATE_REPO, {
                    cache: false,
                    force: true,
                    verbose: false,
                });

                await emitter.clone(destinationPath);
                spinner.succeed(pc.green('Base template berhasil diunduh!'));

                // 2. Install dependencies secara otomatis
                const installDeps = await confirm({
                    message: 'Install dependency sekarang (npm install)?',
                    default: true,
                });

                if (installDeps) {
                    const installSpinner = ora('Menginstall dependencies via npm...').start();
                    try {
                        execSync('npm install', { cwd: destinationPath, stdio: 'ignore' });
                        installSpinner.succeed(pc.green('Dependencies berhasil diinstall!'));
                    } catch (err) {
                        installSpinner.fail(pc.red('Gagal menginstall dependencies secara otomatis.'));
                    }
                }

                // 3. Inisialisasi Git baru
                try {
                    execSync('git init', { cwd: destinationPath, stdio: 'ignore' });
                } catch { }

                console.log(pc.cyan(`\n✨ Project siap digunakan di folder "${targetFolder}"!`));
                console.log(pc.white('\nLangkah selanjutnya:'));
                console.log(pc.yellow(`  cd ${targetFolder}`));
                console.log(pc.yellow(`  npm run dev\n`));

            } catch (error: any) {
                spinner.fail(pc.red(`Gagal mengunduh template: ${error.message}`));
            }
        });
}
