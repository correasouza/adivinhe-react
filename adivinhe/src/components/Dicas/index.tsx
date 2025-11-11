import styles from './styles.module.css';
import dicas from '../../assets/dicas-icon.svg';

function Dicas() {
    return (
        <div className={styles.dicas}>
            <div className={styles.conteudo}>
                <img src={dicas} alt="dicas icon" />
            </div>
            <div className={styles.conteudo}>
                <h1>Dica</h1>
                <p>Biblioteca para criar interfaces Web com Javascript.</p>
            </div>
        </div>
    )
}

export default Dicas;