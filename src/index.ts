import { Command } from 'commander';
import { input, confirm } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';
import pc from 'picocolors';
import { constantCase, pascalCase, camelCase, kebabCase } from 'change-case';

// Register Helpers Handlebars
Handlebars.registerHelper('pascalCase', (str: string) => pascalCase(str || ''));
Handlebars.registerHelper('camelCase', (str: string) => camelCase(str || ''));
Handlebars.registerHelper('kebabCase', (str: string) => kebabCase(str || ''));
Handlebars.registerHelper('constantCase', (str: string) => constantCase(str || ''));

const program = new Command();

program
    .name('gotra')
    .description('CLI Scaffolding Generator untuk Arsitektur Base React Vite')
    .version('1.1.0');

const templateBase = path.resolve(import.meta.dirname, 'templates');

const renderTemplate = (relPath: string, data: object) => {
    const filePath = path.join(templateBase, relPath);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Template file tidak ditemukan: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return Handlebars.compile(content)(data);
};

// Injeksi Route ke AppRouter.tsx
async function injectRouteToAppRouter(options: {
    namePascal: string;
    nameKebab: string;
    pluralKebab: string;
    constantKey: string;
}) {
    const routerPath = path.resolve(process.cwd(), 'src/router/AppRouter.tsx');

    if (!fs.existsSync(routerPath)) {
        console.log(pc.yellow(`⚠️  AppRouter.tsx tidak ditemukan di "${routerPath}". Injeksi route dilewati.`));
        return;
    }

    let content = await fs.readFile(routerPath, 'utf-8');
    const importStatement = `import ${options.namePascal}Page from "@/features/${options.nameKebab}/pages/${options.namePascal}Page";`;

    if (content.includes(importStatement)) {
        console.log(pc.yellow(`⚠️  Import untuk ${options.namePascal}Page sudah terdaftar di AppRouter.tsx.`));
        return;
    }

    const importTargetAnchor = 'type ProtectedRoute';
    if (content.includes(importTargetAnchor)) {
        content = content.replace(importTargetAnchor, `${importStatement}\n\n${importTargetAnchor}`);
    } else {
        content = `${importStatement}\n${content}`;
    }

    const routeEntry = `    ${options.constantKey}: {
        path: "/${options.pluralKebab}",
        element: <${options.namePascal}Page />,
        protected: true,
        roles: [],
        permissions: [],
    },`;

    const routesAnchor = 'export const ROUTES: Record<string, AppRoute> = {';
    if (content.includes(routesAnchor)) {
        content = content.replace(routesAnchor, `${routesAnchor}\n${routeEntry}`);
    }

    await fs.writeFile(routerPath, content, 'utf-8');
    console.log(pc.green(`✔ Route terdaftar otomatis di src/router/AppRouter.tsx`));
}

// 1. COMMAND: make:module (Lengkap: UI + Services + Router)
program
    .command('make:module')
    .description('Generate modular feature UI, TanStack Query hooks, schemas, dan inject route')
    .action(async () => {
        console.log(pc.cyan('\n🚀 Base React Module Generator (Full Module)\n'));

        const singularName = await input({
            message: 'Nama modul (singular, misal: student, course):',
            validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
        });

        const pluralName = await input({
            message: 'Nama modul (plural/jamak untuk URL & services folder):',
            default: `${singularName}s`,
        });

        const namePascal = pascalCase(singularName);
        const nameKebab = paramCase(singularName);
        const pluralKebab = paramCase(pluralName);
        const constantKey = constantCase(pluralName);

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

        // Buat Direktori
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
        console.log(pc.cyan(`\n✨ Modul "${namePascal}" berhasil digenerate!\n`));
    });

// 2. COMMAND: make:page / make:feature (Hanya UI Feature + Route)
program
    .command('make:page')
    .alias('make:feature')
    .description('Generate hanya UI feature layer (pages + components) & inject route')
    .action(async () => {
        console.log(pc.cyan('\n📄 Feature UI Generator\n'));

        const rawName = await input({
            message: 'Nama page/feature (misal: dashboard-analytics, settings):',
            validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
        });

        const namePascal = pascalCase(rawName);
        const nameKebab = paramCase(rawName);
        const constantKey = constantCase(rawName);
        const featurePath = path.resolve(process.cwd(), 'src/features', nameKebab);

        if (fs.existsSync(featurePath)) {
            const overwrite = await confirm({
                message: `Feature "${nameKebab}" sudah ada. Timpa file yang ada?`,
                default: false,
            });
            if (!overwrite) return;
        }

        const templateData = { name: rawName, pluralName: `${rawName}s` };

        await fs.ensureDir(path.join(featurePath, 'components'));
        await fs.ensureDir(path.join(featurePath, 'pages'));

        await fs.writeFile(path.join(featurePath, 'pages', `${namePascal}Page.tsx`), renderTemplate('features/pages/Page.hbs', templateData));
        await fs.writeFile(path.join(featurePath, 'components', `${namePascal}MainContent.tsx`), renderTemplate('features/components/MainContent.hbs', templateData));

        console.log(pc.green(`✔ UI Layer dibuat di: src/features/${nameKebab}`));

        await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab: nameKebab, constantKey });
        console.log(pc.cyan(`\n✨ Page "${namePascal}" berhasil digenerate!\n`));
    });

// 3. COMMAND: make:service (Hanya Data/API Layer)
program
    .command('make:service')
    .description('Generate hanya data/API layer (hooks, response, schema)')
    .action(async () => {
        console.log(pc.cyan('\n⚙️ Data/API Service Generator\n'));

        const singularName = await input({
            message: 'Nama entitas (singular, misal: product, invoice):',
            validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
        });

        const pluralName = await input({
            message: 'Nama folder service (plural/jamak):',
            default: `${singularName}s`,
        });

        const namePascal = pascalCase(singularName);
        const pluralKebab = paramCase(pluralName);
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

// 4. COMMAND: make:component (Shared Reusable UI Component)
program
    .command('make:component')
    .description('Generate shared UI component di src/shared/components/')
    .action(async () => {
        console.log(pc.cyan('\n🧩 Shared Component Generator\n'));

        const componentName = await input({
            message: 'Nama component (misal: ButtonFilter, CardSummary):',
            validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
        });

        const subPath = await input({
            message: 'Subfolder di src/shared/components (kosongkan jika langsung di root):',
            default: '',
        });

        const namePascal = pascalCase(componentName);
        const targetDir = subPath
            ? path.resolve(process.cwd(), 'src/shared/components', subPath)
            : path.resolve(process.cwd(), 'src/shared/components');

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

// 5. COMMAND: make:hook (Shared Custom Hook)
program
    .command('make:hook')
    .description('Generate custom React hook di src/shared/hooks/')
    .action(async () => {
        console.log(pc.cyan('\n🪝 Shared Hook Generator\n'));

        const hookName = await input({
            message: 'Nama hook (misal: useLocalStorage, useModalState):',
            validate: (val) => val.trim().length > 0 || 'Nama tidak boleh kosong',
        });

        // Menghapus prefix 'use' jika user mengetik 'use' di awal
        const rawClean = hookName.startsWith('use') ? hookName.substring(3) : hookName;
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

program.parse();