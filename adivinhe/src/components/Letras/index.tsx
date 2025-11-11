import styles from './styles.module.css';
import { useGame } from '../../context/GameContext'

function Letras() {
    const { letrasUsadas, letrasCorretas, letrasIncorretas } = useGame()

    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {letrasUsadas.map((l, i) => {
                const isCorrect = letrasCorretas.has(l)
                const isWrong = letrasIncorretas.has(l)
                const background = isCorrect ? '#E1F5EC' : isWrong ? '#FFCF62' : '#eee'
                const color = isCorrect ? '#03AB4F' : '#000'
                return (
                    <div key={i} className={styles.letras} style={{ backgroundColor: background, color }}>
                        {l}
                    </div>
                )
            })}
        </div>
    )
}

export default Letras