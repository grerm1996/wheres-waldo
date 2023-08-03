require('dotenv').config()

const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
const mongoose = require("mongoose")
app.use(express.json())

function checkChara(chara) {
  return function(req, res) {
    console.log(req.body)
    const { searchPosition } = req.body;
    if (chara === 'goku' && searchPosition.x > 1076 && searchPosition.x < 1120 && searchPosition.y > 346 && searchPosition.y < 395
      || chara === 'cell' && searchPosition.x > 1574 && searchPosition.x < 1646 && searchPosition.y > 277 && searchPosition.y < 343
      || chara === 'sanji' && searchPosition.x > 1025 && searchPosition.x < 1110 && searchPosition.y > 1195 && searchPosition.y < 1296) {
      res.status(200).json({ message: 'got him' });
      console.log('200')
    } else {
      res.status(404).json({ message: 'character not found!' });
      console.log('404')
    }
  }
}

app.post('/goku', checkChara('goku'))
app.post('/cell', checkChara('cell'))
app.post('/sanji', checkChara('sanji'))



app.listen(4000, () => console.log("app listening on port 4000!"));