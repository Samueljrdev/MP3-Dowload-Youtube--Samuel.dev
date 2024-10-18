const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', (req, res) => {
    const query = req.query.query;
    // Mock data, replace with actual API call
    const songs = [
        { title: 'Song 1', url: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
        { title: 'Song 2', url: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
    ];
    res.json(songs);
});

app.get('/download', (req, res) => {
    const url = req.query.url;
    const output = path.join(__dirname, 'music.mp3');
    const stream = ytdl(url, { quality: 'highestaudio' });

    ffmpeg(stream)
        .audioBitrate(128)
        .save(output)
        .on('end', () => {
            res.download(output, 'music.mp3', (err) => {
                if (err) throw err;
                fs.unlinkSync(output);
            });
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
