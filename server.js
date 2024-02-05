require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const app = express()
let connectionStatus = "disconnected"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        connectionStatus = "Connected"
    } catch(err) {
        connectionStatus = "Failed"
        console.error(err)
    }
} 

connectDB()

const disconnectDB = async () => {
    try {
        await mongoose.disconnect()
        connectionStatus = "disconnected"
    } catch(err) {
        console.error(err)
    }
}

app.get("/", (req,res) => {
    res.send(connectionStatus)
})

app.get("/ping", (req,res) => {
    res.send("pong")
})

app.post("/create",(req,res) => {
    res.status(201).json({"message":"post request successful"})
})

app.put("/update",(req,res) => {
    res.status(200).json({"message":"put request successful"})
})

app.delete("/remove",(req,res) => {
    res.status(200).json({"message":"delete request successful"})
})

app.listen(process.env.PORT, () => {
    console.log("Server running...")
})

