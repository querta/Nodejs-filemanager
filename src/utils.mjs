import { join, isAbsolute, normalize} from 'path';
import { stat } from 'fs/promises';

export const checkDirectory = async (path) => {
    try {
        const fileStat = await stat(path);
        if (fileStat.isDirectory())
            return path;
        return false;

    } catch (e) {
        return false;
    }
};

export const validateFilePath = async (path, currentDir) => {
    try {
        let filePath = normalize(path);
        if (!isAbsolute(filePath))
            filePath = join(currentDir, filePath);
        const validFile = await stat(filePath);
        if (validFile && !validFile.isDirectory()){
            return filePath;
        };
        throw new Error('Wrong file');
        
    } catch (e) {
        throw new Error('Wrong file');
    }
};

