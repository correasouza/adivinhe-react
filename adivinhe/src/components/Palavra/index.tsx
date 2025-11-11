import styles from './styles.module.css'
import { useGame } from '../../context/GameContext'

function Palavra() {
    const { desafioAtual, letrasCorretas, normalizeString } = useGame()

    if (!desafioAtual) {
        return <div className={styles.palavra}></div>
    }

    const normalizedWord = normalizeString(desafioAtual.word)

    return (
        <div className={styles.palavra}>
            {normalizedWord.split('').map((ch, idx) => {
                if (ch === ' ') return <div key={idx} style={{ width: 24 }} />
                const isGuessed = letrasCorretas.has(ch)
                return (
                    <h1
                        key={idx}
                        className={styles.letras}
                        style={isGuessed ? {} : { backgroundColor: '#F1F5FF', color: 'transparent', border: '1px solid #D6E0FF' }}
                    >
                        {isGuessed ? ch : ''}
                    </h1>
                )
            })}
        </div>
    )
}

export default Palavra