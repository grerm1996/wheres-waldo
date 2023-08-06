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
const { Schema } = mongoose;

const RecordSchema = new Schema({
  time: { type: Number, required: true },
  name: { type: String, required: true }
})

const Records = mongoose.model("Records", RecordSchema);


const addRecord = async (req, res) => {
  const { name, time } = req.body;

  try {
    const newRecord = new Records({
      time, name
    });

    console.log(newRecord)

    const savedRecord = await newRecord.save();
    res.json(savedRecord)
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
    console.error(err);
  }
}

const readRecords = async (req, res) => {
  try {
    const posts = await Records.find().sort({ time: 1 }).limit(10);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
}
  
}



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

const mongoDb = process.env.MONGODB_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.post('/goku', checkChara('goku'))
app.post('/cell', checkChara('cell'))
app.post('/sanji', checkChara('sanji'))
app.post('/record', addRecord)
app.get('/record', readRecords)



app.listen(4000, () => console.log("app listening on port 4000!"));