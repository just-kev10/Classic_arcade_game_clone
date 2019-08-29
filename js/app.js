// dimension of the row and colums fron engine.js:27,28
const canvasWidth = 505;
const canvasHeight = 606;
// 'x' value and 'y' movement value to add, from engine.js:137
const canvasrow = 83;
const canvascol = 101;

// Enemies our player must avoid
var Enemy = function (id) {
    this.id = id;
    let x = this.randomG(5);
    let y = this.randomG(5) + 1;
    // Variables applied to each of our instances go here,
    this.x = x * canvascol;
    this.y = (y * canvasrow) - 24;
    // min speed 100
    this.speed = this.randomG(450) + 50;
    this.row = y + 1;
    this.col = x;
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// creates a random number 
Enemy.prototype.randomG = function (num) {
    return Math.floor(Math.random() * num);
}
Enemy.prototype.reset = function () {
    // reset variables with new random values;
    let randomY = this.randomG(5) + 1;
    this.x = -100;
    this.col = 1;
    this.y = (randomY * canvasrow) - 24;
    this.row = randomY + 1;
    this.speed = this.randomG(450) + 50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = Math.round(this.x + (dt * this.speed));
    // Enemy column position

    this.col = Math.round(this.x / canvascol) + 1;
    if (this.x > 500) {
        this.reset();
    }
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
    this.x = canvascol * 2;
    this.y = 450;
    this.row = 0;
    this.col = 0;
    this.score = 0;
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (xm = 0, ym = 0) {
    this.x += xm;
    this.y += ym;
    this.col = (this.x / canvascol) + 1;
    this.row = ((this.y + 24) / canvasrow) + 1;
    if (this.row == 1) {
        this.score += 1;
        this.reset();
    }
};
// Movement depending  on Keybord input 
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
            if (this.y - canvasrow >= -24 && this.y == 450) {
                this.update(0, (+24 - canvasrow));
            } else if (this.y - canvasrow >= -24) {
                this.update(0, -canvasrow);
            }
            break;
        case 'down':
            if (this.y + canvasrow < 450) {
                this.update(0, canvasrow);
            }
            break;
    }
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.scoret();
};
Player.prototype.scoret = function () {
    ctx.font = "24px 'Lobster', cursive";
    ctx.fillStyle = "#000000";
    ctx.fillText(`Player Score: ${this.score}`, 180, 40, 156);
}
// Take the player to the initial position
Player.prototype.reset = function () {
    this.x = canvascol * 2;
    this.y = 450;
}
// Send the player to the start point after collision
Player.prototype.collisions = function () {
    for (enemy of allEnemies) {
        if (enemy.row == this.row && enemy.col == this.col) {
            this.score = 0;
            setTimeout(this.reset.bind(this), 10);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (let i = 0; i < 10; i++) {
    allEnemies.push(new Enemy(i));
}
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



