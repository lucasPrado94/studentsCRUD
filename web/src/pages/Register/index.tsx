import { Link } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { NavBar } from '../../components/NavBar';

export function Register() {

    return (
        <div>
            <NavBar />
            <section className="container ">
                <h1 className="mt-2">Cadastro de Alunos</h1>
                <div className="d-flex justify-content-center">
                    <Link to="/new-student">
                        <button type="button" className="btn btn-primary">
                            Novo Aluno
                        </button>
                    </Link>
                </div>
                <DataTable />
            </section>
        </div>
    )
}