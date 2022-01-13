import { Request, Response } from "express";
import { CreateStudentService } from "../services/CreateStudentService";

class CreateStudentController {
    async handle(request: Request, response: Response) {
        const student = request.body;
        const file = <Express.Multer.File>request.file;

        const service = new CreateStudentService();

        const result = await service.execute(student, file).catch((e) => {
            return response.status(500).json({ message: 'Somenthing went wrong' });
        });

        return response.status(201).json(result);
    }
}

export { CreateStudentController }