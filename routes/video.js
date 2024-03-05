const downloadFile = require('../config/downloadFile'); 

const express = require("express");
const router = express.Router();
const conn = require('../config/database')

router.post('/videoDown',(req,res)=>{
    let idObject = JSON.parse(req.body.id)
    const sql2 = 'select B.video_name from users A inner join video B on A.user_id = B.user_id where A.user_id = ?;';
    conn.query(sql2,[idObject.id],(err, results) => {
        if(results.length>0){
            for(i=0;i<results.length;i++){downloadFile(results[i].video_name+'.mp4').then(() => console.log('File downloaded successfully'))
            .catch(error => console.error('Error in download', error));}

            res.json({results})
            
        }
            
        else{

        }
    
    
    })})
module.exports = router;



