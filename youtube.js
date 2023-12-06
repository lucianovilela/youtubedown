const fs = require('fs');
const ytdl = require('ytdl-core');

// URL do vídeo do YouTube
let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const getInfo = (req, res, next) => {
    ytdl.getInfo(req.query.url)
    .then(info=>{
        res.json(info);
    })
    .catch(err=>res.send(err.message))
   
}

const download = (req, res, next) => {
    let url = req.query.url;
    let format = req.query.format;
    ytdl.getInfo(url)
    .then(info=>{
        let cformat = ytdl.chooseFormat(info.formats, {itag:format})
        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.${cformat.container}"`)
        ytdl(url, cformat).pipe(res)
    })
    .catch(err=>res.send(err.message))
}

module.exports = {getInfo, download}