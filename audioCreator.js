const getAudio = async (userText) => {
    // const say = require('say')
    // const fs = require('fs')
    // const path = require('path');
    // await say.export(userText, 'Microsoft Zira Desktop', 0.75, 'audio.mp3', (err) => {
    //     if (err) {
    //         return console.error(err)
    //     } else {
    //         if (fs.existsSync(path.join(__dirname + "\\audio.mp3"))) {
    //             console.log('Text has been saved to audio.mp3.')
    //             return true;
    //         }
    //     }

    // })

    // const gTTS = require('gtts');
    // var gtts = new gTTS(userText, 'en');
    // await gtts.save('audio.mp3', function (err, result) {
    //     if (err) { throw new Error(err) }
    //     console.log('Success! Open file hello.mp3 to hear result.');
    //     return true;
    // });
    var gtts = require('node-gtts')('en');
    var path = require('path');
    var filepath = path.join(__dirname, 'audio.mp3');

    await gtts.save(filepath, userText)
}

module.exports = getAudio;