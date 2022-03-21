const express = require('express');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
const path = require('path');
app.use(express.json())
const sample = require('./htmlSample');
var videoshow = require('videoshow')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
ffmpeg.setFfmpegPath(ffmpegPath);

app.get("/text/:userText", async (req, res) => {

    let userText = `Hello ${req.params.userText}, Happy Birthday to you ${req.params.userText}`;
    let imageresp = await sample(req.params.userText);
    if (imageresp) {

        const say = require('say')
        const fs = require('fs')
        const path = require('path');
        await say.export(userText, 'Microsoft Zira Desktop', 0.75, 'audio.mp3', async (err) => {
            if (err) {
                return console.error(err)
            } else {
                if (fs.existsSync(path.join(__dirname + "\\audio.mp3"))) {
                    console.log('Text has been saved to audio.mp3.')
                    var images = [
                        path.join(__dirname + "\\birthdayImage.jpg")
                    ]
                    videoshow.ffmpeg.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path)
                    videoshow.ffmpeg.setFfprobePath(require('@ffprobe-installer/ffprobe').path)

                    var videoOptions = {
                        fps: 25,
                        loop: 5, // seconds
                        transition: true,
                        transitionDuration: 1, // seconds
                        videoBitrate: 1024,
                        videoCodec: 'libx264',
                        size: '640x?',
                        audioBitrate: '128k',
                        audioChannels: 2,
                        format: 'mp4',
                        pixelFormat: 'yuv420p'
                    }
                    let resp = false;
                    await videoshow(images, videoOptions)
                        .audio(__dirname + "\\audio.mp3")
                        .save(__dirname + "\\video.mp4")
                        .on('start', function (command) {
                            console.log('ffmpeg process started:', command)
                        })
                        .on('error', function (err, stdout, stderr) {
                            console.error('Error:', err)
                            console.error('ffmpeg stderr:', stderr)
                        })
                        .on('end', function (output) {
                            console.error('Video created in:', output)
                            if (fs.existsSync(path.join(__dirname + "\\video.mp4"))) {
                                let filePath = path.join(__dirname, "video.mp4");
                                res.set("Content-Type", 'application/json');
                                //     // var buffer = fs.readFileSync(filePath);
                                res.send({ "filepath": filePath });
                            }
                        })
                }
            }

        })


    }

})

const port = process.env.PORT || 8886;
app.listen(port, () => {
    console.log('server Connected');
})


