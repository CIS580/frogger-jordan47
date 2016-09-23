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
