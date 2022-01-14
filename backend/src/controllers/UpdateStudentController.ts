import { Request, Response } from "express";
import { UpdateStudentService } from "../services/UpdateStudentService";

class UpdateStudentController {
    async handle(request: Request, response: Response) {
        const student = request.body;
        const file = <Express.Multer.File>request.file;
        const { id } = request.params;

        const service = new UpdateStudentService();

        const result = await service.execute(student, file, +id).catch((e) => {
            return response.status(500).json({ message: 'Somenthing went wrong' });
        });

        return response.status(200).json(result);
    }
}

export { UpdateStudentController }