(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Board(existingBoardPositions) {
  var blank = "[ ]";

  if(!existingBoardPositions){
    this.positions = {
                  topLeft : {marker:blank},
                  topCenter : {marker:blank},
                  topRight : {marker:blank},
                  middleRight : {marker:blank},
                  bottomRight : {marker:blank},
                  bottomCenter: {marker:blank},
                  bottomLeft : {marker:blank},
                  middleLeft : {marker:blank},
                  center : {marker:blank},
    };
    this.positions.topLeft.neighbors = {right : "topCenter", 
                                    down : "middleLeft", 
                                    downRight : "center" 
                                  };
    this.positions.topCenter.neighbors = {
                                  left : "topLeft", 
                                  right : "topRight", 
                                  downRight : "middleRight",
                                  down : "center",
                                  downLeft : "middleLeft"
                                };
    this.positions.topRight.neighbors = {
                                  left : "topCenter", 
                                  down : "middleLeft",
                                  downLeft : "center"
                                };
    this.positions.middleLeft.neighbors = {
                                  up : "topLeft", 
                                  upRight : "topCenter",
                                  right : "center",
                                };
    this.positions.center.neighbors = {
                                  left : "middleLeft",
                                  upLeft : "topLeft",
                                  up : "topCenter", 
                                  upRight : "topRight",
                                  right : "middleRight",
                                  downRight : "bottomRight",
                                  down : "bottomCenter",
                                  downLeft : "bottomLeft",
                                }; 
    this.positions.middleRight.neighbors = {
                                  left : "center",
                                  upLeft : "topCenter",
                                  up : "topRight", 
                                  down : "bottomRight",
                                  downLeft : "bottomCenter",
                                };
    this.positions.bottomLeft.neighbors = {
                                  up : "middleLeft", 
                                  upRight : "center",
                                  right : "bottomCenter",
                                };
    this.positions.bottomCenter.neighbors = {
                                  left : "bottomLeft", 
                                  upLeft : "middleLeft",
                                  up : "center",
                                  upRight : "middleRight",
                                  right : "bottomRight",
                                };
    this.positions.bottomRight.neighbors = {
                                  left : "bottomCenter", 
                                  upLeft : "center",
                                  up : "middleRight",
                                };
    var pstns = this.positions                            
    for (pstn in pstns){
      var directions = ["left", "upLeft", "up", "upRight", "right", "downRight", "down", "downLeft" ]
      directions.forEach(function(direction){
        if(!pstns[pstn].neighbors[direction]){
          pstns[pstn].neighbors[direction] = null;
        }
      })
    }                               
  }
  else{
    this.positions = existingBoardPositions;
  }

}

Board.prototype.setMarker = function(position, marker){
  var position = this.positions[position];
  var blank = "[ ]";
  if(position.marker == blank){
    position.marker = marker;
  }

};





  module.exports = Board;
},{}],2:[function(require,module,exports){
var x = " X ";
var o  = " O ";
var blank = "[ ]";
var Board = require('../src/board');

function Game (){
  this.lastMove = {player : null, position : null};
  this.status = "next";
  this.board = new Board();
}

Game.prototype.message = function(message){
  console.log("New message: " + message);
}

Game.prototype.availablePositions = function(){
  var availablePositions = [];
  var board = this.board;
  for (position in board.positions){
    if(board.positions[position].marker == blank){availablePositions.push(position)}
  };
  return availablePositions;

}

Game.prototype.checkForWinner = function(){
  var winner = false;
  var board = this.board;

  var check = function(marker){
    var mkr = marker;
    for (position in board.positions){
      var objCount = {}; 
      for (direction in board.positions[position].neighbors){
        objCount[direction] = {};
        objCount[direction].same = 0;
        objCount[direction].blank = 0;

      }

      if(board.positions[position].marker == mkr){
            //check for neighbors
        var checkNeighbors = function(position, direction){
          if(board.positions[position].neighbors[direction]){
            // console.log(board.positions[board.positions[position].neighbors[direction]])
            if(board.positions[board.positions[position].neighbors[direction]].marker == mkr){
              objCount[direction].same++;
              checkNeighbors(board.positions[position].neighbors[direction], direction);
            }
            if(board.positions[board.positions[position].neighbors[direction]].marker == mkr){
              objCount[direction].blank++;
              checkNeighbors(board.positions[position].neighbors[direction], direction);
            }
          }
        }
        for(direction in objCount){
          checkNeighbors(position, direction);
        }

        if(objCount.left.same + objCount.right.same == 2){
          winner = mkr;
        }
        if(objCount.upLeft.same + objCount.downRight.same == 2){
          winner = mkr;
        }
        if(objCount.downLeft.same + objCount.upRight.same == 2){
          winner = mkr;
        }
        if(objCount.up.same + objCount.down.same == 2){
          winner = mkr;
        }
      } 
    }
  }
  check(x);
  check(o);
  return winner;
}
Game.prototype.checkForTie = function(){
  if(this.availablePositions(this.board).length == 0 && this.status != "winner"){
    return true;
  }
}
Game.prototype.moveIsValid = function(position){
  var moveValid = false;
  this.availablePositions(this.board).forEach(function(availPosition){
    if(availPosition == position){
      moveValid = true;
    }
  })
  return moveValid;
}
Game.prototype.setMove = function(playerMarker, position){
  if(this.moveIsValid(position)){
    this.lastMove = {player : playerMarker, position : position};
    this.board.positions[position] = playerMarker;
  }
  else{
    game.message("Invalid move")
    playerMarker == x ? promptComputer() : promptUser();
  }
}
Game.prototype.promptUser = function(){
  console.log("in user prompt");
  console.log(this)
  // var selection = prompt('Enter a position');
  // this.setMove(o, selection);


}
Game.prototype.promptComputer = function(){
  console.log('in promptComputer')
  this.playerTurn = 'computer';
}
Game.prototype.next = function(){
  if(this.availablePositions(this.board) && this.status != "winner"){
    this.lastMove.player == o ? this.promptComputer() : this.promptUser();
  }
}


module.exports = Game;
},{"../src/board":1}],3:[function(require,module,exports){
var x = " X ";
var o  = " O ";
var blank = "[ ]";
var Board = require('../src/board');
var Game = require('../src/game');

var game = new(Game);
game.next();
},{"../src/board":1,"../src/game":2}]},{},[3,2,1]);
