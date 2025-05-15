require('dotenv').config({ path: './backend/.env' });

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express();
const port = 5000;
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))
app.use('/api/translate', require('./routes/translate'));
app.use('/api/detect-language', require('./routes/detectlanguage'));
app.use('/api/text-to-speech', require('./routes/texttospeech'));
// app.use('/api/detect-language', require('./routes/detectlanguage'));


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
// \Backend> nodemon .\index.js for starting server