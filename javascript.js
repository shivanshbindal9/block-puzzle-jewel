var ball;
var w;
var Timer=0;
var myObstacles = [];
function startGame(){
GameArea.start();
ball = new component(190,10,"blue",20,20);
}
var GameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 600;
        this.frameNo = 0;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);},
        clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);},
         stop : function() {
        clearInterval(this.interval);
    }    
    
    }
 
 function component(x,y,color,width,height)
 {
    this.x=x;
    this.y=y;
    //this.color=color;
    this.speedX = 0;
    //this.speedY = 0;
    this.speedY = .2; 
    this.gravity = 0.005;
    this.gravitySpeed = 0;
    this.width=width;
    this.height=height;
    //this.radius=50%;
    this.update=function(){
     ctx = GameArea.context;
     ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
   }
   this.newPos = function() {
   // this.gravitySpeed += this.gravity;
   if(this.x<0)
    this.speedX=1;
else if(this.x>380)
    this.speedX=-1;
        this.x += this.speedX;
        //this.y += this.speedY; 
        this.speedY = .2; 
        this.y += this.speedY ;
        //+ this.gravitySpeed; 
       
 }
  this.newPos2 = function() {
   // this.gravitySpeed += this.gravity;
    if(this.x<0)
    this.speedX=1;
   else if(this.x>380)
    this.speedX=-1;
        this.x += this.speedX;
        //this.y += this.speedY; 
        //this.speedY = 0; 
        this.y = w-this.height;
       
 }
 this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = false;
        if (mybottom<otherbottom&&mybottom>othertop&&myright>otherleft&&myleft<otherright)
            crash=true;
        return crash;
        GameArea.start();
        ball = new component(190,10,"blue",20,20);
    }
    var GameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 400;
            this.canvas.height = 600;
            this.frameNo = 0;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);},
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);},
                stop : function() {
                    clearInterval(this.interval);
            }    

    }

    function component(x,y,color,width,height)
    {
        this.x=x;
        this.y=y;
        this.speedX = 0;
        this.speedY = .2; 
        this.gravity = 0.005;
        this.gravitySpeed = 0;
        this.width=width;
        this.height=height;
        this.update=function(){
            ctx = GameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.newPos = function() {
            if(this.x<0)
                this.speedX=1;
            else if(this.x>380)
                this.speedX=-1;
            this.x += this.speedX;
            this.speedY = .2; 
            this.y += this.speedY ;

        }
        this.newPos2 = function() {
            if(this.x<0)
                this.speedX=1;
            else if(this.x>380)
                this.speedX=-1;
            this.x += this.speedX;
            this.y = w-this.height;

        }
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = false;
            if (mybottom<otherbottom&&mybottom>othertop&&myright>otherleft&&myleft<otherright)
                crash=true;
            return crash;
        }
        this.topp=function()
        {
            return this.y;
        }
        this.bott=function()
        {
            return this.y+(this.height);
        }
    }
    function updateGameArea() {
        var x,y,height,minWidth,maxWidth,maxGap,minGap,gap;
        if(ball.topp()<0||ball.bott()>600)
        {
            GameArea.stop();
            return;
        }
        GameArea.clear();
        timer();
        GameArea.frameNo += 1;
        if (GameArea.frameNo == 1 || everyinterval(50)) {

            y = GameArea.canvas.height ;
            minWidth = 20;
            maxWidth = 300;
            wid = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
            x = GameArea.canvas.width-wid;
            myObstacles.push(new component(x, y, "green", wid, 10));
            myObstacles.push(new component(0, y+75, "green", 240-wid, 10));
        }

        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].y += -3;
            myObstacles[i].update();
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            if (ball.crashWith(myObstacles[i])) {
                w=myObstacles[i].y;
                ball.newPos2(); 
            }
            else
                ball.newPos();  
        }

        ball.update();

}
function everyinterval(n) {
    if ((GameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function moveleft() {
    ball.speedX = -1;
       // ball.speedY = .2; 
}
function moveright() {
    ball.speedX = 1; 
           // ball.speedY = .2; 
}
function stopMove() {
    ball.speedX = 0;
    ball.speedY = 0; 
}
//setInterval(timer,1000);
function timer()
{
    Timer++;
    document.getElementById("score").innerHTML="score:    "  +  Timer;
}

    }
    function everyinterval(n) {
        if ((GameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
    }
    function moveleft() {
        ball.speedX = -1;
    }
    function moveright() {
        ball.speedX = 1; 
    }
    function stopMove() {
        ball.speedX = 0;
        ball.speedY = 0; 
    }
    function timer()
    {

        Timer++;
        document.getElementById("score").innerHTML="score:    "  +  Timer;
    }

    window.onkeydown = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        console.log(key);
        if (key == 39) {
            moveright();
        }else if (key == 37) {
            moveleft();
        }
    }

    window.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        console.log(key);
        if (key == 39 || key == 37) {
            stopMove();
        }
    }
