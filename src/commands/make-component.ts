import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { pascalCase } from 'change-case';
import { renderTemplate } from '../utils/template.js';

export function registerMakeComponentCommand(program: Command): void {
    program
        .command('make:component [name]')
        .description('Generate shared UI component di src/shared/components/')
        .action(async (nameArg?: string) => {
            console.log(pc.cyan('\n🧩 Shared Component Generator\n'));

            const componentName = nameArg
                ? nameArg.trim()
                : await input({
                    message: 'Nama component (misal: ButtonFilter, CardSummary):',
                    validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
                });

            const namePascal = pascalCase(componentName);
            const targetDir = path.resolve(process.cwd(), 'src/shared/components');

            await fs.ensureDir(targetDir);
            const filePath = path.join(targetDir, `${namePascal}.tsx`);

            if (fs.existsSync(filePath)) {
                const overwrite = await confirm({
                    message: `Component "${namePascal}.tsx" sudah ada. Timpa file?`,
                    default: false,
                });
                if (!overwrite) return;
            }

            await fs.writeFile(filePath, renderTemplate('shared/Component.hbs', { name: componentName }));
            console.log(pc.green(`✔ Component dibuat di: ${filePath}\n`));
        });
}
