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
