const fs = require('fs');
const ytdl = require('ytdl-core');

// URL do vídeo do YouTube
let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const getInfo = (req, res, next) => {
    ytdl.getInfo(req.query.url)
    .then(info=>{
        res.json(info);
    })
    .catch(err=>res.send(err))
   
}


module.exports = {getInfo}