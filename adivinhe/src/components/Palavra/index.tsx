import styles from './styles.module.css'

const Palavra = () => {
    return palavras.map((letra, index) => (
        <div className={styles.palavra} key={index}>
            <h1 className={styles.letras}>{letra}</h1>
        </div>
    ));
}

            <h1 className={styles.letras}>O</h1>
        </div>
    )
}

export default Palavra