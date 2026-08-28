import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';
import { constantCase, pascalCase, camelCase, kebabCase } from 'change-case';

// Register Helpers Handlebars
Handlebars.registerHelper('pascalCase', (str: string) => pascalCase(str || ''));
Handlebars.registerHelper('camelCase', (str: string) => camelCase(str || ''));
Handlebars.registerHelper('kebabCase', (str: string) => kebabCase(str || ''));
Handlebars.registerHelper('constantCase', (str: string) => constantCase(str || ''));

const templateBase = path.resolve(import.meta.dirname, '../templates');

export const renderTemplate = (relPath: string, data: object): string => {
    const filePath = path.join(templateBase, relPath);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Template file tidak ditemukan: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return Handlebars.compile(content)(data);
};
