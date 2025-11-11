import styles from './styles.module.css'
import refresh from '../../assets/refresh-icon.svg'
import { useGame } from '../../context/GameContext'

function Tentativas() {
  const { tentativas, maxTentativas, startNewGame } = useGame()

  return (
    <div className={styles.tentativas}>
      <a><span>{tentativas}</span> de {maxTentativas} tentativas</a>
      <img src={refresh} alt="refresh icon" onClick={startNewGame} style={{cursor: 'pointer'}} />
    </div>
  )
}

export default Tentativas
