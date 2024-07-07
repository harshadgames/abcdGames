export default class Explosion{
    constructor(x,y,game){
        //this.enemyNumber=enemyNumber;
        //this.gameWidth=gameWidth;
        //this.gameHeight=gameHeight;
        //this.image=document.getElementById('enemyImage'+"_"+enemyNumber);

        this.height=200;
        this.width=200;
        this.x=x-50;
        this.y=y-50;
        this.frameX=0;
        this.frameY=0;
        this.speed=0;
        this.markForDeletion=false;
        this.maxFrame=8;
        this.frameTimer=0;
        this.fps=20
        this.frameInterval=1000/this.fps;
        //this.frameTimer=this.frameInterval;
        this.game=game;
        //this.speedY=Math.random>0.5?5:-5;
        //this.audioPath=`/alphabets/${enemyNumber}.mp3`;
        //this.hitAudio = new Audio(this.audioPath);
        this.image=new Image();
        //this.image.src=`${enemyNumber}.png`;
        this.image=document.getElementById('explosionClash');
        

        }

        draw(context) {
        //console.log(this.frameX);
        //context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*300,0,300,300,this.x,this.y,200,200)
        
        }

        update(deltaTime){

    // Enemy sprite animation   
        if (this.frameTimer>this.frameInterval)
            {
            //console.log(this.frameTimer,this.frameInterval);
            if (this.frameX>=this.maxFrame) {this.markForDeletion=true}
            else {this.frameX++;
                //console.log(this.frameX)
            };
            
            this.frameTimer=0;
            //console.log(this.frameX);

            }
        else {
            //console.log(deltaTime);
            this.frameTimer+=deltaTime;}
        


        //this.x-=this.speed;
        //this.x-=0;
        //this.y-=this.speedY;
     


        }

        

}