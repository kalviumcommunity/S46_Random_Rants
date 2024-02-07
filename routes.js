const express = require("express")
const router = express.Router()
const {getAllItems,createItem,updateItem,deleteItem} = require("./CRUDController")

router.get("/:model", getAllItems)

router.get("/", (req,res) => {
    res.send("Welcome to Random Rants")
})

router.post("/:model/create",createItem)

router.put("/:model/update/:id",updateItem)

router.delete("/:model/remove/:id",deleteItem)

module.exports = router