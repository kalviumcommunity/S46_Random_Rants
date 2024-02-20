
function detectModel(reqModel){
    const modelName = reqModel
    const Model = require(`./models/${modelName}`) 
    return Model
}

const getAllItems = async (req,res) => {

    const Model = detectModel(req.params.model)

    if (Model){
        try{
            const items = await Model.find()
            res.send(items)
        }catch(err) {
            console.error(err)
            res.status(500).json({error:"Error fetching items",err})
        }
    } else {
        res.status(404).json({message:"Model not found"})
    }

}

const createItem = async (req,res) => {

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
} 

const updateItem = async (req,res) => {

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

}

const deleteItem = async (req,res) => {

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

}



module.exports = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
}