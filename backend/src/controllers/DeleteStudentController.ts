import { Request, Response } from "express";
import { DeleteStudentService } from "../services/DeleteStudentService";

class DeleteStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteStudentService();

        const result = await service.execute(+id).catch((e) => {
            return response.status(500).json({ message: 'Somenthing went wrong' });
        });

        return response.status(200).json(result);
    }
}

export { DeleteStudentController }