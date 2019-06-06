var videoplayer = function () {
    console.log("hoge");
    const INFO = "info :";
    const error = "error:";
    const WINDOW_ONLOAD = "window onload";
    const START_LOADING_VIDEO_SRC = "start loading video src";
    const TIMETICK_RATE = 1000 / 60;
    window.onload = function () {
        outputLog(INFO, WINDOW_ONLOAD);
        init();
    }
    function init() {
        initVideoEvent();
        document.getElementById("play-pause").addEventListener("click", onclickPlayPause);
        document.getElementById("skip-b").addEventListener("click", onclickSkipBack);
        document.getElementById("skip-f").addEventListener("click", onclickSkipforward);
        document.getElementById("circle").addEventListener("click", onclickCircle);
        document.getElementById("bar").addEventListener("click", onclickBar);
        timeTicker();
    }
    function initVideoEvent() {
        outputLog(INFO, START_LOADING_VIDEO_SRC);
        let video = document.getElementById("video");
        video.src = "../content/sample.mp4";
        video.addEventListener("canplay", outputVideoLog);
        video.addEventListener("canplaythrough", outputVideoLog);
        video.addEventListener("durationchange", outputVideoLog);
        video.addEventListener("emptied", outputVideoLog);
        video.addEventListener("ended", outputVideoLog);
        video.addEventListener("ended", onchangePlayStatus);
        video.addEventListener("loadeddata", outputVideoLog);
        video.addEventListener("loadedmetadata", outputVideoLog);
        video.addEventListener("pause", outputVideoLog);
        video.addEventListener("pause", onchangePlayStatus);
        video.addEventListener("play", outputVideoLog);
        video.addEventListener("playing", outputVideoLog);
        video.addEventListener("playing", onchangePlayStatus);
        video.addEventListener("ratechange", outputVideoLog);
        video.addEventListener("seeked", outputVideoLog);
        video.addEventListener("seeking", outputVideoLog);
        video.addEventListener("stalled", outputVideoLog);
        video.addEventListener("suspend", outputVideoLog);
        video.addEventListener("timeupdate", outputVideoLog);
        video.addEventListener("volumechange", outputVideoLog);
        video.addEventListener("waiting", outputVideoLog);
    }
    function timeTicker() {
        setInterval(updateSeekbarPosition, TIMETICK_RATE);
    }
    function outputVideoLog(event) {
        outputLog("video log:", event.type);
    }
    function onchangePlayStatus(event) {
        var playPause = document.getElementById("play-pause");
        if (event.type === "playing") {
            playPause.className = "pause";
        } else {
            playPause.className = "play";
        }
    }
    function onclickPlayPause(event) {
        let video = document.getElementById("video");
        if (video.paused) {
            let promise = video.play();
            if (promise !== undefined) {
                promise.then(_ => {
                }).catch(error => {
                    console.log("play rejected");
                });
            }
        } else {
            let promise = video.pause();
            if (promise !== undefined) {
                promise.then(_ => {
                }).catch(error => {
                    console.log("pause rejected");
                });
            }
        }
    }
    function onclickSkipBack(event) {
        let video = document.getElementById("video");
        video.currentTime -= 10;
    }
    function onclickSkipforward(event) {
        video.currentTime += 10;
    }
    function onclickCircle(event) {

    }
    function onclickBar(event) {

    }
    function updateSeekbarPosition() {
        let video = document.getElementById("video");
        let progressRate = video.currentTime / video.duration;
        let bar = document.getElementById("bar");
        let barWidth = bar.clientWidth;
        let circle = document.getElementById("circle");
        circle.style.transform = "translateX(" + barWidth * progressRate + "px)";
    }
    function outputLog(type, message) {
        console.log(type + message);
    }
}();