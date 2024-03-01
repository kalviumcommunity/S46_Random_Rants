require("dotenv").config();
const express = require("express");
const userModel = require("./models/user");
const thoughtModel = require("./models/thought")
const { validateThought, validateUser } = require("./Validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();

function validate(req, res, next) {
  const { error, value } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.send(error.details);
  }
  next();
}

function authenticateToken (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user) => {
        if(err) return res.sendStatus(401)
        next()
    })
}

function generateAccessToken(payload){
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn: "1d"})
    return token
}

function generateRefreshToken(payload){
    const token = jwt.sign(payload,process.env.REFRESH_TOKEN)
    return token
}

router.post("/signup", validate, async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered, please log in" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    email: email,
    password: encryptedPassword,
  };
  try {
    const items = new userModel(user);
    await items.save();
    res.send(items)
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sign up failed", err });
}
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email: email });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const payload = {email: email}
            const accessToken= generateAccessToken(payload)
            const refreshToken = generateRefreshToken(payload)
            res.status(200).json({ message: `${user.username}, You have successfully logged in`, accessToken: accessToken,refreshToken: refreshToken,email: email });
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  } else {
    res.status(400).json({ error: "Email is not registered please sign up" });
  }
});

router.post("/post/:id",authenticateToken, async (req,res) => {

    const userId = req.params.id
    const {error,value} = validateThought({userId,...req.body})

        if(error){
            console.log(error)
            res.send(error.details)
        }else{
            try{
                const items = new thoughtModel({userId,...req.body})
                await items.save()
                res.status(201).json(items)
            }catch(err) {
                console.error(err)
                res.status(500).json({error:"Error fetching items",err})
            }
        }
})

router.get("/logout", async (req,res) => {
    res.send({message: "logout successful"})
})

router.get("/user/:email", authenticateToken, async (req,res) => {
    try{
        const itemId = req.params.email
        const items = await userModel.findOne({email: itemId})
        res.json(items)
    }catch(err) {
        console.error(err)
        res.status(500).json({error:"Error fetching items",err})
    }
})

router.get("/posts/:id", authenticateToken, async (req,res) => {

    try{
        const itemId = req.params.id
        const items = await thoughtModel.find({userId: itemId})
        res.json(items)
    }catch(err) {
        console.error(err)
        res.status(500).json({error:"Error fetching items",err})
    }

})

router.put("/update/:id",authenticateToken,async (req,res) => {
    
    const {error,value} = validateThought({userId: req.params.id,...req.body})

        if(error){
            console.log(error)
            res.send(error.details)
        }else{
            try{
                const itemId = req.params.id
                const updatedItem = await thoughtModel.findOneAndUpdate({userId: itemId},req.body,{new:true})
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

router.delete("/delete/:id", authenticateToken, async (req,res) => {

    try {
        const itemId = req.params.id
        const deletedItem = await thoughtModel.findByIdAndDelete(itemId)
        if(!deletedItem){
            return res.status(404).json({message:"Item not found"})
        }
        res.json({message:"Item deleted successfully"})
    } catch(err){
        console.error(err)
        res.status(500).json({message: "Error deleting"})
    }

})

module.exports = router;
