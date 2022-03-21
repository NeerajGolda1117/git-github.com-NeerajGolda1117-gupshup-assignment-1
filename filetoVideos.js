// const { create } = require("webpage")
const path = require('path');
const sample = require('./htmlSample');
var videoshow = require('videoshow')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
var async = require("async");

ffmpeg.setFfmpegPath(ffmpegPath);
let waittoprocess = false;

const Create = async (userText) => {
    userText = allnames.pop();
    while (userText) {
        if (waittoprocess) {
            continue;
        }
        else {
            waittoprocess = true;
            let imageresp = await sample(userText);
            if (imageresp) {

                const say = require('say')
                const fs = require('fs')
                const path = require('path');
                await say.export(userText, 'Microsoft Zira Desktop', 0.60, path.join(__dirname + `\\${userText}audio.mp3`), async (err) => {
                    if (err) {
                        return console.error(err)
                    } else {

                        if (fs.existsSync(path.join(__dirname + `\\${userText}audio.mp3`))) {
                            console.log('Text has been saved to audio.mp3.')
                            var images = [
                                path.join(__dirname + `\\${userText}birthdayImage.jpg`)
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
                                .audio(__dirname + `\\${userText}audio.mp3`)
                                .save(__dirname + `\\${userText}.mp4`)
                                .on('start', function (command) {
                                    console.log('ffmpeg process started:', command)
                                })
                                .on('error', function (err, stdout, stderr) {
                                    console.error('Error:', err)
                                    console.error('ffmpeg stderr:', stderr)
                                })
                                .on('end', function (output) {
                                    console.error('Video created in:', output)
                                    if (fs.existsSync(path.join(__dirname + `\\${userText}.mp4`))) {
                                        let filePath = path.join(__dirname, `\\${userText}.mp4`);                                //     // var buffer = fs.readFileSync(filePath);
                                        console.log("Done")
                                        waittoprocess = true;
                                        userText = allnames.pop();
                                    }
                                })
                        }
                    }

                })
            }
        }
    }
}
const createVideos = async () => {
    ["Neeraj", "Atiya", "Shivangi"].map(async (value, i) => {
        let resp = await Create(value);
    })
}


