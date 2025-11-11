import styles from './styles.module.css'
import refresh from '../../assets/refresh-icon.svg'

function Tentativas() {
  return (
    <div className={styles.tentativas}>
      <a><span>5</span> de 10 tentativas</a>
      <img src={refresh} alt="refresh icon" />
    </div>
  )
}

export default Tentativas
