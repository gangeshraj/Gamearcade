let level =1;
var levelelem="<div class='score'><b>LEVEL "+level+"</b></div>";
$(".ok").append(levelelem);
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    //loading initail location and image of enemy
    this.speed=speed;
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y%180+60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiplied any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt;
    //if enemy crooses the canvas loops back to canvas with a random start in between the rocks
    if( this.x>=506)
        {
            this.x=-30;
            this.y=this.y%180+60;
        }
    this.iscollison();//check collison with player

};
Enemy.prototype.iscollison=function(){
    // if player and enemy collides
    if ((Math. abs(this.y - player.y)<=55)&&(Math. abs(this.x - player.x)<=55))
    {
        player.x = 200;//player at initial location
        player.y = 435;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//player class
var Player=function(x,y,speed){
    this.sprite='images/char-boy.png';
    this.x=x;
    this.y=y;
    this.speed=speed;
};
//it handles player movement on keyboard input
Player.prototype.handleInput = function(key) {
    if (key == 'left')
        this.x -= 40;
    else if (key== 'up')
        this.y -= 40;
    else if (key == 'right')
        this.x += 40;
    else if  (key == 'down')
        this.y += 40;
};

//it changes level of game and also increases player
Player.prototype.levelchange=function (){
    level+=1;
    $(".score").remove();
    $(".ok").append("<div class='score'><b>LEVEL "+level+"</b></div>");
    this.y=435;
    this.x=200;
    var enemy = new Enemy(0, 180+60,Math.random()*100+50);
    allEnemies.push(enemy);
}
//it checks player doesnt go out of canvas and when reached to water increases the level ansd players calling the level change
Player.prototype.update = function(dt) {
    if (this.x<=-10)
       this. x=-15;
    if (this.x>=420)
        this.x=420;
    if(this.y>=435)
        this.y=435;
    if(this.y<=-10)
        this.levelchange();
};
//draws player on canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player=new Player(200,435,100);
var enemy = new Enemy(-30, 180+60,100);
var allEnemies=[];
allEnemies.push(enemy);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
