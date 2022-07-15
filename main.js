Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'">';
    });
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vmHBvKDX2/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

console.log("ml5 version : ",ml5.version);

prediction1="";

prediction2="";

function speak(){
    var synth = window.speechSynthesis;
    speakdata_1= "The 1st Prediction is "+prediction1;
    speakdata_2= "The 2nd Prediction is "+prediction2;
    var utterthis= new SpeechSynthesisUtterance(speakdata_1+speakdata_2);
    synth.speak(utterthis);
}

function predict(){
    img=document.getElementById("image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_1_name").innerHTML=results[0].label;
        document.getElementById("emotion_2_name").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if(results[0].label == "Up Finger"){
            document.getElementById("emoji_1").innerHTML="&#128070;";
        }
        if(results[0].label == "Down finger"){
            document.getElementById("emoji_1").innerHTML="&#128071";
        }
        if(results[0].label == "Side finger"){
            document.getElementById("emoji_1").innerHTML="&#128072;";
        }
        if(results[1].label == "Up Finger"){
            document.getElementById("emoji_2").innerHTML="&#128070;";
        }
        if(results[1].label == "Down finger"){
            document.getElementById("emoji_2").innerHTML="&#128071";
        }
        if(results[1].label == "Side finger"){
            document.getElementById("emoji_2").innerHTML="&#128072;";
        }
    }
}