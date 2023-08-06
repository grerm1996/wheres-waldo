import './image.css';
import { useState, useEffect } from 'react';
import CharaMenu from './chara-menu';


function Image(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [searchPosition, setSearchPosition] = useState({ x: 0, y: 0 });
  const [charaStatus, setCharaStatus] = useState({goku: false, cell: false, sanji: false})



  function handleClick(e) {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    const imageRect = e.target.getBoundingClientRect();
    const clickX = e.clientX + window.scrollX; 
    const clickY = e.clientY + window.scrollY;
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setSearchPosition({ x: clickX, y: clickY });
    console.log(`coordinates: ${clickX}, ${clickY}`);
  }

  function endGame() {
    props.setIsGameOver(true);
    props.setRecordTime((new Date() - props.startTime)/1000);
  }

  useEffect(() => {
    const murata = document.getElementById('murata');
    murata.addEventListener('click', handleClick);

    return () => {
      murata.removeEventListener('click', handleClick);
    };
  }, []); 


  useEffect(()=> {
    if (charaStatus.goku && charaStatus.cell && charaStatus.sanji) {
      console.log('you got em all!')
      endGame()
  }}, [charaStatus])


  return (
    <div className="Image">
        < CharaMenu menuPosition={menuPosition} searchPosition={searchPosition} setCharaStatus={setCharaStatus} charaStatus={charaStatus} setMenuOpen={setMenuOpen} menuOpen={menuOpen} endGame={endGame}/>
      <img src='/images/murata.jpg' id='murata' alt='collection of Shonen Jump characters'/>
      <div className={`goku ${charaStatus.goku ? "circle" : ""}`}></div>
      <div className={`cell ${charaStatus.cell ? "circle" : ""}`}></div>
      <div className={`sanji ${charaStatus.sanji ? "circle" : ""}`}></div>
      
    </div>
  );
}

export default Image;