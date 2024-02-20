// 메인페이지

const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'react_project', 'build', 'index.html'));
})

module.exports = router ; 