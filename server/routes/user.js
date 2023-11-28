const express = require('express');
const jwt = require('jsonwebtoken');
const {SECRET , authenticateJwt} = require ("../middleware/auth");
const {User , Admin , Course} = require("../db");
const router = express.Router();


//route for user signup
router.post('/signup', async (req, res) =>{
    const {username,password} = req.body;
    const user = await User.findOne({username});

    if(user){
        res.status(403).json({message : 'user already exist'});
    } else {
        const newUser = new User({username, password});
        await newUser.save();
        const token = jwt.sign({username, role : 'user'},SECRET , {expiresIn : '1h'});
        res.json({message: 'user created successfully', token});
    }
});


//route for user log in

router.post('/login', async (req,res) =>{
    const {username,password} = req.headers;
    const user = await User.findOne({username,password});

    if (user){
        const token = jwt.sign({username, role : 'user'},SECRET , {expiresIn : '1h'});
        res.json({message :"logged in successfully", token});
    }else {
        res.status(403).json({message : "Invalid user id or password"});
    }
});

//route for getting all courses

router.get('/courses', authenticateJwt , async (req,res) =>{
    const courses = await Course.find({published : true});
    res.json({courses});
})

//route to purchase a course

router.post('/courses/:courseId', authenticateJwt , async(req,res) =>{
    const course = await Course.findById(req.params.courseId);

    if(course){
        const user = await User.findOne({username : req.user.username});

        if (user){
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message:"Course Purchased Successfully"});
        }else {
            res.status(403).json({message : 'user not found'});
        }
    }else {
        res.status(403).json({message : 'course not found'});
    }
});

//route to get purchased courses

router.get('/purchasedCourses', authenticateJwt , async (req,res) =>{
    const user = await User.findOne({username : req.user.username}).populate('purchasedCourses');


    if (user){
        res.json({purchasedCourses: user.purchasedCourses || []});

    }else{
        res.status(403).json({message : "user not found"});
    }
});


module.exports = router;