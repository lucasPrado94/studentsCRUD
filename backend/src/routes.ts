import Router from 'express';
import { CreateStudentController } from './controllers/CreateStudentController';
import multer from 'multer';
import uploadConfig from './config/upload';
import { GetAllStudentsController } from './controllers/GetAllStudentsController';

const router = Router();
const upload = multer(uploadConfig);

router.post('/students', upload.single('image'), new CreateStudentController().handle);
router.get('/students', new GetAllStudentsController().handle);

export default router;