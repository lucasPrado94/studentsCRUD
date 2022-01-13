import Student from '../interfaces/student';
import prismaClient from '../prisma';

class GetAllStudentsService {
    async execute() {
        await prismaClient.$connect;

        const students = await prismaClient.students.findMany().catch((error) => {
            throw error;
        });

        await prismaClient.$disconnect;

        return students;
    }
}

export { GetAllStudentsService };