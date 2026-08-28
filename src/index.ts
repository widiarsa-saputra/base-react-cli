import { Command } from 'commander';
import { 
    registerMakeModuleCommand,
    registerMakeMasterDataCommand,
    registerMakeSistemCommand,
    registerMakeProfileCommand
} from './commands/make-module.js';
import { registerMakePageCommand } from './commands/make-page.js';
import { registerMakeServiceCommand } from './commands/make-service.js';
import { registerMakeComponentCommand } from './commands/make-component.js';
import { registerMakeHookCommand } from './commands/make-hook.js';
import { registerInstallBaseCommand } from './commands/install-base.js';
import { 
    registerMoveMasterDataCommand,
    registerMoveSistemCommand,
    registerMoveProfileCommand
} from './commands/move-menu.js';


const program = new Command();

program
    .name('gotra')
    .description('CLI Scaffolding Generator untuk Arsitektur Base React Vite')
    .version('1.2.0');

// Register all commands
registerMakeModuleCommand(program);
registerMakeMasterDataCommand(program);
registerMakeSistemCommand(program);
registerMakeProfileCommand(program);

registerMakePageCommand(program);
registerMakeServiceCommand(program);
registerMakeComponentCommand(program);
registerMakeHookCommand(program);
registerInstallBaseCommand(program);

registerMoveMasterDataCommand(program);
registerMoveSistemCommand(program);
registerMoveProfileCommand(program);

program.parse();