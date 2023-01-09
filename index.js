require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./user');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const url = process.env.URL_MONGOOSE;

mongoose.connect(url, {useNewUrlParser: true}).then(()=> {
    console.log('Connexion BD resussie')
}).catch((error) => {
    console.log('erreur de connexion ', error); 
});

app.use('/api/user', userRoute);

app.listen(port, () => {
    console.log('Server started at ', port)
})
