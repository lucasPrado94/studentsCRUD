import { Request, Response } from "express";
import { GetAllStudentsService } from "../services/GetAllStudentsService";

class GetAllStudentsController {
    async handle(request: Request, response: Response) {
        const service = new GetAllStudentsService();

        const result = await service.execute().catch((e) => {
            return response.status(500).json({ message: 'Somenthing went wrong' });
        });

        return response.status(200).json(result);
    }
}

export { GetAllStudentsController }