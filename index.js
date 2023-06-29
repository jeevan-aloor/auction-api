const express=require('express')
const {connection}=require('./Conflict/db')
const {RegisterRouter} =require("./Controller/RegRouter")
const cors=require("cors")
const {AuctionRegisterRouter}=require("./Controller/AuctionRegRouter")
const bodyParser = require('body-parser');


const app=express()
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors({
    origin:"*"
  }))

app.use(express.json());


app.use("/",RegisterRouter)
app.use("/",AuctionRegisterRouter)

let port=8001

app.listen(port,async()=>{
    try {
        await connection
        console.log('server is connected to db')    
        
    } catch (error) {
        console.log("server is not connected")
        console.log(error)
        
    }
    console.log(`server is running in ${port} `)
})

// mongodb+srv://jayaraj:Jayraj@123@cluster0.xslbn1w.mongodb.net/?retryWrites=true&w=majority