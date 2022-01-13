import Student from '../interfaces/student';
import prismaClient from '../prisma';

class CreateStudentService {
    async execute(student: Student, file: Express.Multer.File) {
        const imageFileName = file.filename;

        await prismaClient.$connect;

        const studentCreated = await prismaClient.students.create({
            data: {
                name: student.name,
                address: student.address,
                imageFileName: imageFileName
            }
        }).catch((error) => {
            throw error;
        });

        await prismaClient.$disconnect;

        return studentCreated;
    }
}

export { CreateStudentService };