import { createReadStream, createWriteStream } from 'fs';
import { resolve, parse, isAbsolute, join } from 'path';
import { validateFilePath } from './utils.mjs';
import { checkDirectory } from './utils.mjs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

/* 
compress b 2
*/
export const compressCmd = async (user) => {
    try {
        let srcFilePath = await validateFilePath(user.cmd[1], user.currentDir)
        let dstDir = await checkDirectory(user.cmd[2]);
        if (!isAbsolute(dstDir))
            dstDir = join(user.currentDir, dstDir);
        const dstFilePath = resolve(dstDir, (parse(srcFilePath)['base'] + '.br'))

        const brotli = createBrotliCompress();
        const rs = createReadStream(srcFilePath);
        const ws = createWriteStream(dstFilePath);
        rs.pipe(brotli).pipe(ws)
    } catch (e) {
        throw new Error('Operation failed');
    }
};
/* 
decompress ./2/m.txt.br ./1
*/
export const decompressCmd = async (user) => {
    try {

        let srcFilePath = await validateFilePath(user.cmd[1], user.currentDir)
        let dstDir = await checkDirectory(user.cmd[2]);
        if (!isAbsolute(dstDir))
            dstDir = join(user.currentDir, dstDir);
        const dstFilePath = resolve(dstDir, (parse(srcFilePath)['name']))
        const brotli = createBrotliDecompress();
        const rs = createReadStream(srcFilePath);
        const ws = createWriteStream(dstFilePath);
        rs.pipe(brotli).pipe(ws)
    } catch (e) {
        throw new Error('Operation failed');
    }
};