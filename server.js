const express = require("express")
const app = express()

const port = 3000

app.listen(port, () => {
    console.log("Server running...")
})

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.get("/ping", (req,res) => {
    res.send("pong")
})
