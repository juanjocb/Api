const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase/databaseharrybooks-firebase-adminsdk-7aq4k-a72e96074c.json')

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 8080;

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://databaseharrybooks-default-rtdb.firebaseio.com'
});

app.get('/', async(req, res) => {
    try{
        const snapshot = await admin.database().ref('/').once('value');
        const libros = snapshot.val();
        res.json(libros)
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener la base de datos'})
    }
})


app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

