const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());


const DB_CONNECTION_URL = "mongodb+srv://admin:12345@cluster0.5ogl2.mongodb.net/phonebookDb?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
       .catch((err) => console.log(err.message));

//mongoose.set('useFindAndModify', false)