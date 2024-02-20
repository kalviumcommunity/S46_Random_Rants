require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const routes = require('./routes')
const app = express()
let connectionStatus = "disconnected"
app.use(express.json())
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        connectionStatus = "Connected"
    } catch(err) {
        connectionStatus = "Failed"
        console.error(err)
    }
    console.log(connectionStatus)
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

app.use("/", routes)

app.listen(process.env.PORT, () => {
    console.log("Server running...")
})

