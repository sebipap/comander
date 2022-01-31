// IMPORTS
const express = require('express')

const app = express()
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000

// Importar Routes
const commandRoute = require('./routes/command')
const orderRoute = require('./routes/order')
const menuItemRoute = require("./routes/menuItem")
const courseRoute = require('./routes/course')

// CONNECT DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('[OK] DB Conectada'))

// MIDDLEWARE
app.use(express.json())

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
});

//Route middlewares
app.use('/api/command', commandRoute) 
app.use('/api/order', orderRoute) 
app.use('/api/menuItem', menuItemRoute) 
app.use('/api/course', courseRoute) 




//  For Production use

if(process.env.NODE_ENV === 'production') {
    app.use(express.static((path.join(path.dirname(__dirname), '/build'))))
    app.get('*', (req, res) =>{
        res.sendFile (path.join(path.dirname(__dirname), '/build/index.html'))
    })
}

app.listen(PORT, () => console.log('[OK] Server en puerto' + PORT))
