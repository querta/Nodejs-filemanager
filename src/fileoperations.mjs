import { createReadStream, createWriteStream, read } from 'fs';
import { writeFile, rename, open, unlink } from 'fs/promises';
import { normalize, resolve, parse, isAbsolute} from 'path';
import { validateFilePath, checkDirectory } from './utils.mjs';

export const catCmd = async (user) => {
    try {        
        let filePath = await validateFilePath(user.cmd[1], user.currentDir)
        return new Promise((success, reject) => {
            const readStream = createReadStream(filePath, 'utf-8');
            readStream.on("error", () => reject(new Error('Operation failed. Permission denied')));
            readStream.on('data', chunk => process.stdout.write(chunk));
            readStream.on('end', () => success());
    })
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

export const rnCmd = async (user) => {
    try {
        let srcFile = await validateFilePath(user.cmd[1], user.currentDir)
        let dstFile = normalize(user.cmd[2]);
        dstFile = resolve(user.currentDir, user.cmd[2]);
        if ((srcFile && dstFile) && (srcFile != dstFile)){
            await rename(srcFile, dstFile);
        } else {
            throw new Error('Operation failed');
        }
    } catch (e) {
        throw new Error('Operation failed');
    }
};

export const cpmvCmd = async (user) => {
    try {
        let srcFilePath = await validateFilePath(user.cmd[1], user.currentDir)
        const srcFileName = parse(srcFilePath)['base'];
        let dstDir = await checkDirectory(user.cmd[2]);
        if (!isAbsolute(dstDir))
            dstDir = resolve(user.currentDir, dstDir);
        const dstFilePath = resolve(dstDir, srcFileName)
        return new Promise((success, reject) => {
            const rs = createReadStream(srcFilePath);
            rs.on("error", () => reject(new Error('Operation failed')));
            rs.on('data', async (chunk) => {
                const writeStream = createWriteStream(dstFilePath, 'utf-8');
                writeStream.write(chunk);
            });
            rs.on('end', async () => {
                console.log('aaaa');
                if (user.cmd[0] === "mv")
                    await unlink(srcFilePath);
                success();
            });
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