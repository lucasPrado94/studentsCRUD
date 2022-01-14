import Student from '../interfaces/student';
import prismaClient from '../prisma';
import fs from 'fs';
import path from 'path';

interface StudentUpdateInterface {
    name: string,
    address: string,
    currentImageFileName: string
}

class UpdateStudentService {
    async execute(student: StudentUpdateInterface, file: Express.Multer.File, studentId: number) {
        var studentUpdated: Student;
        if (!file) {
            studentUpdated = updateWithNoNewImage(student, studentId) as any;
        } else {
            studentUpdated = updateWithNewImage(student, file, studentId) as any;
        }

        async function updateWithNoNewImage(student: Student, studentId: number) {
            await prismaClient.$connect;

            const studentUpdated = await prismaClient.students.update({
                where: {
                    id: studentId
                },
                data: {
                    name: student.name,
                    address: student.address,
                }
            }).catch((error) => {
                throw error;
            });

            await prismaClient.$disconnect;

            return studentUpdated;
        }

        async function updateWithNewImage(student: StudentUpdateInterface, file: Express.Multer.File, studentId: number) {
            const newImageFileName = file.filename;

            await prismaClient.$connect;

            const studentUpdated = await prismaClient.students.update({
                where: {
                    id: studentId
                },
                data: {
                    name: student.name,
                    address: student.address,
                    imageFileName: newImageFileName,
                }
            }).catch((error) => {
                throw error;
            });

            await prismaClient.$disconnect;

            fs.unlink(path.join(__dirname, '..', '..', `uploads/${student.currentImageFileName}`), (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            return studentUpdated;
        }

        return studentUpdated;
    }
}

export { UpdateStudentService };