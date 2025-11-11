import React, { createContext, useContext, useEffect, useState } from 'react'
import { WORDS } from '../utils/words'

export type Challenge = {
  id: number
  word: string
  tip: string
}

type GameContextType = {
  desafioAtual: Challenge | null
  letrasUsadas: string[]
  letrasCorretas: Set<string>
  letrasIncorretas: Set<string>
  tentativas: number
  maxTentativas: number
  startNewGame: () => void
  handleGuess: (letter: string) => void
  normalizeString: (str: string) => string
  isGameWon: () => boolean
  isGameLost: () => boolean
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [desafioAtual, setDesafioAtual] = useState<Challenge | null>(null)
  const [letrasUsadas, setLetrasUsadas] = useState<string[]>([])
  const [letrasCorretas, setLetrasCorretas] = useState<Set<string>>(new Set())
  const [letrasIncorretas, setLetrasIncorretas] = useState<Set<string>>(new Set())
  const [tentativas, setTentativas] = useState<number>(0)

  const maxTentativas = 10

  useEffect(() => {
    startNewGame()
  }, [])

  const normalizeString = (str: string) => {
    return str
      .toUpperCase()
      .normalize('NFD')
      .replace(/[^A-Z\s]/g, '')
  }

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    setDesafioAtual(WORDS[randomIndex])
    setLetrasUsadas([])
    setLetrasCorretas(new Set())
    setLetrasIncorretas(new Set())
    setTentativas(0)
  }

  const handleGuess = (letter: string) => {
    if (!desafioAtual) return
    const normalizedLetter = normalizeString(letter)
    if (!normalizedLetter) return

    if (letrasUsadas.includes(normalizedLetter)) return

    setLetrasUsadas(prev => [...prev, normalizedLetter])
    setTentativas(prev => prev + 1)

    const normalizedWord = normalizeString(desafioAtual.word)
    if (normalizedWord.includes(normalizedLetter)) {
      setLetrasCorretas(prev => new Set(prev).add(normalizedLetter))
    } else {
      setLetrasIncorretas(prev => new Set(prev).add(normalizedLetter))
    }
  }

  const isGameWon = () => {
    if (!desafioAtual) return false
    const normalizedWord = normalizeString(desafioAtual.word)
    const uniqueLetters = Array.from(new Set(normalizedWord.replace(/\s/g, '').split('')))
    return uniqueLetters.every(l => letrasCorretas.has(l))
  }

  const isGameLost = () => {
    return tentativas >= maxTentativas
  }

  return (
    <GameContext.Provider
      value={{
        desafioAtual,
        letrasUsadas,
        letrasCorretas,
        letrasIncorretas,
        tentativas,
        maxTentativas,
        startNewGame,
        handleGuess,
        normalizeString,
        isGameWon,
        isGameLost,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = (): GameContextType => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}

export default GameContext
