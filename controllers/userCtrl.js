const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {CLIENT_URL} = process.env

const userCtrl ={
    register: async (req, res) => {
        try{
            const {name,email,password}= req.body
            
            if(!name||!email||!password)
                return res.status(400).json({msg:"please enter correctly"})

            if(!validateEmail(email))
                return res.status(400).json({msg:"invailid email"})

            const user = await Users.findOne({email})
            if(user) 
                return res.status(400).json({msg:"This email already exsist"})

            if(password.lenth<6)
                return res.status(400).json({msg:"password must be atleast 6 character long"})

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newUser= {
                name, email, password: passwordHash 
            }
            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            Sendmail=(email,url)
            console.log({{activation_token})


            res.json({msg:"Register success!please activate your email to start"})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn : '5m'})
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '15m'})
}
const createRefreashToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'})
}

module.exports = userCtrl