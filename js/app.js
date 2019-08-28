// dimension of the row and colums fron engine.js:27,28
const canvasWidth = 505;
const canvasHeight = 606;
// 'x' value and 'y' movement value to add, from engine.js:137
const cavasrow = 83;
const canvascol = 101;

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x * canvascol;
    this.y = y * cavasrow - 24;
    this.speed = speed;
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = Math.round(this.x + (dt * this.speed));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    // Variables applied to each of our instances go here,
    this.x = 202;
    this.y = 450;
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function (xm = 0, ym = 0) {
    this.x += xm;
    this.y += ym;
};

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x - canvascol >= 0) {
                this.update(-canvascol, 0);
            }
            break;
        case 'right':
            if (this.x + canvascol < canvasWidth) {
                this.update(canvascol, 0);
            }
            break;
        case 'up':
            if (this.y - cavasrow >= -48) {
                this.update(0, -cavasrow);
            }
            break;
        case 'down':
            if (this.y + cavasrow < 450) {
                this.update(0, cavasrow);
            }
            break;
    }
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(0, 0, 100);
var enemy2 = new Enemy(0, 5, 100);
var allEnemies = [enemy1, enemy2];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
