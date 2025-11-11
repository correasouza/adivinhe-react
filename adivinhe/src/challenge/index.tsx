import { useState, useEffect } from 'react';
import type { Challenge } from '../utils/words';
import { WORDS } from '../utils/words';

export default function WordGame() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<Set<string>>(new Set());
  const [wrongLetters, setWrongLetters] = useState<Set<string>>(new Set());
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 10;

  // Inicializa o jogo com uma palavra aleatória
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setCurrentChallenge(WORDS[randomIndex]);
    setGuessedLetters([]);
    setCorrectLetters(new Set());
    setWrongLetters(new Set());
    setAttemptCount(0);
  };

  const normalizeString = (str: string): string => {
    return str
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
  };

  const handleLetterGuess = (letter: string) => {
    if (!currentChallenge) return;
    
    const normalizedLetter = normalizeString(letter);
    
    // Evita adicionar letras duplicadas
    if (guessedLetters.includes(normalizedLetter)) return;
    
    setGuessedLetters([...guessedLetters, normalizedLetter]);
    setAttemptCount(attemptCount + 1);

    const normalizedWord = normalizeString(currentChallenge.word);
    
    if (normalizedWord.includes(normalizedLetter)) {
      setCorrectLetters(new Set([...correctLetters, normalizedLetter]));
    } else {
      setWrongLetters(new Set([...wrongLetters, normalizedLetter]));
    }
  };

  const renderWordDisplay = () => {
    if (!currentChallenge) return null;
    
    const normalizedWord = normalizeString(currentChallenge.word);
    
    return normalizedWord.split('').map((letter, index) => {
      const isGuessed = correctLetters.has(letter);
      return (
        <div
          key={index}
          className={`letter-box ${isGuessed ? 'correct' : ''}`}
        >
          {isGuessed ? letter : ''}
        </div>
      );
    });
  };

  const renderUsedLetters = () => {
    return guessedLetters.map((letter, index) => (
      <div
        key={index}
        className={`used-letter ${
          correctLetters.has(letter) ? 'correct' : 'wrong'
        }`}
      >
        {letter}
      </div>
    ));
  };

  const isGameWon = () => {
    if (!currentChallenge) return false;
    const normalizedWord = normalizeString(currentChallenge.word);
    return normalizedWord.split('').every(letter => correctLetters.has(letter));
  };

  const isGameLost = () => {
    return attemptCount >= maxAttempts;
  };

  return (
    <div className="game-container">
      <div className="header">
        <div className="logo">ADIVINHE</div>
        <div className="attempts">
          {attemptCount} de {maxAttempts} tentativas
          <button className="refresh-btn" onClick={startNewGame}>
            ⟲
          </button>
        </div>
      </div>

      {currentChallenge && (
        <>
          <div className="tip-container">
            <div className="tip-icon">♀</div>
            <div className="tip-content">
              <h3>Dica</h3>
              <p>{currentChallenge.tip}</p>
            </div>
          </div>

          <div className="word-display">
            {renderWordDisplay()}
          </div>

          <div className="input-section">
            <h4>Palpite</h4>
            <input
              type="text"
              maxLength={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  handleLetterGuess(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              disabled={isGameWon() || isGameLost()}
              placeholder="Digite uma letra"
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input.value) {
                  handleLetterGuess(input.value);
                  input.value = '';
                }
              }}
              disabled={isGameWon() || isGameLost()}
            >
              Confirmar
            </button>
          </div>

          <div className="used-letters-section">
            <h4>Letras utilizadas</h4>
            <div className="used-letters-container">
              {renderUsedLetters()}
            </div>
          </div>

          {isGameWon() && (
            <div className="game-result win">
              🎉 Parabéns! Você acertou a palavra: {currentChallenge.word}
            </div>
          )}

          {isGameLost() && (
            <div className="game-result lose">
              😢 Game Over! A palavra era: {currentChallenge.word}
            </div>
          )}
        </>
      )}
    </div>
  );
}
