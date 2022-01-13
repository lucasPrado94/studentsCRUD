import { useState, ChangeEvent, FormEvent } from 'react';
import { NavBar } from '../../components/NavBar';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function NewStudent() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState<File>();

    function handleSelectedImage(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        if (event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('O arquivo escolhido não é uma imagem. Escolha um arquivo em formato jpg, jpeg ou png');
            return;
        }

        setImage(event.target.files[0]);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!image) {
            alert('Você precisa escolher um arquivo válido para a foto.');
            return
        };

        const data = new FormData();

        data.append('name', name);
        data.append('address', address);
        data.append('image', image);


        const result = await api.post('students', data);

        if (result.status === 201)
            navigate('/register');
        else
            alert('Houve um erro ao salvar os dados do aluno');

    }

    function handleCancel() {
        navigate('/register');
    }

    return (
        <div>
            <NavBar />
            <section className="container ">
                <h1 className="mt-2">Cadastro de Novo Aluno</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <span>Todos os campos são de preenchimento obrigatório.</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
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
                        <label htmlFor="address" className="form-label">Endereço</label>
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
                        <label htmlFor="image" className="form-label">Foto</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleSelectedImage}
                            required
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="button" onClick={handleCancel} className="btn btn-danger ms-2">Cancelar</button>
                    </div>
                </form>
            </section>
        </div>
    )
}