// import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { stat } from 'fs/promises';

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = dirname(__filename);

export const checkDirectory = async (path) => {
    try {
        const fileStat = await stat(path);
        if (fileStat.isDirectory())
            return true;
        return false;

    } catch (e) {
        return false;
    }
};