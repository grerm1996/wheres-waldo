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
          let icon = document.getElementById('icon');
          icon.classList.add('shake');
          setTimeout(() => {
            icon.classList.remove('shake');
            props.setMenuOpen((prevMenuOpen) => !prevMenuOpen);
          }, 300);
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

    <div className="invisible"
      id={props.menuOpen ? "charamenu" : ""}
      style={
        props.searchPosition.y > 1100
          ? { top: props.menuPosition.y - 197, left: props.menuPosition.x }
          : { top: props.menuPosition.y, left: props.menuPosition.x }
      }
        onMouseLeave={()=>showIcon("default")}>
            <img id='icon' src={icon} />
            <span id="circle-checkmark">✓</span>
        <ul className='dropdown'>

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