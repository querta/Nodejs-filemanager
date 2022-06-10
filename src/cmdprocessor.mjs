

export const cmdProcess = async (cmd, user) => {
    try {
        switch (cmd[0]){
        case 'ls':
            await console.log('ls command');
            break;

        default:
            throw new Error('Invalid operation');
        }
        
    } catch(err) {
        console.log(err.message); 
    }
};