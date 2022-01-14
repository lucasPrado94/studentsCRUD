import Router from 'express';
import Cors from 'cors';
import { CreateStudentController } from './controllers/CreateStudentController';
import multer from 'multer';
import uploadConfig from './config/upload';
import { GetAllStudentsController } from './controllers/GetAllStudentsController';
import { DeleteStudentController } from './controllers/DeleteStudentController';
import { GetStudentController } from './controllers/GetStudentController';
import { UpdateStudentController } from './controllers/UpdateStudentController';

const router = Router();
const upload = multer(uploadConfig);

router.use(Cors({
    origin: '*',
    credentials: true
}))

router.post('/students', upload.single('image'), new CreateStudentController().handle);
router.get('/students', new GetAllStudentsController().handle);
router.get('/students/:id', new GetStudentController().handle);
router.delete('/students/:id', new DeleteStudentController().handle);
router.patch('/students/:id', upload.single('image'), new UpdateStudentController().handle);

export default router;