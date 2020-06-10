let currentState;


let introFont;
let introTime;
let introTimer;

let units = [];
let level = 1;
let unitCount;
let counter;

let sWindowWidth;
let sWindowHeight;

let failSound;
let successSound;
let clickSound;
let clickSound2;
let clickSound3;
let clickSound4;
let clickSound5;



function setup(){
    sWindowWidth = windowWidth;
    sWindowHeight = windowHeight;

    failSound = loadSound("assets/fail.ogg");
    successSound = loadSound("assets/success.ogg");
    clickSound = loadSound("assets/click.ogg");
    clickSound2 = loadSound("assets/click2.ogg");
    clickSound3 = loadSound("assets/click3.ogg");
    clickSound4 = loadSound("assets/click4.ogg");
    clickSound5 = loadSound("assets/click5.ogg");

    unitCount = level;
    counter = 1;

    introFont = loadFont("assets/introFont.ttf");


    createCanvas(windowWidth, windowHeight);

    introTime = 3;
    introTimer = 0;
    currentState = "INTRO";

    for(let i = 0; i < unitCount; i++){
        units[i] = new Unit(i+1);
    }

}

function draw(){


    background(241, 250, 238);

    if(currentState == "INTRO"){
        drawIntro();
    }else if(currentState == "PLAY"){

        for(let i = 0; i < units.length; i++){
            units[i].update();
            units[i].drawLine();
        }

        for(let i = 0; i < units.length; i++){
            
            units[i].draw();
        }

        if(counter > unitCount){
            //Next level and reset
            level++;
            successSound.play();
            resetGame();
        }


        drawGui();

    }else if(currentState == "FAIL"){
        print("fail");
        //let complete = false;
        for(let i = 0; i < units.length; i++){
            units[i].fall = true;
        }

        for(let i = 0; i < units.length; i++){
            units[i].update();

            if(units[i].y >= windowHeight + units[i].radius){
                units.splice(i,1);
            }
        }

        for(let i = 0; i < units.length; i++){
            
            units[i].draw();
        }

        drawGui();

        //Listede top kalmayınca resetlicez.

        if(units.length == 0){
            resetGame();
        }
        
    }

}

function mousePressed() {

    if(currentState == "PLAY"){
        let clickedBalls = 0;
  
        for(let i = 0; i < units.length; i++){
          if(dist(units[i].x+windowWidth/2, units[i].y+windowHeight/2, mouseX, mouseY) <= units[i].radius){
              clickedBalls++;
    
              if(units[i].number == counter){
                  //Success Click
                units.splice(i,1);
                counter++

                let soundPick = random(1);
                if(soundPick < 0.2){
                    clickSound.play();
                }else if(soundPick < 0.4){
                    clickSound2.play();
                }else if(soundPick < 0.6){
                    clickSound3.play();
                }else if(soundPick < 0.8){
                    clickSound4.play();
                }else if(soundPick < 1){
                    clickSound5.play();
                }
                
              }else{
                currentState = "FAIL";
                failSound.play();
                //resetGame();
              }
    
          }
        }
      
        if(clickedBalls == 0){
            //Missclick
            //Reset same level
            currentState = "FAIL";
            failSound.play();
            //resetGame();
        }
    }

  }


function windowResized(){
    //print(windowWidth / sWindowWidth);
    resizeCanvas(windowWidth, windowHeight);

    for(let i = 0; i < unitCount; i++){
        //units[i].amplitude.x = units[i].amplitude.x * (1- (windowWidth / sWindowWidth) );
        //units[i].amplitude.y = units[i].amplitude.y * (1- (windowHeight / sWindowHeight) );

        units[i].amplitude = createVector(random(windowWidth/2), random(windowHeight/2));
    }

}

function drawIntro(){
    introTimer += deltaTime/1000;
    let alpha;

    if(introTimer <= 2){
        alpha = map(introTimer,0,2,0,255);
    }else{
        alpha = map(introTimer,2,3,255,0);
    }

    print(alpha);
    

    push();
        fill(230, 57, 70, alpha);
        textFont(introFont);
        textAlign(CENTER, BOTTOM);
        textSize(100);
        text("Increase", windowWidth/2, windowHeight/2);

        textAlign(CENTER, TOP);
        textSize(18);
        text("A Game By Burak Can TEMİZEL", windowWidth/2, windowHeight/2);
    pop();

    if(introTimer >= introTime){
        currentState = "PLAY";
    }
}

function drawGui(){
    push();
        textFont(introFont);
        textSize(20);
        fill(230, 57, 70);
        
        text("Level "+level, 24 ,32);
        text("Known issues -> Resolution changes effects amplitudes, cookie save system not implemented, physics works fps based not deltatime", 24, windowHeight - 24);
    pop();
}

function resetGame(){
    //Reset game 
    //unit adetini hesapla
    //counterı sıfırla
    //listeye yeni rakamlari ekle
    currentState = "PLAY";

    //remove all list
    for(let i = 0; i < units.length; i++){
        units.splice(i,1);
    }
    
    unitCount = level;
    counter = 1;

    for(let i = 0; i < unitCount; i++){
        units[i] = new Unit(i+1);
    }

}