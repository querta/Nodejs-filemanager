import { stdin as input, stdout as output } from 'node:process';
import { EOL } from 'os'
import * as readline from 'node:readline';
import { Data } from './data.mjs';
import { cmdProcess } from './cmdprocessor.mjs';

export const user = new Data("Stranger");
    try {
        if (process.argv.length <= 2)
            throw new Error ('Invalid input');
        if (process.argv[2].startsWith("--username="))
            user.name =  process.argv[2].slice(11);

        const rl = readline.createInterface({ input, output, prompt: '' });
        process.stdout.write(`Welcome to the File Manager, ${user.name}!${EOL}${EOL}`);
        process.stdout.write(`You are currently in ${user.currentDir}${EOL}`);
        rl.on('error', () => {
            console.log('This is error');
        });
        rl.on('line', async (line)=> {
            try {
                const userInput = line.toString().trim();
                user.cmd = userInput.split(' ');
                if (user.cmd[0] == ".exit" || user.cmd[0] == "exit") rl.close();
                else {
                    await cmdProcess(user.cmd, user);
                    process.stdout.write(`You are currently in ${user.currentDir}${EOL}`);            
                }
            } catch(err) { console.log(err.message); }
        });
        rl.on('close', () => {
            process.stdout.write(`Thank you for using File Manager, ${user.name}!${EOL}`);
        });


    } catch(err) {
        console.log(err.message);
    }