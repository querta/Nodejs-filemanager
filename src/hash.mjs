import { createHash } from 'crypto';
import { validateFilePath } from './utils.mjs';
import { createReadStream } from 'fs';

export const hashCmd = async (user) => {
    try {
        let filePath = await validateFilePath(user.cmd[1], user.currentDir);
        return new Promise((success, reject) => {
            const rs = createReadStream(filePath, 'utf-8');
            rs.on("error", () => reject(new Error('Operation failed. Permission denied')));
            const hash = createHash('sha256').setEncoding('hex');
            rs.on('end', () => {
                try{
                    hash.end();
                    console.log(hash.read());
                    rs.close();
                    success();
                } catch (error) { console.log(error); }
            });
            rs.pipe(hash);
        })
    } catch (err) {
        throw new Error ('Invalid input');
    }
};