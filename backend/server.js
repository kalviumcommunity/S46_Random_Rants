require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
<<<<<<< HEAD
const router = require('./routes')
const cors = require("cors")
=======
const routes = require('./routes')
>>>>>>> main
const app = express()
let connectionStatus = "disconnected"
app.use(express.json())
app.use(cors())

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

app.listen(process.env.PORT, () => {
    console.log("Server running...")
})

