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
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn: "20m"})
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

router.post("/post",authenticateToken, async (req,res) => {

    const {error,value} = validateThought(req.body)

        if(error){
            console.log(error)
            res.send(error.details)
        }else{
            try{
                const items = new thoughtModel(req.body)
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

module.exports = router;
