//write a sceleton to server express 



const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const { getInfo, download } = require('./youtube');
app.get('/api/getInfo', getInfo);
app.get('/api/download', download);

const PORT=process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
