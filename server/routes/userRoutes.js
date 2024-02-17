const express = require('express');
const router = express.Router();
var cors = require('cors')
const validateToken = require('../middleware/validateTokenHeader');
const { 
    getUsers,
    registerUser,
    loginuser,
    currentUsers ,
    getUserChatList,
    saveMessageData,
    getmessageList
} = require('../controllers/userControllers');

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  };

router.get('/', cors(corsOptions), getUsers);
router.get('/chatList', cors(corsOptions), getUserChatList);
router.get('/messageList', cors(corsOptions), getmessageList);
router.post('/register', registerUser);
router.post('/login', loginuser);
router.post('/saveMessageData', saveMessageData);
router.get('/current', validateToken, currentUsers);

module.exports = router;