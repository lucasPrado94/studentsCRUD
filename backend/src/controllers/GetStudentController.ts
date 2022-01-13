import { Request, Response } from "express";
import { GetStudentService } from "../services/GetStudentService";

class GetStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new GetStudentService();

        const result = await service.execute(+id).catch((e) => {
            return response.status(500).json({ message: 'Somenthing went wrong' });
        });

        return response.status(200).json(result);
    }
}

export { GetStudentController }