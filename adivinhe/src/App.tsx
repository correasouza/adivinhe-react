import './App.css'
import Header from './components/Header'
import Tentativas from './components/Tentativas'
import Dicas from './components/Dicas'
import Palavra from './components/Palavra'
import Input from './components/Input'
import Letras from './components/Letras'
import { GameProvider } from './context/GameContext'

function App() {

  return (
    <GameProvider>
      <div className='app'>
        <div className='container'>
          <Header/>
          <Tentativas/>
          <Dicas/>
          <Palavra/>
          <div className='input-container'>
            <h1>Palpite</h1>
            <div>
              <Input/>
            </div>
          </div>
          <div className='letras-container'>
            <h1>Letras utilizadas</h1>
            <div>
              <Letras/>
            </div>
          </div>
        </div>
      </div>
    </GameProvider>
  )
}

export default App
