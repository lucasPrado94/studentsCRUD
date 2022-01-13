import prismaClient from '../prisma';
import fs from 'fs';
import path from 'path';

class DeleteStudentService {
    async execute(id: number) {
        await prismaClient.$connect;

        const deletedStudent = await prismaClient.students.delete({
            where: {
                id: id
            },
            select: {
                imageFileName: true,
            }
        }).catch((error) => {
            throw error;
        });

        await prismaClient.$disconnect;

        fs.unlink(path.join(__dirname, '..', '..', `uploads/${deletedStudent.imageFileName}`), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        return deletedStudent;
    }
}

export { DeleteStudentService };