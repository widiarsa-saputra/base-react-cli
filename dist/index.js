#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/make-module.ts
import { input, confirm } from "@inquirer/prompts";
import fs3 from "fs-extra";
import path3 from "path";
import pc2 from "picocolors";
import pluralize from "pluralize";
import { constantCase as constantCase2, pascalCase as pascalCase2, kebabCase as kebabCase2 } from "change-case";

// src/utils/template.ts
import fs from "fs-extra";
import path from "path";
import Handlebars from "handlebars";
import { constantCase, pascalCase, camelCase, kebabCase } from "change-case";
Handlebars.registerHelper("pascalCase", (str) => pascalCase(str || ""));
Handlebars.registerHelper("camelCase", (str) => camelCase(str || ""));
Handlebars.registerHelper("kebabCase", (str) => kebabCase(str || ""));
Handlebars.registerHelper("constantCase", (str) => constantCase(str || ""));
var templateBase = path.resolve(import.meta.dirname, "../templates");
var renderTemplate = (relPath, data) => {
  const filePath = path.join(templateBase, relPath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Template file tidak ditemukan: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return Handlebars.compile(content)(data);
};

// src/utils/router.ts
import fs2 from "fs-extra";
import path2 from "path";
import pc from "picocolors";
async function injectRouteToAppRouter(options) {
  const routerPath = path2.resolve(process.cwd(), "src/router/AppRouter.tsx");
  if (!fs2.existsSync(routerPath)) {
    console.log(pc.yellow(`\u26A0\uFE0F  AppRouter.tsx tidak ditemukan di "${routerPath}". Injeksi route dilewati.`));
    return;
  }
  let content = await fs2.readFile(routerPath, "utf-8");
  const importStatement = `import ${options.namePascal}Page from "@/features/${options.nameKebab}/pages/${options.namePascal}Page";`;
  if (content.includes(importStatement)) {
    console.log(pc.yellow(`\u26A0\uFE0F  Import untuk ${options.namePascal}Page sudah terdaftar di AppRouter.tsx.`));
    return;
  }
  const importTargetAnchor = "type ProtectedRoute";
  if (content.includes(importTargetAnchor)) {
    content = content.replace(importTargetAnchor, `${importStatement}

${importTargetAnchor}`);
  } else {
    content = `${importStatement}
${content}`;
  }
  const routeEntry = `    ${options.constantKey}: {
        path: "/${options.pluralKebab}",
        element: <${options.namePascal}Page />,
        protected: true,
        roles: [],
        permissions: [],
    },`;
  const routesAnchor = "export const ROUTES: Record<string, AppRoute> = {";
  if (content.includes(routesAnchor)) {
    content = content.replace(routesAnchor, `${routesAnchor}
${routeEntry}`);
  }
  await fs2.writeFile(routerPath, content, "utf-8");
  console.log(pc.green(`\u2714 Route terdaftar otomatis di src/router/AppRouter.tsx`));
}

// src/commands/make-module.ts
function registerMakeModuleCommand(program2) {
  program2.command("make:module [name]").description("Generate modular feature UI, TanStack Query hooks, schemas, dan inject route").action(async (nameArg) => {
    console.log(pc2.cyan("\n\u{1F680} Base React Module Generator (Full Module)\n"));
    const singularInput = nameArg ? nameArg.trim() : await input({
      message: "Nama modul (singular, misal: student, course, category):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const singularName = pluralize.singular(singularInput);
    const pluralName = pluralize.plural(singularName);
    const namePascal = pascalCase2(singularName);
    const nameKebab = kebabCase2(singularName);
    const pluralKebab = kebabCase2(pluralName);
    const constantKey = constantCase2(pluralName);
    console.log(pc2.gray(`\u2022 Feature (Singular) : ${nameKebab}`));
    console.log(pc2.gray(`\u2022 Service (Plural)   : ${pluralKebab}
`));
    const featurePath = path3.resolve(process.cwd(), "src/features", nameKebab);
    const servicePath = path3.resolve(process.cwd(), "src/services", pluralKebab);
    if (fs3.existsSync(featurePath) || fs3.existsSync(servicePath)) {
      const overwrite = await confirm({
        message: `Modul "${nameKebab}" atau service "${pluralKebab}" sudah ada. Timpa file yang ada?`,
        default: false
      });
      if (!overwrite) return;
    }
    const templateData = { name: singularName, pluralName };
    await fs3.ensureDir(path3.join(featurePath, "components"));
    await fs3.ensureDir(path3.join(featurePath, "pages"));
    await fs3.ensureDir(path3.join(servicePath, "hooks"));
    await fs3.ensureDir(path3.join(servicePath, "response"));
    await fs3.ensureDir(path3.join(servicePath, "schema"));
    await fs3.writeFile(path3.join(featurePath, "pages", `${namePascal}Page.tsx`), renderTemplate("features/pages/Page.hbs", templateData));
    await fs3.writeFile(path3.join(featurePath, "components", `${namePascal}MainContent.tsx`), renderTemplate("features/components/MainContent.hbs", templateData));
    await fs3.writeFile(path3.join(featurePath, "components", `${namePascal}MutationForm.tsx`), renderTemplate("features/components/MutationForm.hbs", templateData));
    await fs3.writeFile(path3.join(featurePath, "components", `Remove${namePascal}.tsx`), renderTemplate("features/components/RemoveComponent.hbs", templateData));
    await fs3.writeFile(path3.join(servicePath, "hooks", `use${namePascal}CRUD.ts`), renderTemplate("services/hooks/useCRUD.hbs", templateData));
    await fs3.writeFile(path3.join(servicePath, "response", `${namePascal}Response.ts`), renderTemplate("services/response/Response.hbs", templateData));
    await fs3.writeFile(path3.join(servicePath, "schema", `${namePascal}Schema.ts`), renderTemplate("services/schema/Schema.hbs", templateData));
    console.log(pc2.green(`\u2714 UI Layer dibuat di: src/features/${nameKebab}`));
    console.log(pc2.green(`\u2714 Service Layer dibuat di: src/services/${pluralKebab}`));
    await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab, constantKey });
    console.log(pc2.cyan(`
\u2728 Modul "${namePascal}" berhasil digenerate!
`));
  });
}

// src/commands/make-page.ts
import { input as input2, confirm as confirm2 } from "@inquirer/prompts";
import fs4 from "fs-extra";
import path4 from "path";
import pc3 from "picocolors";
import pluralize2 from "pluralize";
import { constantCase as constantCase3, pascalCase as pascalCase3, kebabCase as kebabCase3 } from "change-case";
function registerMakePageCommand(program2) {
  program2.command("make:page [name]").alias("make:feature").description("Generate hanya UI feature layer (pages + components) & inject route").action(async (nameArg) => {
    console.log(pc3.cyan("\n\u{1F4C4} Feature UI Generator\n"));
    const rawName = nameArg ? nameArg.trim() : await input2({
      message: "Nama page/feature (misal: dashboard-analytics, settings):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const namePascal = pascalCase3(rawName);
    const nameKebab = kebabCase3(rawName);
    const constantKey = constantCase3(rawName);
    const featurePath = path4.resolve(process.cwd(), "src/features", nameKebab);
    if (fs4.existsSync(featurePath)) {
      const overwrite = await confirm2({
        message: `Feature "${nameKebab}" sudah ada. Timpa file yang ada?`,
        default: false
      });
      if (!overwrite) return;
    }
    const templateData = { name: rawName, pluralName: pluralize2.plural(rawName) };
    await fs4.ensureDir(path4.join(featurePath, "components"));
    await fs4.ensureDir(path4.join(featurePath, "pages"));
    await fs4.writeFile(path4.join(featurePath, "pages", `${namePascal}Page.tsx`), renderTemplate("features/pages/Page.hbs", templateData));
    await fs4.writeFile(path4.join(featurePath, "components", `${namePascal}MainContent.tsx`), renderTemplate("features/components/MainContent.hbs", templateData));
    console.log(pc3.green(`\u2714 UI Layer dibuat di: src/features/${nameKebab}`));
    await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab: nameKebab, constantKey });
    console.log(pc3.cyan(`
\u2728 Page "${namePascal}" berhasil digenerate!
`));
  });
}

// src/commands/make-service.ts
import { input as input3, confirm as confirm3 } from "@inquirer/prompts";
import fs5 from "fs-extra";
import path5 from "path";
import pc4 from "picocolors";
import pluralize3 from "pluralize";
import { pascalCase as pascalCase4, kebabCase as kebabCase4 } from "change-case";
function registerMakeServiceCommand(program2) {
  program2.command("make:service [name]").description("Generate hanya data/API layer (hooks, response, schema)").action(async (nameArg) => {
    console.log(pc4.cyan("\n\u2699\uFE0F Data/API Service Generator\n"));
    const singularInput = nameArg ? nameArg.trim() : await input3({
      message: "Nama entitas (singular, misal: product, invoice):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const singularName = pluralize3.singular(singularInput);
    const pluralName = pluralize3.plural(singularName);
    const namePascal = pascalCase4(singularName);
    const pluralKebab = kebabCase4(pluralName);
    const servicePath = path5.resolve(process.cwd(), "src/services", pluralKebab);
    if (fs5.existsSync(servicePath)) {
      const overwrite = await confirm3({
        message: `Service "${pluralKebab}" sudah ada. Timpa file yang ada?`,
        default: false
      });
      if (!overwrite) return;
    }
    const templateData = { name: singularName, pluralName };
    await fs5.ensureDir(path5.join(servicePath, "hooks"));
    await fs5.ensureDir(path5.join(servicePath, "response"));
    await fs5.ensureDir(path5.join(servicePath, "schema"));
    await fs5.writeFile(path5.join(servicePath, "hooks", `use${namePascal}CRUD.ts`), renderTemplate("services/hooks/useCRUD.hbs", templateData));
    await fs5.writeFile(path5.join(servicePath, "response", `${namePascal}Response.ts`), renderTemplate("services/response/Response.hbs", templateData));
    await fs5.writeFile(path5.join(servicePath, "schema", `${namePascal}Schema.ts`), renderTemplate("services/schema/Schema.hbs", templateData));
    console.log(pc4.green(`\u2714 Service Layer dibuat di: src/services/${pluralKebab}`));
    console.log(pc4.cyan(`
\u2728 Service "${pluralKebab}" berhasil digenerate!
`));
  });
}

// src/commands/make-component.ts
import { input as input4, confirm as confirm4 } from "@inquirer/prompts";
import fs6 from "fs-extra";
import path6 from "path";
import pc5 from "picocolors";
import { pascalCase as pascalCase5 } from "change-case";
function registerMakeComponentCommand(program2) {
  program2.command("make:component [name]").description("Generate shared UI component di src/shared/components/").action(async (nameArg) => {
    console.log(pc5.cyan("\n\u{1F9E9} Shared Component Generator\n"));
    const componentName = nameArg ? nameArg.trim() : await input4({
      message: "Nama component (misal: ButtonFilter, CardSummary):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const namePascal = pascalCase5(componentName);
    const targetDir = path6.resolve(process.cwd(), "src/shared/components");
    await fs6.ensureDir(targetDir);
    const filePath = path6.join(targetDir, `${namePascal}.tsx`);
    if (fs6.existsSync(filePath)) {
      const overwrite = await confirm4({
        message: `Component "${namePascal}.tsx" sudah ada. Timpa file?`,
        default: false
      });
      if (!overwrite) return;
    }
    await fs6.writeFile(filePath, renderTemplate("shared/Component.hbs", { name: componentName }));
    console.log(pc5.green(`\u2714 Component dibuat di: ${filePath}
`));
  });
}

// src/commands/make-hook.ts
import { input as input5, confirm as confirm5 } from "@inquirer/prompts";
import fs7 from "fs-extra";
import path7 from "path";
import pc6 from "picocolors";
import { pascalCase as pascalCase6 } from "change-case";
function registerMakeHookCommand(program2) {
  program2.command("make:hook [name]").description("Generate custom React hook di src/shared/hooks/").action(async (nameArg) => {
    console.log(pc6.cyan("\n\u{1FA9D} Shared Hook Generator\n"));
    const hookInput = nameArg ? nameArg.trim() : await input5({
      message: "Nama hook (misal: useLocalStorage, useModalState):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const rawClean = hookInput.startsWith("use") ? hookInput.substring(3) : hookInput;
    const namePascal = pascalCase6(rawClean);
    const finalHookName = `use${namePascal}`;
    const targetDir = path7.resolve(process.cwd(), "src/shared/hooks");
    await fs7.ensureDir(targetDir);
    const filePath = path7.join(targetDir, `${finalHookName}.ts`);
    if (fs7.existsSync(filePath)) {
      const overwrite = await confirm5({
        message: `Hook "${finalHookName}.ts" sudah ada. Timpa file?`,
        default: false
      });
      if (!overwrite) return;
    }
    await fs7.writeFile(filePath, renderTemplate("shared/Hook.hbs", { name: namePascal }));
    console.log(pc6.green(`\u2714 Hook dibuat di: ${filePath}
`));
  });
}

// src/commands/install-base.ts
import { input as input6, confirm as confirm6 } from "@inquirer/prompts";
import fs8 from "fs-extra";
import path8 from "path";
import pc7 from "picocolors";
import degit from "degit";
import ora from "ora";
import { execSync } from "child_process";
var BASE_TEMPLATE_REPO = "github:username/base_react";
function registerInstallBaseCommand(program2) {
  program2.command("install:base [targetDir]").alias("init").description("Clone Base React Vite template lengkap dengan Authentication dan AppRouter").action(async (targetDirArg) => {
    console.log(pc7.cyan("\n\u{1F680} Gotra Base React Installer\n"));
    const targetFolder = targetDirArg ? targetDirArg.trim() : await input6({
      message: "Nama folder / direktori proyek:",
      default: "my-react-app",
      validate: (val) => val.trim().length > 0 || "Nama folder tidak boleh kosong"
    });
    const destinationPath = path8.resolve(process.cwd(), targetFolder);
    if (fs8.existsSync(destinationPath)) {
      const files = await fs8.readdir(destinationPath);
      if (files.length > 0) {
        const proceed = await confirm6({
          message: `Folder "${targetFolder}" sudah ada dan tidak kosong. Lanjutkan proses?`,
          default: false
        });
        if (!proceed) return;
      }
    }
    const spinner = ora("Mengunduh Base React Starter Template...").start();
    try {
      const emitter = degit(BASE_TEMPLATE_REPO, {
        cache: false,
        force: true,
        verbose: false
      });
      await emitter.clone(destinationPath);
      spinner.succeed(pc7.green("Base template berhasil diunduh!"));
      const installDeps = await confirm6({
        message: "Install dependency sekarang (npm install)?",
        default: true
      });
      if (installDeps) {
        const installSpinner = ora("Menginstall dependencies via npm...").start();
        try {
          execSync("npm install", { cwd: destinationPath, stdio: "ignore" });
          installSpinner.succeed(pc7.green("Dependencies berhasil diinstall!"));
        } catch (err) {
          installSpinner.fail(pc7.red("Gagal menginstall dependencies secara otomatis."));
        }
      }
      try {
        execSync("git init", { cwd: destinationPath, stdio: "ignore" });
      } catch {
      }
      console.log(pc7.cyan(`
\u2728 Project siap digunakan di folder "${targetFolder}"!`));
      console.log(pc7.white("\nLangkah selanjutnya:"));
      console.log(pc7.yellow(`  cd ${targetFolder}`));
      console.log(pc7.yellow(`  npm run dev
`));
    } catch (error) {
      spinner.fail(pc7.red(`Gagal mengunduh template: ${error.message}`));
    }
  });
}

// src/index.ts
var program = new Command();
program.name("gotra").description("CLI Scaffolding Generator untuk Arsitektur Base React Vite").version("1.2.0");
registerMakeModuleCommand(program);
registerMakePageCommand(program);
registerMakeServiceCommand(program);
registerMakeComponentCommand(program);
registerMakeHookCommand(program);
registerInstallBaseCommand(program);
program.parse();
