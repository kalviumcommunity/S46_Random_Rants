const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.send(connectionStatus)
})

router.get("/ping", (req,res) => {
    res.send("pong")
})

router.post("/create",(req,res) => {
    res.status(201).json({"message":"post request successful"})
})

router.put("/update",(req,res) => {
    res.status(200).json({"message":"put request successful"})
})

router.delete("/remove",(req,res) => {
    res.status(200).json({"message":"delete request successful"})
})

module.exports = router