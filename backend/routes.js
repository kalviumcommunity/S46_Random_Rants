const express = require("express")
const router = express.Router()

function detectModel(reqModel){
    const modelName = reqModel
    const Model = require(`./models/${modelName}`) 
    return Model
}

router.get("/:model", async (req,res) => {

    const Model = detectModel(req.params.model)

    if (Model){
        try{
            const items = await Model.find()
            res.json(items)
        }catch(err) {
            console.error(err)
            res.status(500).json({error:"Error fetching items",err})
        }
    } else {
        res.status(404).json({message:"Model not found"})
    }
    
})

router.get("/:model/:id", async (req,res) => {

    const Model = detectModel(req.params.model)

    if (Model){
        try{
            const itemId = req.params.id
            const items = await Model.findById(itemId)
            res.json(items)
        }catch(err) {
            console.error(err)
            res.status(500).json({error:"Error fetching items",err})
        }
    } else {
        res.status(404).json({message:"Model not found"})
    }
    
})

router.get("/", (req,res) => {
    res.send("Welcome to Random Rants")
})

router.post("/:model/create",async (req,res) => {

    const Model = detectModel(req.params.model)

    if (Model){
        try{
            const items = new Model(req.body)
            await items.save()
            res.status(201).json(items)
        }catch(err) {
            console.error(err)
            res.status(500).json({error:"Error fetching items",err})
        }
    }else {
        res.status(404).json({message:"Model not found"})
    }
    
})

router.put("/:model/update/:id",async (req,res) => {

    const Model = detectModel(req.params.model)

    if (Model) {
        try{
            const itemId = req.params.id
            const updatedItem = await Model.findByIdAndUpdate(itemId,req.body,{new:true})
            if(!updatedItem){
                return res.status(404).json({message: "Item not found"})
            }
            res.json(updatedItem)
        } catch(err) {
            console.error(err)
            res.status(500).json({error: "Error  updating item", err})
        }
    }else {
        res.status(404).json({message:"Model not found"})
    }

})

router.delete("/:model/remove/:id",async (req,res) => {

    const Model = detectModel(req.params.model)

    if (Model) {
        try {
            const itemId = req.params.id
            const deletedItem = await Model.findByIdAndDelete(itemId)
            if(!deletedItem){
                return res.status(404).json({message:"Item not found"})
            }
            res.json({message:"Item deleted successfully"})
        } catch(err){
            console.error(err)
            res.status(500).json({message: "Error deleting"})
        }
    }else {
        res.status(404).json({message:"Model not found"})
    }

})

module.exports = router