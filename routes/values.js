const express = require("express");
const router = express.Router();
const conn = require('../config/database')

router.post('/Data',(req,res)=>{
    let Object = JSON.parse(req.body.id)
   
    const sql2 =`select * from userValue where user_id = ?`
    conn.query(sql2,[Object.id],(err,results)=>{
        if(results.length>0){
            res.json({results})
        }
    }) 
})
router.post('/windowPer',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET window_value = ? WHERE user_id = ?;`
    conn.query(sql2,[req.body.per,Object.id],(err,results)=>{
        console.log('완료');
    })
})
router.post('/windowOpen',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET window_current = true WHERE user_id = ?;`
   
    conn.query(sql2,[Object.id] ,function (error, results, fields) {
        if (error) throw error;}
        )
    
})
router.post('/windowClose',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET window_current = false WHERE user_id = ?;`
    console.log(req.body.isWindow);
   
    conn.query(sql2,[Object.id] ,function (error, results, fields) {
        if (error) throw error;}
        )
    
})
router.post('/doorLockOpen',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET doorlock_current = true WHERE user_id = ?;`
   
    conn.query(sql2,[Object.id] ,function (error, results, fields) {
        if (error) throw error;}
        )
    
})
router.post('/doorLockClose',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET doorlock_current = false WHERE user_id = ?;`
    
    conn.query(sql2,[Object.id] ,function (error, results, fields) {
        if (error) throw error;}
        )
    
})
router.post('/time',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    console.log(req.body.a[0]);
    const sql2 = `UPDATE userValue SET going_out_h = ? , going_out_m = ?  WHERE user_id = ?;`
    
    conn.query(sql2,[req.body.a[0],req.body.a[1],Object.id],function (error, results, fields){
        if (error) throw error;
    })
})
router.post('/outOn',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET going_out_current = true  WHERE user_id = ?;`
    
    conn.query(sql2,[Object.id]),function (error, results, fields){
        if (error) throw error;
    }
})

router.post('/outOff',(req,res)=>{
    let Object = JSON.parse(req.body.id)
    const sql2 = `UPDATE userValue SET going_out_current = false  WHERE user_id = ?;`
    
    conn.query(sql2,[Object.id]),function (error, results, fields){
        if (error) throw error;
    }
})


module.exports = router;