img="";
status= "";
objects= [];

function preload(){
    img= loadImage('dog_cat.jpg'); //loading the image
}

function setup(){
    //making the canvas
    canvas = createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video, 0, 0, 380, 380); //setting dimensions for the image
    
    if(status != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected"; //showing that object is detected
            document.getElementById("number_of_objects").innerHTML = "Number of objects is : " +objects.length;
        
            fill(r,g,b); //filling the rectangle red so the text color is red
            percent = floor(objects[i].confidence * 100); //finding the confidence of object detection
            text(objects[i].label + " " + percent + "%", objects[i].x +3, objects[i].y +15); //showing the name and confidence of the objects
            noFill();//removing the fill from the rectangle
            stroke(r,g,b); //making the border rgb
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height,); //setting the dimensions of the rectangles
        }
    }

}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}