import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';

export async function injectRouteToAppRouter(options: {
    namePascal: string;
    nameKebab: string;
    pluralKebab: string;
    constantKey: string;
}): Promise<void> {
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
