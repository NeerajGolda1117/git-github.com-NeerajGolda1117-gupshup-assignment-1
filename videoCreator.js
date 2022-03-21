var videoshow = require('videoshow')
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
ffmpeg.setFfmpegPath(ffmpegPath);
// Create FFCreator instance
const getVideo = async () => {
    console.log(__dirname)
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
                return true;
            }
        })
    while (!resp) {
        if (resp) {
            return resp;
        }
        console.log(resp);
    }
}
module.exports = getVideo;