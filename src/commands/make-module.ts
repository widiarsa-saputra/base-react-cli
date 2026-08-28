import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import pluralize from 'pluralize';
import { constantCase, pascalCase, kebabCase } from 'change-case';
import { renderTemplate } from '../utils/template.js';
import { injectRouteToAppRouter, injectMenuToAppRouter } from '../utils/router.js';


export async function generateModule(nameArg?: string, sectionInfo?: { id: string, icon: string }) {
    console.log(pc.cyan('\n🚀 Base React Module Generator (Full Module)\n'));

    // Ambil dari argumen command atau tanyakan jika tidak diisi
    const singularInput = nameArg
        ? nameArg.trim()
        : await input({
            message: 'Nama modul (singular, misal: student, course, category):',
            validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
        });

    // Otomatis ubah ke bentuk singular dan plural yang benar
    const singularName = pluralize.singular(singularInput);
    const pluralName = pluralize.plural(singularName);

    const namePascal = pascalCase(singularName);
    const nameKebab = kebabCase(singularName);
    const pluralKebab = kebabCase(pluralName);
    const constantKey = constantCase(pluralName);

    console.log(pc.gray(`• Feature (Singular) : ${nameKebab}`));
    console.log(pc.gray(`• Service (Plural)   : ${pluralKebab}\n`));

    const featurePath = path.resolve(process.cwd(), 'src/features', nameKebab);
    const servicePath = path.resolve(process.cwd(), 'src/services', pluralKebab);

    if (fs.existsSync(featurePath) || fs.existsSync(servicePath)) {
        const overwrite = await confirm({
            message: `Modul "${nameKebab}" atau service "${pluralKebab}" sudah ada. Timpa file yang ada?`,
            default: false,
        });
        if (!overwrite) return;
    }

    const templateData = { name: singularName, pluralName };

    // Buat Struktur Folder
    await fs.ensureDir(path.join(featurePath, 'components'));
    await fs.ensureDir(path.join(featurePath, 'pages'));
    await fs.ensureDir(path.join(servicePath, 'hooks'));
    await fs.ensureDir(path.join(servicePath, 'response'));
    await fs.ensureDir(path.join(servicePath, 'schema'));

    // UI Layer
    await fs.writeFile(path.join(featurePath, 'pages', `${namePascal}Page.tsx`), renderTemplate('features/pages/Page.hbs', templateData));
    await fs.writeFile(path.join(featurePath, 'components', `${namePascal}MainContent.tsx`), renderTemplate('features/components/MainContent.hbs', templateData));
    await fs.writeFile(path.join(featurePath, 'components', `${namePascal}MutationForm.tsx`), renderTemplate('features/components/MutationForm.hbs', templateData));
    await fs.writeFile(path.join(featurePath, 'components', `Remove${namePascal}.tsx`), renderTemplate('features/components/RemoveComponent.hbs', templateData));

    // Service Layer
    await fs.writeFile(path.join(servicePath, 'hooks', `use${namePascal}CRUD.ts`), renderTemplate('services/hooks/useCRUD.hbs', templateData));
    await fs.writeFile(path.join(servicePath, 'response', `${namePascal}Response.ts`), renderTemplate('services/response/Response.hbs', templateData));
    await fs.writeFile(path.join(servicePath, 'schema', `${namePascal}Schema.ts`), renderTemplate('services/schema/Schema.hbs', templateData));

    console.log(pc.green(`✔ UI Layer dibuat di: src/features/${nameKebab}`));
    console.log(pc.green(`✔ Service Layer dibuat di: src/services/${pluralKebab}`));

    await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab, constantKey });
    
    if (sectionInfo) {
        await injectMenuToAppRouter({
            sectionId: sectionInfo.id,
            constantKey,
            menuText: singularName.charAt(0).toUpperCase() + singularName.slice(1).replace(/-/g, ' '),
            icon: sectionInfo.icon
        });
    }
    
    console.log(pc.cyan(`\n✨ Modul "${namePascal}" berhasil digenerate!\n`));
}

export function registerMakeModuleCommand(program: Command): void {
    program
        .command('make:module [name]')
        .description('Generate modular feature UI, TanStack Query hooks, schemas, dan inject route')
        .action(async (nameArg?: string) => {
            await generateModule(nameArg);
        });
}

export function registerMakeMasterDataCommand(program: Command): void {
    program
        .command('make:master-data [name]')
        .description('Generate module and register to Master Data section')
        .action(async (nameArg?: string) => {
            await generateModule(nameArg, { id: 'master-data', icon: 'Grid' });
        });
}

export function registerMakeSistemCommand(program: Command): void {
    program
        .command('make:sistem [name]')
        .description('Generate module and register to Sistem section')
        .action(async (nameArg?: string) => {
            await generateModule(nameArg, { id: 'sistem', icon: 'Folder' });
        });
}

export function registerMakeProfileCommand(program: Command): void {
    program
        .command('make:profile [name]')
        .description('Generate module and register to Profile section')
        .action(async (nameArg?: string) => {
            await generateModule(nameArg, { id: 'profile', icon: 'Users' });
        });
}
