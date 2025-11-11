import styles from './styles.module.css'

function Input() {
    return (
        <div className={styles.input}>
            <input type="text" maxLength={1}/>
        </div>
    )
}

export default Input