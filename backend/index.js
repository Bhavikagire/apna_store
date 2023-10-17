const express = require("express")
const app = express()
require('dotenv').config()
const Port = process.env.Port

app.get("/",(req, res)=>{
    res.send("Home page")
})

app.listen(Port,()=>{
   console.log(`server is running at ${Port}`)
})