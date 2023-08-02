import './image.css';
import React, { useState, useEffect } from 'react';
import CharaMenu from './chara-menu'

function Image() {
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

  useEffect(() => {
    const murata = document.getElementById('murata');
    murata.addEventListener('click', handleClick);

    return () => {
      murata.removeEventListener('click', handleClick);
    };
  }, []); 

  useEffect(() => {
    console.log('menuOpen:', menuOpen);
  }, [menuOpen]);



  return (
    <div className="Image">
        {menuOpen && (
        < CharaMenu menuPosition={menuPosition} searchPosition={searchPosition} setCharaStatus={setCharaStatus} charaStatus={charaStatus} setMenuOpen={setMenuOpen}/>
      )}
      <img src='/images/murata.jpg' id='murata' alt='collection of Shonen Jump characters'/>
      <div className={`goku ${charaStatus.goku ? "circle" : ""}`}></div>
      <div className={`cell ${charaStatus.cell ? "circle" : ""}`}></div>
      <div className={`sanji ${charaStatus.sanji ? "circle" : ""}`}></div>
    </div>
  );
}

export default Image;