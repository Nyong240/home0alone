// require, import .. 
const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server);
var globalVariable ='';
var BoolVariable = true;

// Router require 정의(indexRouter, userRouter)
const indexRouter = require('./routes')
const userRouter = require('./routes/user')
const videoRouter = require('./routes/video')
const adminRouter = require('./routes/admin')

// path, cors, body-parser require 정의
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// 정적인 파일을 가져오기 위한 미들웨어 
// app.use(express.static(path.join(__dirname, 'react-project', 'build')));

// cors 오류 해결을 위한 미들웨어 
// 1) cors 모듈 설치 : npm i cors 
// 2) require 
// 3) 사용 
app.use(cors());
app.use(express.json());

// body-parser 미들웨어 대체 express 내장 모듈 
app.use(express.urlencoded({extended : true}));

app.use(bodyParser.urlencoded({ extended: false} ))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'react-project/build')));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'react-project/build/index.html'));
})


// router 
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/admin', adminRouter)

app.set('port', process.env.PORT || 3001); 

app.post('/sensor-data', (req, res) => {
    globalVariable = req.body.value;
    console.log('Received sensor value:', globalVariable);
    // 여기서 센서 값을 처리하거나 저장하는 작업을 수행할 수 있습니다.
    res.sendStatus(200); // 요청 처리 성공 응답
});


io.on('connection', (socket)=>{

    console.log("Connected to Client")
    
    
    socket.on('hello', (data)=>{
        console.log(data.message)
    })

    if(globalVariable !== ''){
        socket.emit('doorLock', { data : "침입자 발생!" })

    }
    socket.emit('hello', 'world');



    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    })


})


server.listen(app.get('port'), ()=>{
    console.log(`listening to port : ${app.get('port')}`);
});