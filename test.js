

const test = () => {
    const path = require('path');
    const { FFScene, FFText, FFVideo, FFAudio, FFAlbum, FFImage, FFCreator } = require("ffcreator");

    FFCreator.setFFmpegPath(require('@ffmpeg-installer/ffmpeg').path)
    FFCreator.setFFprobePath(require('@ffprobe-installer/ffprobe').path)
    // Create FFCreator instance
    const creator = new FFCreator({
        width: 800,
        height: 450
    });

    // Create scene
    const scene = new FFScene();
    scene.setBgColor("#ffcc22");
    scene.setDuration(2);
    scene.setTransition("GridFlip", 2);

    // scene.addAudio({ path: path.join(__dirname + "\\audio.mp3"), loop: true });

    // creator.addChild(scene);
    // Create Image and add animation effect
    const image = new FFImage({ path: path.join(__dirname + "\\birthdayImage.jpg") });
    // image.addEffect("moveInUp", 1, 1);
    // image.addEffect("fadeOutDown", 1, 4);
    // scene.addChild(image);
    creator.addChild(image)
    // Create Text
    // const text = new FFText({ text: "hello 你好", x: 400, y: 300 });
    // text.setColor("#ffffff");
    // text.setBackgroundColor("#000000");
    // // text.addEffect("fadeIn", 1, 1);
    // scene.addChild(text);

    // Create a multi-photo Album
    // const album = new FFAlbum({
    //     list: [image],   // Picture collection for album
    //     x: 250,
    //     y: 300,
    //     width: 500,
    //     height: 300,
    // });
    // album.setTransition('zoomIn');      // Set album switching animation
    // album.setDuration(2.5);             // Set the stay time of a single sheet
    // album.setTransTime(1.5);            // Set the duration of a single animation
    // scene.addChild(album);

    // Create Video
    const video = new FFVideo({ path, x: 300, y: 50, width: 300, height: 200 });
    video.setAudio(true)
    video.setDuration(10)
    // video.addEffect("zoomIn", 1, 0);
    scene.addChild(video);

    creator.output(path.join(__dirname + "\\ffmpegvideo.mp4"));
    creator.start();        // Start processing
    creator.closeLog();     // Close log (including perf)

    creator.on('start', () => {
        console.log(`FFCreator start`);
    });
    creator.on('error', e => {
        console.log(`FFCreator error: ${JSON.stringify(e)}`);
    });
    creator.on('progress', e => {
        console.log("processing")
        //  console.log(colors.yellow(`FFCreator progress: ${e.state} ${(e.percent * 100) >> 0}%`));
    });
    creator.on('complete', e => {
        console.log("complete")// console.log(colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
    });
}
test();