var x = " X ";
var o  = " O ";
var blank = "[ ]";
var Board = require('../src/board');

function Game (){
  this.lastMove = {player : null, position : null};
  this.nextPlayer = o;
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
  // var moveValid = false;
  return this.availablePositions(this.board).indexOf(position) == -1 ? false : true;
  // this.availablePositions(this.board).forEach(function(availPosition){
  //   if(availPosition == position){
  //     moveValid = true;
  //   }
  // })
  // return moveValid;
}
Game.prototype.setMove = function(playerMarker, position){
  if(this.moveIsValid(position)){
    this.lastMove = {player : playerMarker, position : position};
    this.board.positions[position] = playerMarker;
  }
  else{
    this.message("Invalid move")
  }
  this.next();
}

Game.prototype.next = function(){
  if(this.availablePositions(this.board) && this.status != "winner"){
    this.lastMove.player == o ? this.nextPlayer = x : this.nextPlayer = o;
  }
}


module.exports = Game;