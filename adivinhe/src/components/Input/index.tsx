import styles from './styles.module.css'
import { useState } from 'react'
import { useGame } from '../../context/GameContext'

function Input() {
    const { handleGuess, isGameWon, isGameLost } = useGame()
    const [value, setValue] = useState('')

    const submit = () => {
        if (!value) return
        handleGuess(value)
        setValue('')
    }

    return (
        <div className={styles.input}>
            <input
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') submit()
                }}
                disabled={isGameWon() || isGameLost()}
            />
            <button className={styles.button} onClick={submit} disabled={isGameWon() || isGameLost()}>Confirmar</button>
        </div>
    )
}

export default Input