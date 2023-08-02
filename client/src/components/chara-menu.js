import React, { useState, useEffect } from 'react';
import './image.css';


function CharaMenu(props) {

  const [icon, setIcon] = useState('/images/defaulticon.jpg')


  function showIcon(char) {
      setIcon(`/images/${char}.jpg`)
  }

  function checkChara(chara, searchPosition) {
    console.log(searchPosition)
    fetch(`http://localhost:4000/${chara}/`, {
        method: 'POST',
        body: JSON.stringify({ searchPosition }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
          },
      })
      .then((res) => {
        if (!res.ok) {
          return console.log('sorry!');
        }
        if (res.ok) {
           return console.log(`you found ${chara}!`)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }



  return (

    <div id="charamenu"
        style={{ top: props.menuPosition.y, left: props.menuPosition.x}}
        onMouseLeave={()=>showIcon("defaulticon")}>
            <img src={icon} />
        <ul>
            <li onMouseOver={() => showIcon("gokuicon")} onClick={() => checkChara('goku', props.searchPosition)}>Goku</li>
            <li onMouseOver={() => showIcon("cellicon")} onClick={() => checkChara('cell', props.searchPosition)}>Cell</li>
            <li onMouseOver={() => showIcon("sanjiicon")} onClick={() => checkChara('sanji', props.searchPosition)}>Sanji</li>
        </ul>

    </div>
    )
}

export default CharaMenu