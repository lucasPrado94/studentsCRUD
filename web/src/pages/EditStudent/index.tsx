import { NavBar } from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

export function EditStudent() {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [currentImageFileName, setCurrentImageFileName] = useState<string>('');
    const [newImage, setNewImage] = useState<File>();
    const [studentId, setStudentId] = useState<number>();

    const params = useParams();

    useEffect(() => {
        api.get(`students/${params.id}`).then(response => {
            setName(response.data.name);
            setAddress(response.data.address);
            setCurrentImageFileName(response.data.imageFileName);
            setStudentId(response.data.id);
        })
    }, [params.id])

    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (name === '' || address === '') {
            alert('Você precisa digitar um nome e um endereço.');
            return;
        }

        const data = new FormData();

        data.append('name', name);
        data.append('address', address);
        data.append('currentImageFileName', currentImageFileName);
        if (newImage) {
            data.append('image', newImage);
        }

        const result = await api.patch(`students/${studentId}`, data);

        if (result.status === 200)
            navigate('/register');
        else
            alert('Houve um erro ao salvar os dados do aluno');

    };

    function handleSelectedNewImage(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        if (event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('O arquivo escolhido não é uma imagem. Escolha um arquivo em formato jpg, jpeg ou png');
            return;
        }

        setNewImage(event.target.files[0]);
    }

    function handleCancel() {
        navigate('/register');
    }

    return (
        <div>
            <NavBar />
            <section className="container">
                <h1 className="mt-2">Atualização dos dados do aluno</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-10">

                            <div className="mb-3">
                                <span>Os campos com * são de preenchimento obrigatório.</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Digite o nome aqui"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Endereço*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    placeholder="Ditite seu endereço completo aqui"
                                    required
                                />
                            </div>


                        </div>
                        {currentImageFileName !== '' &&
                            <div className="col-md-2">
                                <span className="form-label">Foto atual</span>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${currentImageFileName}`} alt={name} className={styles.currentImage} />
                            </div>
                        }
                    </div>
                    <div className="mb-3  mt-5">
                        <label htmlFor="image" className="form-label">Nova foto</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept=".jpg,.jpeg,.png"
                            aria-describedby="fileHelp"
                            onChange={handleSelectedNewImage}
                        />
                        <small id="fileHelp" className="form-text text-muted">Caso deseje alterar a foto, selecione uma nova. Caso contrário, salve sem selecionar um novo arquivo.</small>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Atualizar</button>
                        <button type="button" onClick={handleCancel} className="btn btn-danger ms-2">Cancelar</button>
                    </div>
                </form>
            </section>
        </div>
    )
}