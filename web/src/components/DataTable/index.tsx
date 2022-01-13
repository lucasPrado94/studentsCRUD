
import { useEffect, useState } from 'react';
import Student from '../../interfaces/student';
import api from '../../services/api';
import { IconContext } from "react-icons";
import { BsEyeFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

import Button from '@mui/material/Button';
import { ModalDialogImage } from '../ModalDialogImage';
import { Link } from 'react-router-dom';

export function DataTable() {
    const [students, setStudents] = useState<Student[]>([]);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [currentModalImageInfo, setCurrentModalImageInfo] = useState({
        name: '',
        imageFileName: ''
    });

    useEffect(() => {
        api.get('students').then(response => {
            setStudents(response.data);
        })
    }, [])

    const handleClickOpenModalImage = (currentImage: string, name: string) => {
        setOpenModalImage(true);
        setCurrentModalImageInfo({
            name: name,
            imageFileName: currentImage
        });
    };

    const handleCloseModalImage = () => {
        setOpenModalImage(false);
        setCurrentModalImageInfo({
            name: '',
            imageFileName: ''
        });
    };

    const handleDelete = async (id: number) => {
        const result = await api.delete(`students/${id}`);
        if (result.status === 200) {
            alert('Aluno excluído com sucesso!');
            window.location.reload();
        } else {
            alert('Houve um problema ao excluir o aluno');
        }
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Foto</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.address}</td>
                                    <td>
                                        <Button onClick={() => handleClickOpenModalImage(student.imageFileName, student.name)}>
                                            <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.5em" }}>
                                                <BsEyeFill />
                                            </IconContext.Provider>
                                        </Button>
                                    </td>
                                    <td>
                                        <div>
                                            <Link to={`/edit-student/${student.id}`} >
                                                <IconContext.Provider value={{ color: "#1f05f0", className: "global-class-name", size: "1.5em" }}>
                                                    <AiFillEdit />
                                                </IconContext.Provider>
                                            </Link>

                                            <Button onClick={() => handleDelete(student.id as any)}>
                                                <IconContext.Provider value={{ color: "#f00510", className: "global-class-name", size: "1.5em" }}>
                                                    <AiFillDelete />
                                                </IconContext.Provider>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {currentModalImageInfo.imageFileName !== '' &&
                <ModalDialogImage
                    isOpen={openModalImage}
                    closeFunction={handleCloseModalImage}
                    info={currentModalImageInfo}
                />
            }

        </>
    )
}