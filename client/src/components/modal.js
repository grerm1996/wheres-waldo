import './modal.css'

function Modal(props) {


  return (
    <div className='modal-overlay'>

        <div className="modal">
            <h3>Hi there! Try to <span class='highlight'>find these three characters</span> in this Murata Yusuke drawing:</h3>
            <ul className='modallist'>
                <li>
                    Goku
                    <img src="/images/gokuicon.jpg" alt="goku" />
                </li>
                <li>
                    Cell
                    <img src="/images/cellicon.jpg" alt="cell" />
                </li>
                <li>
                    Sanji
                    <img src="/images/sanjiicon.jpg" alt="sanji" />
                </li>
            </ul>
            <p>Just <span class='highlight'>left click</span> on them and select the correct name. Make sure to <span class='highlight'>use your scroll bars</span> to explore the whole picture — it's a big one!</p>
            <div className="startbtn" onClick={props.startGame}>OK, let's start!</div>
        </div>

    </div>

  )

}
  export default Modal