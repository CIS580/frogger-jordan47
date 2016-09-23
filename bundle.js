(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const Car_mini = require("./cars_mini.js")

/*Background and Log artwork provided by Caullen Sasnett*/
/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player({x:0, y: 240});
var car_mini1 = new Car_mini({x:134, y:480, speed:0});
var car_mini2 = new Car_mini({x:134, y:680, speed:0});
var car_mini3 = new Car_mini({x:134, y:880, speed:0});
var car_mini4 = new Car_mini({x:260, y:480, speed:1});
var car_mini5 = new Car_mini({x:260, y:680, speed:1});
var car_mini6 = new Car_mini({x:260, y:880, speed:1});
var car_mini7 = new Car_mini({x:320, y:480, speed:0});
var car_mini8 = new Car_mini({x:320, y:680, speed:0});
var car_mini9 = new Car_mini({x:320, y:880, speed:0});

var backgroundCtx = new Image();
backgroundCtx.src = encodeURI('./assets/Background.png');

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  player.update(elapsedTime);
  car_mini1.update(elapsedTime);
  car_mini2.update(elapsedTime);
  car_mini3.update(elapsedTime);
  car_mini4.update(elapsedTime);
  car_mini5.update(elapsedTime);
  car_mini6.update(elapsedTime);
  car_mini7.update(elapsedTime);
  car_mini8.update(elapsedTime);
  car_mini9.update(elapsedTime);
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.drawImage(
    // image
    backgroundCtx,
    // destination rectangle
    0, 0, canvas.width, canvas.height
  );
  player.render(elapsedTime, ctx);
  car_mini1.render(elapsedTime, ctx);
  car_mini2.render(elapsedTime, ctx);
  car_mini3.render(elapsedTime, ctx);
  car_mini4.render(elapsedTime, ctx);
  car_mini5.render(elapsedTime, ctx);
  car_mini6.render(elapsedTime, ctx);
  car_mini7.render(elapsedTime, ctx);
  car_mini8.render(elapsedTime, ctx);
  car_mini9.render(elapsedTime, ctx);
}

},{"./cars_mini.js":2,"./game.js":3,"./player.js":4}],2:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car_mini class
 */
module.exports = exports = Car_mini;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Car_mini(position) {
  this.x = position.x;
  this.y = position.y;
  this.speed = position.speed;
  this.levelCount = 1;
  this.width  = 64;
  this.height = 80;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/cars_mini.svg');
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Car_mini.prototype.update = function(time) {
  if(this.y + this.height < 0) this.y = 480
  this.y -= (this.levelCount + this.speed);
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Car_mini.prototype.render = function(time, ctx) {
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        0, 0, 236, 339,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
}

},{}],3:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],4:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

//variable to hold the current input
var input = {
	up: false,
	down: false,
	left: false,
	right: false
}

function resetInput()
{
  input.up = false;
  input.down = false;
  input.left = false;
  input.right = false;
}

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/PlayerSprite0.png');
  this.timer = 0;
  this.frame = 0;

  var self = this;
  // Movement Code From in-class lightbike assignment
  window.onkeydown = function(event)
  {
    self.state = "hopping";
  	switch(event.keyCode)
  	{
  		//UP
  		case 38:
  		case 87:
  			input.up = true;
  			break;
  		//LEFT
  		case 37:
  		case 65:
  			input.left = true;
  			break;
  		//DOWN
  		case 40:
  		case 83:
  			input.down = true;
  			break;
  		//Right
  		case 39:
  		case 68:
  			input.right = true;
  			break;

  	}
  }
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
var hopStop = 0;
Player.prototype.update = function(time) {
  console.log(this.state);
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    case "hopping":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        hopStop += 1;
        if(this.frame > 3)
        {
          this.frame = 0;
        }
        if(hopStop > 7)
        {
          hopStop = 0;
          this.state = "idle";
        }

        //move the frog
				for(var i = 0; i < 50; i++)
				{
					if(i % 10 == 0)
					{
	          if(input.up)
	          {
	            this.y -= 5;
	          }
	        	else if(input.down)
	          {
	            this.y += 5;
	          }
	        	else if(input.left)
	          {
	            this.x -= 5;
	          }
	        	else if(input.right)
	          {
	            this.x += 5;
	          }
					}
				}
				resetInput();
      }
  }
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 64, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    case "hopping":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 0, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
    // TODO: Implement your player's redering according to state
  }
}

},{}]},{},[1,3,4,2]);
