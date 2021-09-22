onMyWaySong = "";
gratefulSong = "";
onMyWayStatus = "";
gratefulStatus = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;
leftWristScore = 0;

function preload(){
    onMyWaySong = loadSound("OnMyWay.mp3")
    gratefulSong = loadSound("Grateful.mp3")
}

function setup(){
    canvas = createCanvas(600,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 450);
    fill("red");
    stroke("red");
    onMyWayStatus = onMyWaySong.isPlaying();
    gratefulStatus = gratefulSong.isPlaying();

    if (rightWristScore > 0.2){
        circle(rightWristX,rightWristY,20)
        onMyWaySong.stop();
        if(gratefulStatus == false){
            gratefulSong.play();
            document.getElementById("song_name").innerHTML = "Playing - Grateful Song"
        }
    }
    if (leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20)
        gratefulSong.stop();
        if(onMyWayStatus == false){
            onMyWaySong.play();
            document.getElementById("song_name").innerHTML = "Playing - On My Way Song"
        }
    }

}


function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        // console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        // console.log("LeftWristX : "+leftWristX+" LeftWristY : "+leftWristY+" RightWristX : "+rightWristX+" RightWristY : "+rightWristY)

    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}