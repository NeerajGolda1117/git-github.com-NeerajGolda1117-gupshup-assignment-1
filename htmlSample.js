const fs = require('fs')
const path = require('path');
const puppeteer = require('puppeteer');

async function htmlContent(userText) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlPageContent.replace("<userName>", userText).replace("<imageurl>", path.join(__dirname + `\\GalgalImage.png`)));
    const content = await page;
    const imageBuffer = await content.screenshot({ omitBackground: true });
    await page.close();
    await browser.close();
    const fs = require("fs");
    const buffer = Buffer.from(imageBuffer, "base64");
    fs.writeFileSync(path.join(__dirname + `\\${userText}birthdayImage.jpg`), buffer);
    if (fs.existsSync(path.join(__dirname + `\\${userText}birthdayImage.jpg`))) {
        return true;
    }

}
htmlContent("Neeraj Golda")

var htmlPageContent = `<!DOCTYPE html>
<html>
  
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content=
        "width=device-width, initial-scale=1" />
      
    <style>
        .body-bg {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 50%;
            left: 50%;     
        }
  
        .container {
            width: 80%;
            height: 80%;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);  
        }
  
        .container-data {
            padding: 24px;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
            color: #fff;
            font-family: Arial;
            font-size: 3vw;
        }
  
        @media only screen and (max-width: 763px) {
            .container-data {
                padding: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 80%;
                transform: translateX(-50%) translateY(-50%);
                text-align: center;
                color: #fff;
                font-family: Arial;
                font-size: 6vw;
            }
        }
  
        @media only screen and (max-height: 423px) {
            .container-data {
                padding: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 80%;
                transform: translateX(-50%) translateY(-50%);
                text-align: center;
                color: #fff;
                font-family: Arial;
                font-size: 4vw;
            }
        }
    </style>
</head>
  
<body style="background-image: url('<imageurl>');">
    <div class="body-bg"></div>
    <div class="container">
        <div class="container-data">
            <div id="msg"></div>
        </div>
    </div>
  
    <script>
        var messages = ["<userName>"];
  
        var i = messages.length;
        var s = Math.floor(Math.random() * i);
          
        document.getElementById("msg")
            .innerHTML = '" ' + messages[s] + ' "';
    </script>
</body>
  
</html>`
module.exports = htmlContent