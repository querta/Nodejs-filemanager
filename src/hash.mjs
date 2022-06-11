import { createHash } from 'crypto';
import { validateFilePath } from './utils.mjs';
import { createReadStream } from 'fs';

export const hashCmd = async (user) => {
    try {
        let filePath = await validateFilePath(user.cmd[1], user.currentDir);
        const rs = createReadStream(filePath, 'utf-8');
        const hash = createHash('sha256').setEncoding('hex');
        rs.on('end', () => {
            hash.end();
            console.log(hash.read());
            console.log(`You are currently in ${user.currentDir}`);
        });
        rs.pipe(hash);

    } catch (err) {
        throw new Error ('Invalid input');
    }
};