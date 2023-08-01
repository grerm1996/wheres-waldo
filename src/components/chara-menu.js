import React, { useState, useEffect } from 'react';
import './image.css';


function CharaMenu(props) {

    const [icon, setIcon] = useState('/images/defaulticon.jpg')


    function showIcon(char) {
        setIcon(`/images/${char}.jpg`)
    }

  return (

    <div id="charamenu"
        style={{ top: props.menuPosition.y, left: props.menuPosition.x}}
        onMouseLeave={()=>showIcon("defaulticon")}>
            <img src={icon} />
        <ul>
            <li onMouseOver={() => showIcon("gokuicon")}>Goku</li>
            <li onMouseOver={() => showIcon("cellicon")}>Cell</li>
            <li onMouseOver={() => showIcon("sanjiicon")} >Sanji</li>
        </ul>

    </div>
    )
}

export default CharaMenu