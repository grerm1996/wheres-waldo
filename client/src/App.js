import './App.css';
import Image from './components/image';
import Footer from './components/Footer/footer';
import Modal from './components/modal';
import {useState} from 'react'

function App() {

  let [gameOn, setGameOn] = useState(false);

  function startGame() {
    setGameOn(true);
    document.body.style.overflow = 'scroll';
    console.log('start!')
  }


  return (
    <div className="App">
      {gameOn ? null : < Modal startGame={startGame}/>}
      < Image />
    </div>
  );
}

export default App;
