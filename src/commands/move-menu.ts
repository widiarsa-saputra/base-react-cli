import { Command } from 'commander';
import { input } from '@inquirer/prompts';
import { injectMenuToAppRouter } from '../utils/router.js';

export async function moveMenu(constantKeyArg?: string, sectionInfo?: { id: string, icon: string }) {
    if (!sectionInfo) return;

    const constantKey = constantKeyArg
        ? constantKeyArg.trim()
        : await input({
            message: 'Nama rute constant key (misal: STUDENT_LIST, COURSE):',
            validate: (val) => val.trim().length > 0 || 'Key tidak boleh kosong',
        });

    const menuText = constantKey
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    await injectMenuToAppRouter({
        sectionId: sectionInfo.id,
        constantKey,
        menuText,
        icon: sectionInfo.icon
    });
}

export function registerMoveMasterDataCommand(program: Command): void {
    program
        .command('move:master-data [route_key]')
        .description('Register existing route to Master Data section')
        .action(async (routeKey?: string) => {
            await moveMenu(routeKey, { id: 'master-data', icon: 'Grid' });
        });
}

export function registerMoveSistemCommand(program: Command): void {
    program
        .command('move:sistem [route_key]')
        .description('Register existing route to Sistem section')
        .action(async (routeKey?: string) => {
            await moveMenu(routeKey, { id: 'sistem', icon: 'Folder' });
        });
}

export function registerMoveProfileCommand(program: Command): void {
    program
        .command('move:profile [route_key]')
        .description('Register existing route to Profile section')
        .action(async (routeKey?: string) => {
            await moveMenu(routeKey, { id: 'profile', icon: 'Users' });
        });
}
