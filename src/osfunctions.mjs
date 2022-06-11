import * as os from 'os';

const printCpus = () => {
    try {
    const cpuinfo = [];
    os.cpus().forEach( (proc) => {
        let speed = (proc.speed / 1000).toFixed(1);
        const currentCpu = {
            Model: proc.model, 
            Mhz: speed
        };
        cpuinfo.push(currentCpu);

    });
    console.table(cpuinfo);
    } catch (e) {
        throw new Error('Operation failed');
    }
}

export const osCmd = async (user) => {
    try {
        switch(user.cmd[1]){
            case '--eol':
                console.log(JSON.stringify(os.EOL));
                break;
            case '--homedir':
                console.log(os.homedir());
                break;
            case '--username':
                console.log(os.userInfo())
                break;
            case '--architecture':
            case '--arch':
                console.log(os.arch());
                break;
            case '--cpus':
                printCpus();
                break;
            default: 
                throw new Error('Invalid input');
        } 
    }catch (err) { throw err }
};