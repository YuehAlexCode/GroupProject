const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

module.exports = {
    register: async (req, res) => {
    try{
        const potentialUser = await User.findOne({email: req.body.email});
        if(potentialUser){
            res.status(400).json({message: "Email already exists"});
        }else{
            const newUser = await User.create(req.body);
            const userToken = jwt.sign({_id:newUser.id, email:newUser.email}, secret ,{expiresIn: "30m"});
            res.cookie('userToken', userToken, {
                httpOnly: true
            }).json({message: "success", user: newUser});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
},
    login: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if(user){
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if(passwordMatch){
                    const userToken = jwt.sign({_id:user.id, email:user.email}, secret, {expiresIn: "1d"});
                    res.cookie("userToken", userToken, {
                        httpOnly: true
                    }).json({message: "success", user: user});
                }
                else{
                res.status(400).json({message: "Invalid login attempt"});
                }
            }else{
                res.status(400).json({message: "Invalid login attempt"});
            }
        }
        catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    },
    logout: (req, res) => {
        res.clearCookie("userToken").json({message: "success"});
    }
}

module.exports.findAllUsers = (req, res) =>{
    User.find({})
        .then((allTourneys) => {res.json(allTourneys);})
        .catch(err=> res.json({message: 'Something went wrong', error: err}))
},

module.exports.findOneUser = (req, res) =>{
    User.findOne({_id: req.params.id })
        .then((findUser) => res.json(findUser))
        .catch((err) => console({message: 'Something went wrong', error: err}))
}
