import { createReadStream, createWriteStream } from 'fs';
import { stat, writeFile, rename, open, unlink } from 'fs/promises';
import { normalize, join, resolve, isAbsolute, parse} from 'path';
import { checkDirectory, validateFilePath } from './utils.mjs';
import { EOL } from 'os'

export const catCmd = async (user) => {
    try {
        let filePath = await validateFilePath(user.cmd[1], user.currentDir)
        if (filePath){
            const readStream = createReadStream(filePath, 'utf-8');
            readStream.pipe(process.stdout);
            readStream.on('end', () => {
                process.stdout.write(`You are currently in ${user.currentDir}${EOL}`);
            });
        }
    } catch (e) {
        throw new Error('Invalid input');
    }
};

export const addCmd = async (user) => {
    const fileParse = parse(user.cmd[1]);
    if (!fileParse['dir']) {
        try {
            await writeFile(user.cmd[1], '');
        } catch { throw new Error('Operation failed'); }
    } else {
        throw new Error('Invalid input');
    }
};

//   rn path_to_file new_filename
export const rnCmd = async (user) => {
    try {
        let srcFile = await validateFilePath(user.cmd[1], user.currentDir)
        let dstFile = normalize(user.cmd[2]);
        dstFile = resolve(user.currentDir, user.cmd[2]);
        if ((srcFile && dstFile) && (srcFile != dstFile)){
            await rename(srcFile, dstFile);
        } else {
            throw new Error('Invalid input');
        }
    } catch (e) {
        throw new Error('Invalid input');
    }
};

//     cp path_to_file path_to_new_directory
// cp a ./1
export const cpmvCmd = async (user) => {
    try {
        let srcFilePath = await validateFilePath(user.cmd[1], user.currentDir)
        const srcFileName = parse(srcFilePath)['base'];
        const dstFilePath = resolve(normalize(user.cmd[2]), srcFileName);
        if (!dstFilePath || !srcFilePath) throw new Error ('Invalid Input');

        const readStream = createReadStream(srcFilePath, 'utf-8');
        const newFile = await open(dstFilePath, 'w');
        await writeFile(dstFilePath, '');
        readStream.on('data', async (chunk) => {
            const writeStream = createWriteStream(dstFilePath, 'utf-8');
            writeStream.write(chunk);
            if (user.cmd[0] === "mv")
                await unlink(srcFilePath);
        });
    } catch (e) {
        throw new Error('Operation failed');
    }
};


export const rmCmd = async (user) => {
        try {
            let filePath = await validateFilePath(user.cmd[1], user.currentDir);
            await unlink(filePath);
        } catch { throw new Error('Operation failed'); }
};