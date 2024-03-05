const express = require("express");
const router = express.Router();
const conn = require('../config/database')

router.post('/memberlist',(req,res)=>{
    // console.log(req.body);
    let Object = JSON.parse(req.body.id)
    const sql3 = 'select user_id, user_name, user_addr, user_tel from users';
    conn.query(sql3,[Object],(err, results) => {
        if(results.length>0){
            res.json({results})}
                
        else{

        }
    
    
    })
})

module.exports = router;