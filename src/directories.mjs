import { readdir } from 'fs/promises';
import { EOL } from 'os'
import { normalize, resolve, sep} from 'path';
import { checkDirectory } from './utils.mjs';

export const lsCmd = async (user) => {
    try {
        const files = await readdir(user.currentDir);
        for (const file of files){
            const path = resolve(user.currentDir, file);
            if(await checkDirectory(path))
                process.stdout.write('\x1b[1;35m' + file + '\x1b[0m ');
            else
                process.stdout.write(`${file} `);
        };
        process.stdout.write(`${EOL}`);

    } catch (e) {
        throw new Error('Operation failed');
    }
}

export const cdCmd = async (user) => {
    try {
        let newPath = resolve(user.currentDir, user.cmd[1]);
        process.chdir(newPath);
        user.currentDir = newPath;
    } catch (e) {
        throw new Error('Operation failed');
    }
}

export const upCmd = async (user) => {
    try {
        let newPath = user.currentDir;
        newPath = normalize(`${newPath}${sep}..`);
        process.chdir(newPath);
        user.currentDir = newPath;
    } catch (e) {
        throw new Error('Operation failed');
    }
}