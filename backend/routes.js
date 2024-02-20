const express = require("express")
const router = express.Router()
const {getAllItems,createItem,updateItem,deleteItem} = require("./CRUDController")
const UserModel = require("./models/user");

// router.get("/:model/get", getAllItems)

router.get("/", (req,res) => {
    res.send("Welcome to Random Rants")
})

router.get("/user",async (req,res) => {
    try{
        const items = await UserModel.find()
        res.send(items)
    }catch(err){
        console.err(err)
        res.status(500).json({error:"Error fetching items",err})
    }
})

router.post("/:model/create",createItem)

router.put("/:model/update/:id",updateItem)

router.delete("/:model/remove/:id",deleteItem)

module.exports = router