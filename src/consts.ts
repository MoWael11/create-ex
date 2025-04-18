import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const TITLE_TEXT = `  ______                                   __                                         
 /      \\                                 |  \\                                        
|  $$$$$$\\  ______    ______    ______   _| $$_     ______          ______   __    __ 
| $$   \\$$ /      \\  /      \\  |      \\ |   $$ \\   /      \\        /      \\ |  \\  /  \\
| $$      |  $$$$$$\\|  $$$$$$\\  \\$$$$$$\\ \\$$$$$$  |  $$$$$$\\      |  $$$$$$\\ \\$$\\/  $$
| $$   __ | $$   \\$$| $$    $$ /      $$  | $$ __ | $$    $$      | $$    $$  >$$  $$ 
| $$__/  \\| $$      | $$$$$$$$|  $$$$$$$  | $$|  \\| $$$$$$$$      | $$$$$$$$ /  $$$$\\ 
 \\$$    $$| $$       \\$$     \\ \\$$    $$   \\$$  $$ \\$$     \\       \\$$     \\|  $$ \\$$\\
  \\$$$$$$  \\$$        \\$$$$$$$  \\$$$$$$$    \\$$$$   \\$$$$$$$        \\$$$$$$$ \\$$   \\$$
`;

export const DEFAULT_APP_NAME = 'express-app';
export const CREATE_EX = 'create-ex';
