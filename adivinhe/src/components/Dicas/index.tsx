import styles from './styles.module.css';
import dicas from '../../assets/dicas-icon.svg';
import { useGame } from '../../context/GameContext'

function Dicas() {
    const { desafioAtual } = useGame()

    return (
        <div className={styles.dicas}>
            <div className={styles.conteudo}>
                <img src={dicas} alt="dicas icon" />
            </div>
            <div className={styles.conteudo}>
                <h1>Dica</h1>
                <p>{desafioAtual ? desafioAtual.tip : ''}</p>
            </div>
        </div>
    )
}

export default Dicas;