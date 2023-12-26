//write a sceleton to server express 



const express = require('express');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));

app.use(express.static('public'));

//write a config to use pug view
app.set('view engine', 'pug');
app.set('views', './__views');


app.get('/', (req, res) => {

    res.render('index2', {time: new Date()});
    //res.sendFile(__dirname + '/index.html');
});

const { getInfo, download } = require('./youtube');
app.get('/api/getInfo', getInfo);
app.get('/api/download', download);

const PORT=process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
