import './App.css'
import Header from './components/Header'
import Tentativas from './components/Tentativas'
import Dicas from './components/Dicas'
import Palavra from './components/Palavra'
import Button from './components/Button'
import Input from './components/Input'
import Letras from './components/Letras'

function App() {

  return (
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
            <Button/>
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
  )
}

export default App
