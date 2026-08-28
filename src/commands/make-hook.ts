import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { pascalCase } from 'change-case';
import { renderTemplate } from '../utils/template.js';

export function registerMakeHookCommand(program: Command): void {
    program
        .command('make:hook [name]')
        .description('Generate custom React hook di src/shared/hooks/')
        .action(async (nameArg?: string) => {
            console.log(pc.cyan('\n🪝 Shared Hook Generator\n'));

            const hookInput = nameArg
                ? nameArg.trim()
                : await input({
                    message: 'Nama hook (misal: useLocalStorage, useModalState):',
                    validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
                });

            const rawClean = hookInput.startsWith('use') ? hookInput.substring(3) : hookInput;
            const namePascal = pascalCase(rawClean);
            const finalHookName = `use${namePascal}`;

            const targetDir = path.resolve(process.cwd(), 'src/shared/hooks');
            await fs.ensureDir(targetDir);

            const filePath = path.join(targetDir, `${finalHookName}.ts`);

            if (fs.existsSync(filePath)) {
                const overwrite = await confirm({
                    message: `Hook "${finalHookName}.ts" sudah ada. Timpa file?`,
                    default: false,
                });
                if (!overwrite) return;
            }

            await fs.writeFile(filePath, renderTemplate('shared/Hook.hbs', { name: namePascal }));
            console.log(pc.green(`✔ Hook dibuat di: ${filePath}\n`));
        });
}
