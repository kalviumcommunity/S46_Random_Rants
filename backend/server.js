require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const router = require('./routes')
const auth = require("./auth")
const cors = require("cors")
const app = express()
let connectionStatus = "disconnected"
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URI,
    optionsSuccessStatus: 200,
    credentials: true
}))

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

app.use("/", router)
app.use("/auth",auth)

app.listen(process.env.PORT, () => {
    console.log("Server running...")
})

