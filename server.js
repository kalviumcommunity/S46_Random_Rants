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

app.listen(process.env.PORT, () => {
    console.log("Server running...")
})


app.get("/ping", (req,res) => {
    res.send("pong")
})
