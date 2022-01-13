import prismaClient from '../prisma';

class GetStudentService {
    async execute(id: number) {
        await prismaClient.$connect;

        const student = await prismaClient.students.findUnique({
            where: {
                id: id
            }
        }).catch((error) => {
            throw error;
        });

        await prismaClient.$disconnect;

        return student;
    }
}

export { GetStudentService };