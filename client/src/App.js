import './App.css';
import Image from './components/image';
import Footer from './components/Footer/footer';
import Modal from './components/modal';
import {useState} from 'react';
import GameOverModal from './components/gameover';

function App() {

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  let [gameOn, setGameOn] = useState(false);
  let [startTime, setStartTime] = useState(null);
  let [recordTime, setRecordTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function startGame() {
    setGameOn(true);
    document.body.style.overflow = 'scroll';
    setStartTime(new Date());
    console.log('start!');
  }


  return (
    <div className="App">
      {gameOn ? null : < Modal startGame={startGame}/>}
      < Image startTime={startTime} setIsGameOver={setIsGameOver} setRecordTime={setRecordTime}/>
      {isGameOver ? < GameOverModal recordTime={recordTime}/> : null}
    </div>
  );
}

export default App;
