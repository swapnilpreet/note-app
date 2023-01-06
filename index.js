
const express = require('express');
const connection = require('./config/db')
const userController = require("./routes/user.routes");
const notesController = require('./routes/notes.routes');
const authentication = require('./middlewares/authentication');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("home page")
})

app.use("/user",userController)

app.use(authentication)

app.use("/notes",notesController)

app.listen(PORT,async()=>{
    try{
        await connection
        console.log("Db connected")
    }
    catch(err){
    console.log("eroor connecting to db")
    console.log(err)
    }
    console.log("server listening on",PORT)
})