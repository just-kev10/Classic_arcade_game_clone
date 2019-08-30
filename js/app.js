// dimension of the row and colums fron engine.js:27,28
const canvasWidth = 505;
const canvasHeight = 606;
// 'x' value and 'y' movement value to add, from engine.js:137
const canvasrow = 83;
const canvascol = 101;
// message at winnig
const msg = document.querySelector('.message');


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

var Player = function (sprite = 'images/char-cat-girl.png') {
    // Variables applied to each of our instances go here,
    this.x = canvascol * 2;
    this.y = 450;
    this.row = 0;
    this.col = 0;
    this.score = 0;
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;

};

Player.prototype.update = function (xm = 0, ym = 0) {
    this.x += xm;
    this.y += ym;
    this.col = (this.x / canvascol) + 1;
    this.row = ((this.y + 24) / canvasrow) + 1;
    if (this.row == 1) {
        this.score += 1;
        msg.innerText = "You're winning keep going";
        msg.style.display = 'inline-block';
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
    setTimeout(function () {
        msg.style.display = 'none';
    }, 1000);
}
// Send the player to the start point after collision
Player.prototype.collisions = function () {
    for (enemy of allEnemies) {
        if (enemy.row == this.row && enemy.col == this.col) {
            this.score = 0;
            msg.innerText = 'You lost try harder again';
            msg.style.display = 'inline-block';
            setTimeout(this.reset.bind(this), 10);
        }
    }
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
var game = function modal() {
    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector('.modal-content');
    // const modallevel = document.querySelector('.modal-level');
    const imgs = document.getElementsByClassName("playerSelector");
    const buttonslvl = document.getElementsByClassName("button");
    const playbtn = document.querySelector('.play');
    // modal display
    modal.style.display = 'block';
    // elistener for modal childs
    modalContent.addEventListener('click', function (e) {
        // modal character selection
        if (e.target.tagName == 'IMG') {
            e.target.parentElement.style.border = 'solid black';
            // relative path save 
            gameselection[0] = 'images/' + e.target.src.replace(/^.*[\\\/]/, '');
            for (image of imgs) {
                let imgSrc = image.firstElementChild.src;
                if (e.target.src != imgSrc) {
                    image.style = '';
                }
            }
            //difficulty selection
        } else if (e.target.className == 'button') {
            e.target.style.border = 'solid black';
            gameselection[1] = e.target.firstElementChild.innerText;
            for (button of buttonslvl) {
                if (e.target != button) {
                    button.style.border = 'white';
                }
            }
        } else if (e.target.tagName == 'SPAN'
            && e.target.parentElement.className == 'button') {
            e.target.parentElement.style.border = 'solid black';
            gameselection[1] = e.target.innerText;
            for (button of buttonslvl) {
                if (e.target.parentElement != button) {
                    button.style.border = 'white';
                }
            }
        } else if (e.target.className == 'play') {
            gamevar(gameselection);
            // hide modal after click on play button
            modal.style.display = 'none';
        }
        if (gameselection.length == 2 && gameselection[0] != null) {
            playbtn.style.display = 'inline-block';
        }
    })

}
var gamevar = function (properties) {
    let genemies = 0
    // setting the enemies
    if (properties[1] == 'Hard') {
        genemies = 15;
    } else if (properties[1] == 'Medium') {
        genemies = 8;
    } else {
        genemies = 4;
    }
    for (let i = 0; i < genemies; i++) {
        allEnemies.push(new Enemy(i));
    }
    // setting the player
    player.sprite = properties[0];
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
let gameselection = []
game();
