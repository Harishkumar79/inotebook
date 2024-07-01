const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'i@mthecreater';
var fetchUser = require("../middleware/fetchUser");



//ROUTE 2 : create a user using : POST "/api/auth/createUser"  no login required
router.post('/createUser', [
    body('name', 'Enter your name').notEmpty().escape(),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'choose strong password').isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    //if their is an error then send bad requiest and the error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // return res.send(`Hello, ${req.body.name}! \n Your Email: ${req.body.email} \n password: ${req.body.password}`);
        return res.status(400).json({ success ,  errors: result.array() });
    }

    try {
        //check the user with same email is exit or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success ,  errors: "sorry the user already exits with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
       

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const Data = {
            user: {
                id: user.id
            }
        }

        const jwtData = jwt.sign(Data, JWT_SECRET);
        success = true;
        res.json({  success , jwtData });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("sorry some error occured")
    }

})



//ROUTE 2 : loging to user account : POST "/api/auth/login"  no login required
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'password cannot be empty').exists()
], async (req, res) => {

    let success = false;
     //if their is an error then send bad requiest and the error
     const result = validationResult(req);
     if (!result.isEmpty()) {
        return res.status(400).json({ success ,  errors: result.array() });
     }
     const {email , password} = req.body;

    try {
        let user = await User.findOne({email})
        if (!user) {
        success = false;
        return res.status(400).json({ success ,  errors: "Enter correct details" });
        }
        
        const passwordCompair = await bcrypt.compare(password , user.password);

        if(!passwordCompair){
            success = false;
            return res.status(400).json({ success , errors: "Enter correct details" });
        }
        const Data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(Data, JWT_SECRET);
        success = true;
        res.json({ success , authToken });

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured")
    }
})


//ROUTE 3 : Getting details of the loged-in user : POST "/api/auth/getuser"  login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred");
    }
});

module.exports = router;