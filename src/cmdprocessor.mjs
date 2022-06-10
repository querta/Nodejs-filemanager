import {lsCmd, cdCmd, upCmd } from './direcories.mjs';
import { catCmd, addCmd } from './fileoperations.mjs';

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
        default:
            throw new Error('Invalid operation');
        }
        
    } catch(err) {
        console.log(err.message); 
    }
};