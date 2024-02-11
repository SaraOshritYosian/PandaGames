function playVideo(videoId) {
    var video = document.getElementById(videoId);
    video.play();
}

function pauseVideo(videoId) {
    var video = document.getElementById(videoId);
    video.pause();
}

function openGame1(){
    window.location.href = 'Game1.html';
}
function openGame2(){
    window.location.href = 'Game2.html';
}
function openGame3(){
    window.location.href = 'Game3.html';
}
function exit(){
    window.location.href = 'Home.html';
}
