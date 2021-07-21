duck="";
glom="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;
status1="";
status2="";

function preload(){
    duck= loadSound("DuckTales.mp3");
    glom= loadSound("GlomTales.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video,0,0,600,500);
    status1=duck.isPlaying();
    status2=glom.isPlaying();
    fill("#eb0000");
    stroke("#eb0000");

    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        glom.stop();
        if(status1==false){
            duck.play();
            document.getElementById("song").innerHTML="Playing Ducktales";
        }
    }
    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        duck.stop();
        if(status2==false){
            glom.play();
            document.getElementById("song").innerHTML="Playing Glomtales";
        }
    }

    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score; 
        scoreleftWrist = results[0].pose.keypoints[9].score; 
        console.log("scorerightWrist = " + scorerightWrist + "scoreleftWrist = " + scoreleftWrist); 
        rightWristX = results[0].pose.rightWrist.x; 
        rightWristY = results[0].pose.rightWrist.y; 
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
        leftWristX = results[0].pose.leftWrist.x; 
        leftWristY = results[0].pose.leftWrist.y; 
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
    }
}