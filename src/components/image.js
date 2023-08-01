import './image.css';
import React, { useState, useEffect } from 'react';
import CharaMenu from './chara-menu'

function Image() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  function handleClick(e) {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    const imageRect = e.target.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
    setMenuPosition({ x: clickX, y: clickY });
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
        < CharaMenu menuPosition={menuPosition}/>
      )}
      <img src='/images/murata.jpg' id='murata' alt='collection of Shonen Jump characters' usemap="#muratamap" />
    </div>
  );
}

export default Image;