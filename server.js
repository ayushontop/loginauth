require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser= require('cookie-parser')
const fileUpload = require('express-fileupload')


const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//Routes

app.use('/user', require('./routes/userRouter'))

//connection to mongo db
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true

}, err  =>{
    if(err)throw err;
    console.log("connected to mongo db")
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("server is runniing succesfully on port ", PORT)
})