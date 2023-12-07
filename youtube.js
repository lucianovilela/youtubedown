const fs = require('fs');
const ytdl = require('ytdl-core');

// URL do vídeo do YouTube
let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const getInfo = (req, res, next) => {
    ytdl.getInfo(req.query.url, {begin:'120s'})
        .then(info => {
            res.json(info);
        })
        .catch(err => res.send(err.message))

}

const download = (req, res, next) => {
    let url = req.query.url;

    ytdl.getInfo(url)
        .then(info => {
            let format = ytdl.chooseFormat(info.formats, {quality:req.query.format})
            res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.${format.container}"`)
            ytdl(url, { begin: "120s", format: format }).pipe(res)
        })
        .catch(err => res.send(err.message))
}

module.exports = { getInfo, download }