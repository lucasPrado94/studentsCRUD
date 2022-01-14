import { diskStorage } from 'multer';
import path from 'path';

export default {
    storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-student_image.jpg`;
            cb(null, fileName);
        },
    })
}