import { createReadStream } from 'fs';
import { stat, writeFile } from 'fs/promises';
import { normalize, join, resolve, isAbsolute, parse} from 'path';
import { checkDirectory } from './utils.mjs';
import { EOL } from 'os'


export const catCmd = async (user) => {
    try {
        let filePath = normalize(user.cmd[1]);
        if (!isAbsolute(filePath))
            filePath = join(user.currentDir, filePath);
        const validFile = await stat(filePath);
        if (validFile && !validFile.isDirectory()){
            const readStream = createReadStream(filePath, 'utf-8');
            readStream.pipe(process.stdout);
            readStream.on('end', () => {
            process.stdout.write(`You are currently in ${user.currentDir}${EOL}`);
            });
        }
    } catch (e) {
        throw new Error('Invalid input');
    }
}


export const addCmd = async (user) => {
    // const file = './files/fresh.txt';
    const fileParse = parse(user.cmd[1]);
    if (!fileParse['dir']) {
        await writeFile(user.cmd[1], '');
    } else {
        throw new Error('Invalid input. Filname expected');
    }
};
