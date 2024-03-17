const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

//@desc get all users
//@route get /api/users
//@access public

const getUsers = asyncHandler( async (req, res) => {
    const {fromUser} = req.query;
    if(!fromUser){
        res.status(400);
        throw new Error("Current User required");
    }
    const users = await User.find({ _id: { $ne: fromUser } });
    res.status(200).json(users);
});

const getUserChatList = asyncHandler( async (req, res) => {
    const users = await User.find({ _id: { $ne: '65f6cefaacb5bba492544f23' } });
    res.status(200).json(users);
});

const getmessageList = asyncHandler( async (req, res) => {

    const {from, to} = req.query;
    if(!from || !to){
        res.status(400);
        throw new Error("from& to user require");
    }

    const Messages = await Message.find({
        $or: [
          { to: { $in: [from, to] } },
          { from: { $in: [from, to] } }
        ]
      });
    res.status(200).json(Messages);
});

const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.query;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email}); 
    if(userAvailable){
        res.status(400);
        throw new Error("Email already register");
    }
    const hashedPassword =  bcrypt.hashSync(password);

    const user = await User.create({
        username, 
        email, 
        password : hashedPassword
    }); 

    // res.status(201).json({message : req.body});
    res.status(201).json(user);
});

const saveMessageData = asyncHandler( async (req, res) => {
    
    const {from, to, message} = req.body;

    const user = await Message.create({
        from,
        to,
        message: 'abc'
    }); 

    // res.status(201).json({message : req.body});
    res.status(201).json(user);
});

const loginuser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.query;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }
    if(user && ( bcrypt.compareSync(password, user.password))){

        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            },
            // process.env.ACCESS_TOKEN,
            "Shivang",
            {expiresIn: '10m'}
        );

        res.status(200).json({accessToken});
    } else {
        res.status(404).json('credentials not match');
    }



    // res.status(200).json(user);
});

const currentUsers = asyncHandler( async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { 
    getUsers,
    registerUser,
    loginuser,
    currentUsers,
    getUserChatList,
    saveMessageData,
    getmessageList
};

