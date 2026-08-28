import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import pluralize from 'pluralize';
import { pascalCase, kebabCase } from 'change-case';
import { renderTemplate } from '../utils/template.js';

export function registerMakeServiceCommand(program: Command): void {
    program
        .command('make:service [name]')
        .description('Generate hanya data/API layer (hooks, response, schema)')
        .action(async (nameArg?: string) => {
            console.log(pc.cyan('\n⚙️ Data/API Service Generator\n'));

            const singularInput = nameArg
                ? nameArg.trim()
                : await input({
                    message: 'Nama entitas (singular, misal: product, invoice):',
                    validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
                });

            const singularName = pluralize.singular(singularInput);
            const pluralName = pluralize.plural(singularName);

            const namePascal = pascalCase(singularName);
            const pluralKebab = kebabCase(pluralName);
            const servicePath = path.resolve(process.cwd(), 'src/services', pluralKebab);

            if (fs.existsSync(servicePath)) {
                const overwrite = await confirm({
                    message: `Service "${pluralKebab}" sudah ada. Timpa file yang ada?`,
                    default: false,
                });
                if (!overwrite) return;
            }

            const templateData = { name: singularName, pluralName };

            await fs.ensureDir(path.join(servicePath, 'hooks'));
            await fs.ensureDir(path.join(servicePath, 'response'));
            await fs.ensureDir(path.join(servicePath, 'schema'));

            await fs.writeFile(path.join(servicePath, 'hooks', `use${namePascal}CRUD.ts`), renderTemplate('services/hooks/useCRUD.hbs', templateData));
            await fs.writeFile(path.join(servicePath, 'response', `${namePascal}Response.ts`), renderTemplate('services/response/Response.hbs', templateData));
            await fs.writeFile(path.join(servicePath, 'schema', `${namePascal}Schema.ts`), renderTemplate('services/schema/Schema.hbs', templateData));

            console.log(pc.green(`✔ Service Layer dibuat di: src/services/${pluralKebab}`));
            console.log(pc.cyan(`\n✨ Service "${pluralKebab}" berhasil digenerate!\n`));
        });
}
