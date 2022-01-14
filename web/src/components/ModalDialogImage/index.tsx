import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import styles from './styles.module.scss';
import { BASE_URL } from '../../utils/requests';

interface ModalDialogImageProps {
    isOpen: boolean,
    closeFunction: () => void,
    info: {
        name: string,
        imageFileName: string
    }
}

export function ModalDialogImage({ isOpen, closeFunction, info }: ModalDialogImageProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={closeFunction}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <DialogContent>
                <div className={styles.modalContent}>
                    <h1 className={styles.modalTitle}>Aluno: {info.name}</h1>
                    <img src={`${BASE_URL}/uploads/${info.imageFileName}`} alt='Imagem do aluno' className={styles.image} />
                    <button onClick={closeFunction} type="button" className="btn btn-danger mt-2">Fechar</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}