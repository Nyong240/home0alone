const express = require('express');
const app = express();

const indexRouter = require('./routes');

const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'react_project', 'build', 'index.html')));

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use('/', indexRouter);

app.set('port', process.env.PORT || 3003);
app.listen(app.get('port'), ()=>{
    console.log(`Server is listening on port ${app.get('port')}`);
})