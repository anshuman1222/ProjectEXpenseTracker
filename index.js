const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const {db} =require('./db/db')
const {readdirSync}=require('fs')
const app=express()
require('dotenv').config()
const {KEY,MONGO_URL,PORT}=require('./config/keys')

app.use(express.json())

app.use("*",cors({
    origin: true,
    credentials: true,
}))

app.use(cookieParser())

readdirSync('./routes').map((route)=> app.use('/api',require('./routes/'+route)))


if(process.env.NODE_ENV=='production'){
    const path =require('path')
    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const server=()=>{
    db()
    app.listen(PORT,()=>{
        console.log(`You are listening to port : ${PORT}`)
    })
 
}
server()