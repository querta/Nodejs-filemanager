import {lsCmd, cdCmd, upCmd } from './directories.mjs';
import { catCmd, addCmd, rnCmd, cpmvCmd, rmCmd } from './fileoperations.mjs';
import { osCmd } from './osfunctions.mjs';
import { hashCmd } from './hash.mjs';
import { compressCmd, decompressCmd } from './compress.mjs';

export const cmdProcess = async (cmd, user) => {
    try {
        switch (cmd[0]){
        case 'ls':
            await lsCmd(user);
            break;
        case 'cd':
            await cdCmd(user);
            break;
        case 'up':
            await upCmd(user);
            break;
        case 'cat':
            await catCmd(user);
            break;
        case 'add':
            await addCmd(user);
            break;
        case 'rn':
            await rnCmd(user);
            break;
        case 'cp':
            await cpmvCmd(user);
            break;
        case 'mv':
            await cpmvCmd(user);
            break;
        case 'rm':
            await rmCmd(user);
            break;
        case 'os':
            await osCmd(user);
            break;
        case 'hash':
            await hashCmd(user);
            break;
        case 'decompress':
            await decompressCmd(user);
            break;
        case 'compress':
            await compressCmd(user);
            break;
        default:
            throw new Error('Invalid input');
        }
        
    } catch(err) {
        console.log(err.message); 
    }
};