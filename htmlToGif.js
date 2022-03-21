const getGif = () => {
    var htmlToGif = require('html-to-gif'),
        fs = require('fs');
    const path = require('path');

    var options = {
        dimensions: {
            width: 800,
            height: 650,
        },
        url: `file:///D:/DEVGupshup/Text-to-Video-Utility/birthdayHtmlPage.html`,
        duration: 3000,
        repeat: true,
        delay: 30,
        quality: 3,
    };

    var filePath = __dirname + '/myanimated.gif';

    htmlToGif(options, () => {
        console.log('finished');
    }).pipe(fs.createWriteStream(filePath));
}
getGif();