var database

var drawing = [];
var currentPath,button2,title,title2,title3,show,clearButton,erase , hi = 1;
var isDrawing = false;
var sprite = [];


function setup(){
  canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);
  

 
  clearButton = createButton('clear');
  clearButton.position(15,420)
  clearButton.size(100,25);
  clearButton.mousePressed(clearDrawing)

  var button1 = createButton('save');
  button1.position(315,420)
  button1.size(100,50);
  button1.mousePressed(saveDrawing)

  var firebaseConfig = {
    apiKey: "AIzaSyChVHN2qIny-Ejs3f7je7CR7FhZIcITwxw",
    authDomain: "the-world-is-our-canvas-a3aa7.firebaseapp.com",
    databaseURL: "https://the-world-is-our-canvas-a3aa7.firebaseio.com",
    projectId: "the-world-is-our-canvas-a3aa7",
    storageBucket: "the-world-is-our-canvas-a3aa7.appspot.com",
    messagingSenderId: "931772565537",
    appId: "1:931772565537:web:c6ecc7ac8ece856290bb60"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();  
  

}


function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}
var rects = [];
function draw(){

  

  background("white");
  

  if (isDrawing){
    var point = {
      x: mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }




  fill("white");

  strokeWeight(10);
  noFill();
  for(var i = 0; i<drawing.length; i++){
     path = drawing[i];
    beginShape();
    for( j = 0; j<path.length; j++){
      vertex(path[j].x,path[j].y)

      
    }
    endShape();
  }

     

 
  

 
  drawSprites();

}



function saveDrawing(){
  
 
  var ref = database.ref('/').set({
    drawing : drawing
  });
 
}



function gotData(data){

  var ref = database.ref('/');
  ref.on('value', gotData, errData)

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i< keys.length; i++ ){
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    var ahref = createButton('#', key);  
    
    ahref.mousePressed(showDrawing);
    ahref.parent(li);     
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(){


  var ref = database.ref('/');
  ref.on('value', oneDrawing, errData);

  function oneDrawing(data){
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing                                                                                                                  //.
  }
}

function clearDrawing(){
  drawing = [];
}

function era(){
  hi = 2
}