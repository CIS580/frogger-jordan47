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
