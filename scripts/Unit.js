class Unit{

    constructor(number){
       
        this.number = number;
        this.radius = 20;
        this.angle = createVector();
        this.velocity = createVector(random(-0.03,0.03), random(-0.03,0.03));
        this.amplitude = createVector(random(windowWidth/2), random(windowHeight/2));
        this.x = 0;
        this.y = 0;

        this.fallAccelerate = random(2,4);
        this.fallVelocity = 0;

        this.fall = false;
    }

    update(){
        if(this.fall == false){
            this.angle.add(this.velocity);
            this.x = sin(this.angle.x) * this.amplitude.x;
            this.y = sin(this.angle.y) * this.amplitude.y;
        }else{
            this.fallVelocity += this.fallAccelerate;
            this.y += this.fallVelocity;
        }

    }

    drawLine(){
        push();
            translate(windowWidth/2, windowHeight/2);
            strokeWeight(2);
            stroke(69,123,157);
            line(0,0,this.x,this.y);
        pop();
    }

    draw(){
        push();
            translate(windowWidth/2, windowHeight/2);
            strokeWeight(2);
            stroke(69,123,157);

            if(this.isOver()){
                fill(230, 57, 70);
            }else{
                fill(168,218,220);
            }
            
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
            fill(29,53,87);
            textAlign(CENTER,CENTER);
            text(this.number, this.x, this.y);
        pop();
    }

    isOver(){
        if( dist(mouseX, mouseY, this.x+windowWidth/2, this.y+windowHeight/2) <= this.radius){
            return true;
        }else{
            return false;
        }
    }

}