const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res, next)=>{
    try {
        const {name, password, email, mobile} =req.body;
        if(!name || !email || !password || !mobile){
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        //  yup, joi, express validator (use to validate req body)

        const isExistUser = await User.findOne({email:email})

        if(isExistUser){
            return res
            .status(409)
            .json({errorMessage:"User already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = new User({
            name, email, password: hashedPassword, mobile,
        });

        await userData.save();
        res.json({ message: "user registered successfully"})

    } catch (error){
        next(error);
    }
}

const loginUser = async(req, res, next)=>{
    try {
        const { password, email} =req.body;
        if( !email || !password ){
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        const userDetails = await User.findOne({ email: email });
        if(!userDetails){
            return res
            .status(409)
            .json({errorMessage:"User doesn't Exists"})
        }

        // compare the password details
        const ispasswordMatched = await bcrypt.compare(password, userDetails.password);
        if(!ispasswordMatched){
            return res
           .status(401)
           .json({errorMessage: 'Invalid password'});
        }

        // JWT
        const token = jwt.sign({
            userId: userDetails._id }, 
            process.env.SECRET_KEY, 
            {expiresIn: "60h"}
        );

        res.json({
            message: "User logged in",
            token: token,
            name: userDetails.name,
        })
    } catch (error){
        next(error);
    }
}

module.exports ={
    registerUser,
    loginUser
}

