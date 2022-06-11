import { createReadStream, createWriteStream, constants } from 'fs';
import { access } from 'fs/promises';
import { resolve, parse, isAbsolute, join } from 'path';
import { validateFilePath } from './utils.mjs';
import { checkDirectory } from './utils.mjs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compressCmd = async (user) => {
    try {
        let srcFilePath = await validateFilePath(user.cmd[1], user.currentDir);
        let dstDir = await checkDirectory(user.cmd[2]);
        if (!isAbsolute(dstDir))
            dstDir = join(user.currentDir, dstDir);
        const dstFilePath = resolve(dstDir, (parse(srcFilePath)['base'] + '.br'));
        await access(srcFilePath, constants.R_OK);
        const rs = createReadStream(srcFilePath);
        const brotli = createBrotliCompress();
        const ws = createWriteStream(dstFilePath);
        rs.pipe(brotli).pipe(ws)
    } catch (e) {
        throw new Error('Operation failed');
    }
};

export const decompressCmd = async (user) => {
    try {

        let srcFilePath = await validateFilePath(user.cmd[1], user.currentDir);
        let dstDir = await checkDirectory(user.cmd[2]);
        if (!isAbsolute(dstDir))
            dstDir = join(user.currentDir, dstDir);
        const dstFilePath = resolve(dstDir, (parse(srcFilePath)['name']));
        await access(srcFilePath, constants.R_OK); 
        const rs = createReadStream(srcFilePath);
        const brotli = createBrotliDecompress();
        const ws = createWriteStream(dstFilePath);
        rs.pipe(brotli).pipe(ws)
    } catch (e) {
        throw new Error('Operation failed');
    }
};