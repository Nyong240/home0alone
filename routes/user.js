/* 회원 관련 페이지 기능 구현 
- 기능 : 회원가입, 중복체크, 로그인, 회원탈퇴, 로그아웃, 회원검색 
*/

const express = require("express");
const router = express.Router();
const conn = require('../config/database')
// 회원가입
let a = 0
let b = 0
// ID 중복

function isKorean(str) {
    // 정규표현식을 사용하여 한글 여부를 판별합니다.
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return koreanRegex.test(str);
  }
router.post('/checkId',(req,res)=>{
    console.log('ID중복체크',req.body);
    
    const sql2 = 'select user_id from users where user_id = ?'
    conn.query(sql2,[req.body.id],(err,rows)=>{
        if(rows.length>0){
            console.log('실패');
            res.json({result:'dup'})
        }
        else if(req.body.id === ''){
            console.log('실패')
            res.json({result:'white'})
        }
        else if(isKorean(req.body.id)){
            console.log('실패');
            res.json({result:'han'})
        }
        else{
          console.log('성공');
          res.json({result:'uniq'})
          a = 1
        }
    })
})
// Nick 중복
router.post('/checkNick',(req,res)=>{
    console.log('Nick중복체크',req.body);
    
    const sql2 = 'select user_nick from users where user_nick = ?'
    conn.query(sql2,[req.body.nick],(err,rows)=>{
        if(rows.length>0){
            console.log('실패');
            res.json({result:'dup'})
        }
        else if(req.body.nick === ''){
            console.log('실패')
            res.json({result:'white'})
        }
        else{
          console.log('성공');
          res.json({result:'uniq'})
          b = 1
        }
    })
})
// 회원가입 기능
router.post('/signup',(req,res)=>{
    console.log('회원가입 요청...',req.body.userData);
    const key = Object.keys(req.body.userData)
    const value = Object.values(req.body.userData);
    if(a !== 1 || b !==1 ){
        if(a===0){
            res.json({msg:'returnId'})
        }
        else{
            res.json({msg:'conNick'})
        }
    }
    else{
    
    if(value.includes('')){
        function find(e){
            if(e === ''){
                return true
            } 
        }
        res.json({msg:key[(value.findIndex(find))]})
        
    }
    else if(value[4].length!== 8){
        res.json({msg:'conBirth'})
        console.log(value);
    }
    else if(value[6].length!==11){
        res.json({msg:'conTel'})
    }
    else{
                res.json({msg:'success'});
                const sql2 = "INSERT INTO users (user_id, user_pw, user_name, user_nick,user_birthdate, user_addr, user_tel) VALUES (?,sha2(?,256),?,?,?,?,?)"
   
                conn.query(sql2,[value[0],value[1],value[2],value[3],value[4],value[5],value[6]],(err,rows)=>{console.log(err);});}}     
   })


// 로그인
router.post('/login',(req,res)=>{
    console.log('로그인 요청..',req.body);
    const sql2 = "Select user_id,user_pw FROM users where user_id = ? and user_pw = sha2(?,256)"
    
    conn.query(sql2,[req.body.id,req.body.pw],(err,rows)=>{
        
        if(req.body.id === 'admin' && rows.length>0){
            res.json({result:"admin",user:{id:'admin'}})
        }
        
        else if(rows.length>0){
            conn.query(`SELECT * FROM users WHERE user_id = '${req.body.id}' and user_pw = sha2('${req.body.pw}',256)`, function (error, results, fields) {
                if (error) throw error;
                
                res.json({result:"success",user:{id:req.body.id,nick:results[0].user_nick}})
              });
        }
        else{
            res.json({result:"fail"})
        }
    })
})

// 회원 탈퇴 라우터


    
// 로그아웃 라우터
//  - session을 server에 저장한 경우에는 해당 라우터로 와야함 (기존)
//  - session을 front에 저장한 경우에는 로그아웃을 react에서 설정 가능

// 회원정보 (비밀번호) 변경
// router.post('/checkPw',(req,res)=>{
//     console.log('비밀번호 변경 요청..',req.body);
//     res.json({result:'changed'})
// })
// // 회원정보 (이름, 이메일) 수정
// router.post('/modify',(req,res)=>{
//     console.log('회원정보변경',req.body);
//     res.json({result:'success'})
// })
// 회원 탈퇴 라우터
router.post('/delete', (req,res)=>{
    console.log('전달받은 회원정보 : ',req.body)
    const sql2 = "delete from users where user_id = ?"

    conn.query(sql2,[req.body.user.id], (err,rows)=>{
        console.log(`${req.body.user.id}님의 정보를 삭제했습니다`)
    })
})

// 회원 검색 라우터

module.exports = router;
