import styles from './styles.module.css'
import logo from '../../assets/logo-adivinhe.png'

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo Adivinhe" className={styles.logo} />
    </header>
  )
}

export default Header
