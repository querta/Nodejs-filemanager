import { homedir } from 'os';

export class Data {
    constructor(name){
        process.chdir(homedir());
        this.name = name;
        this.currentDir = homedir();
        this.cmd = [];
    }
}
