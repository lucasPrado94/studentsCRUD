import { NavBar } from '../../components/NavBar';
import styles from './styles.module.scss';

export function Home() {
    return (
        <div>
            <NavBar />
            <section className={styles.homeContent}>
                <h1>Seja bem-vindo!</h1>
                <p>Para acessar a página do CRUD, clique em "Cadastro de Alunos" na barra acima.</p>
            </section>
        </div>
    )
}