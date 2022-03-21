
var videoText = "";


document.getElementById("videoButton").onclick = async function () {
    videoText = document.getElementById("videoText").value
    const response = await fetch(`http://localhost:8886/text/` + videoText, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json();
    console.log(videoText)
    console.log(myJson.filepath.substr(myJson.filepath.lastIndexOf('/') + 1))

    //downloadFile(myJson.filepath);


    // shoot the laser!
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    document.body.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 200px; border: 3px solid green;  top: 50%;">
    <video width="320" height="240" controls>
  <source src='${dir}/video.mp4' type="video/mp4">
</video>
     <button type="submit" style="height: 50px; width: 200px;" onclick="window.open('${dir}/video.mp4')">Download!</button></div>`

}

function downloadFile(filePath) {

    var link = document.createElement('a');
    link.href = filePath;
    link.setAttribute("download", "Audio");
    link.click();
}