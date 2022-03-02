import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {  // config the name of the uploaded photo 
        //  null, random id + the extension of the original archive
        cb(null, uuid() + path.extname(file.originalname))
    }
});

// when i import the module of multer this is config with the const
export default multer({ storage });