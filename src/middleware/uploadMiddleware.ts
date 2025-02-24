
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, '../../public/uploads'));
    },
    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${file.fieldname + '-' + uniqueSuffix + file.originalname}`);
    },
});

export const upload = multer({ storage: storage });
