var x = " X ";
var o  = " O ";
var blank = "[ ]";

function Game (){
  this.lastMove = {player : null, position : null};
  this.status = "next";
}

Game.prototype.availablePositions = function(board){
  var board = board;
  var availablePositions = [];
  for (position in board.positions){
    console.log(position)
    if(board.positions[position].marker == blank){availablePositions.push(position)}
  };
  return availablePositions;

}

module.exports = Game;