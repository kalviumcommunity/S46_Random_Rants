const express = require("express")
const thoughtModel = require("./models/thought")
const userModel = require("./models/user")
const {validateThought,validateUser} = require("./Validator")
const router = express.Router()

function createModelRoutes(modelName,Model,Validator){

    router.get(`/${modelName}/get`,async (req,res) => {

        try{
            const items = await Model.find()
            res.json(items)
        }catch(err) {
            console.error(err)
            res.status(500).json({error:"Error fetching items",err})
        }
    
    })

    router.get(`/${modelName}/get/:id`,async (req,res) => {

        try{
            const itemId = req.params.id
            const items = await Model.findById(itemId)
            res.json(items)
        }catch(err) {
            console.error(err)
            res.status(500).json({error:"Error fetching items",err})
        }
    
    })

    router.post(`/${modelName}/create`,async (req,res) => {

        const {error,value} = Validator(req.body)

        if(error){
            console.log(error)
            res.send(error.details)
        }else{
            try{
                const items = new Model(req.body)
                await items.save()
                res.status(201).json(items)
            }catch(err) {
                console.error(err)
                res.status(500).json({error:"Error fetching items",err})
            }
        }

    })

    router.put(`/${modelName}/update/:id`,async (req,res) => {

        const {error,value} = Validator(req.body)

        if(error){
            console.log(error)
            res.send(error.details)
        }else{
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
        }

    })

    router.delete(`/${modelName}/remove/:id`,async(req,res) => {

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

    })

}

createModelRoutes("user",userModel,validateUser)
createModelRoutes("thought",thoughtModel,validateThought)

module.exports = router