import './gameover.css';
import { useState, useEffect } from 'react';
import GitHub from './Footer/github';

function GameOverModal(props) {


    const [records, setRecords] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    async function handleSubmit (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const time = formData.get('time');
        fetch('http://localhost:4000/record/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            time: time,
            name: name
          }),
        })
          .then((response) => {
            if (response.ok) {
                fetch('http://localhost:4000/record', {mode:'cors'})
                .then((res) => res.json())
                .then((data) => {
                   console.log(records);
                   setRecords(data);
                   setFormSubmitted(true)
                })} 
            else {
              console.log('Error retrieving time records:', response);
            }
          })
          .catch((error) => {
            console.log('Error posting new record:', error);
          });
    };

      

    return(

        <div className="gameovermodal-overlay">
            <div className="gameovermodal">
                
                {!formSubmitted ? ( 
                    <>
                        <p>Congratulations, you finished in <strong>{props.recordTime} seconds!</strong></p>
                        <p>What should we call you?</p>
                        <form action="POST" method='localhost:4000/record' onSubmit={handleSubmit}>
                            <input type="text" name='name' autoComplete='off'/>
                            <input type="hidden" name="time" value={props.recordTime} />
                            <button type='submit'>Submit</button>
                        </form>
                    </>
                    ) : (
                        <div className="recordtable">
                          <p>Thanks for playing!</p>
                            {records.map((record, index) => (
                                    <div key={record.id} className={`record ${record.time === props.recordTime ? "highlightrec" : ""}`}>
                                      <div className="index">{index + 1}.</div>
                                      <div className="name">{record.name}</div>
                                      <div className="time">{record.time}s</div>
                                  </div>
                            ))}
                            
                            < GitHub />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default GameOverModal