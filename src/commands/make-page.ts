import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import pluralize from 'pluralize';
import { constantCase, pascalCase, kebabCase } from 'change-case';
import { renderTemplate } from '../utils/template.js';
import { injectRouteToAppRouter } from '../utils/router.js';

export function registerMakePageCommand(program: Command): void {
    program
        .command('make:page [name]')
        .alias('make:feature')
        .description('Generate hanya UI feature layer (pages + components) & inject route')
        .action(async (nameArg?: string) => {
            console.log(pc.cyan('\n📄 Feature UI Generator\n'));

            const rawName = nameArg
                ? nameArg.trim()
                : await input({
                    message: 'Nama page/feature (misal: dashboard-analytics, settings):',
                    validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
                });

            const namePascal = pascalCase(rawName);
            const nameKebab = kebabCase(rawName);
            const constantKey = constantCase(rawName);
            const featurePath = path.resolve(process.cwd(), 'src/features', nameKebab);

            if (fs.existsSync(featurePath)) {
                const overwrite = await confirm({
                    message: `Feature "${nameKebab}" sudah ada. Timpa file yang ada?`,
                    default: false,
                });
                if (!overwrite) return;
            }

            const templateData = { name: rawName, pluralName: pluralize.plural(rawName) };

            await fs.ensureDir(path.join(featurePath, 'components'));
            await fs.ensureDir(path.join(featurePath, 'pages'));

            await fs.writeFile(path.join(featurePath, 'pages', `${namePascal}Page.tsx`), renderTemplate('features/pages/Page.hbs', templateData));
            await fs.writeFile(path.join(featurePath, 'components', `${namePascal}MainContent.tsx`), renderTemplate('features/components/MainContent.hbs', templateData));

            console.log(pc.green(`✔ UI Layer dibuat di: src/features/${nameKebab}`));
            await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab: nameKebab, constantKey });
            console.log(pc.cyan(`\n✨ Page "${namePascal}" berhasil digenerate!\n`));
        });
}
