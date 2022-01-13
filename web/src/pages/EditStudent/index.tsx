import { NavBar } from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

export function EditStudent() {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [currentImageFileName, setCurrentImageFileName] = useState<string>('');

    const params = useParams();

    useEffect(() => {
        api.get(`students/${params.id}`).then(response => {
            setName(response.data.name);
            setAddress(response.data.address);
            setCurrentImageFileName(response.data.imageFileName);
        })
    }, [params.id])

    const navigate = useNavigate();

    const handleSubmit = () => {

    };

    function handleCancel() {
        navigate('/register');
    }

    return (
        <div>
            <NavBar />
            <section className="container">
                <h1 className="mt-2">Edição dos dados do aluno</h1>
                <div className="row">
                    <div className="col-md-10">
                        <form onSubmit={handleSubmit}>
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
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Alterar foto</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    accept=".jpg,.jpeg,.png"
                                    required
                                    aria-describedby="fileHelp"
                                />
                                <small id="fileHelp" className="form-text text-muted">Caso deseje alterar a foto, selecione uma nova. Caso contrário, salve sem selecionar um novo arquivo.</small>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-2">
                        <span className="form-label">Foto atual</span>
                        <img src={`http://localhost:4000/uploads/${currentImageFileName}`} alt={name} className={styles.currentImage} />
                    </div>

                    <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="button" onClick={handleCancel} className="btn btn-danger ms-2">Cancelar</button>
                    </div>
                </div>
            </section>
        </div>
    )
}