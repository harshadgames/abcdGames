

export class Bullet {
    constructor (x,y,game){
        this.height=20;
        this.width=20;
        this.vy=0;
        this.vx=0;
        this.x=x;
        this.y=y-this.height;
        this.game=game;
        this.y=this.game.height;
        

    }


    draw (context){

        context.fillStyle = "rgba(10,100, 0, 1)";
        context.fillRect(this.x-this.width/2,this.y-this.height, this.height, this.width);
    
    }

    
    update (position,input){

        
        this.y-=this.vy;
        if (input.i){
            this.vy=20;
        }
        else{
            this.vy=0;  
        }
        //input=1;

        

        
        //console.log(this.x)
    


        //this.x=position+(this.game.gun.width/2)-this.width/2;

        if (this.y<0) {
            this.y=this.game.height;
            this.vy=0;
            input.i=0;
            }

        
    }

}