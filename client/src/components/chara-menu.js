import React, { useState, useEffect } from 'react';
import './image.css';


function CharaMenu(props) {

  const [icon, setIcon] = useState('/images/defaulticon.jpg');
  

  function showIcon(char) {
    let checkmark = document.getElementById("circle-checkmark")
    if (!props.charaStatus[char]) {
      checkmark.style.display = 'none';
    } else
      checkmark.style.display = 'block'
      setIcon(`/images/${char}icon.jpg`)
      
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
          props.setMenuOpen((prevMenuOpen) => !prevMenuOpen);
          props.setCharaStatus((prevCharaStatus) => ({
            ...prevCharaStatus,
            [chara]: true,
          }));
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
        onMouseLeave={()=>showIcon("default")}>
            <img src={icon} />
            <span id="circle-checkmark">✓</span>
        <ul>

          <li
            onMouseOver={() => showIcon("goku", props.charaStatus)}
            onClick={() => checkChara('goku', props.searchPosition)}
            className={props.charaStatus.goku ? "complete" : ""}
          >Goku</li>

          <li
            onMouseOver={() => showIcon("cell", props.charaStatus)}
            onClick={() => checkChara('cell', props.searchPosition)}
            className={props.charaStatus.cell ? "complete" : ""}
          >Cell</li>


          <li
            onMouseOver={() => showIcon("sanji", props.charaStatus)}
            onClick={() => checkChara('sanji', props.searchPosition)}
            className={props.charaStatus.sanji ? "complete" : ""}
          >Sanji</li>

        </ul>

    </div>
    )
}

export default CharaMenu