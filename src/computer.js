var x = " X ";
var o  = " O ";
var blank = "[ ]";

function Computer (){
  this.selection = null;
}

Computer.prototype.findAvailable = function(board, positionsToCheck){
  var board = board;
  var positionsToCheck = positionsToCheck;
  var availablePositions = [];
  positionsToCheck.forEach(function(position){
    if(board.positions[position].marker == blank){availablePositions.push(position)}
  })
  return availablePositions;
}



Computer.prototype.neighborDirectionData = function(board, playerMarker){
  var checkDirection = function(position, direction){
    var directionCounts = {};
    directionCounts[direction] = {same : 0, blank : 0};
    var homePosition = position;
    var checkNeighbor = function(pstn, direction){
      if(board.positions[pstn].neighbors[direction]){
        var neighborPosition = board.positions[pstn].neighbors[direction];
        if(board.positions[neighborPosition].marker == playerMarker){
          directionCounts[direction].same++;
        }
        if(board.positions[neighborPosition].marker == blank){
          directionCounts[direction].blank++;
        }
        checkNeighbor(neighborPosition, direction)
      }
    }
    checkNeighbor(homePosition, direction);
    return (directionCounts)
  }
  var data = {};
  for (position in board.positions){
    if(board.positions[position].marker == blank){
      data[position] = {};
      for (direction in board.positions[position].neighbors){
        data[position][direction] = checkDirection(position, direction)[direction]
      }
    }
  }
  return data;
}

Computer.prototype.computerWinMoves = function(board){
  var result = [];
  var availablePositions = this.neighborDirectionData(board, x);
  for (position in availablePositions){
    var pstn = availablePositions[position]
    if(pstn){
      if(pstn.left.same + pstn.right.same == 2){
        result.push(position)
      }
      if(pstn.up.same + pstn.down.same == 2){
        result.push(position)
      }
      if(pstn.upLeft.same + pstn.downRight.same == 2){
        result.push(position)
      }
      if(pstn.upRight.same + pstn.downLeft.same == 2){
        result.push(position)
      }
    }
  }
  return result;
}

Computer.prototype.userWinMoves = function(board){
  var result = [];
  var availablePositions = this.neighborDirectionData(board, o);
  for (position in availablePositions){
    var pstn = availablePositions[position]
    if(pstn){
      if(pstn.left.same + pstn.right.same == 2){
        result.push(position)
      }
      if(pstn.up.same + pstn.down.same == 2){
        result.push(position)
      }
      if(pstn.upLeft.same + pstn.downRight.same == 2){
        result.push(position)
      }
      if(pstn.upRight.same + pstn.downLeft.same == 2){
        result.push(position)
      }
    }
  }
  return result;
}

Computer.prototype.computerForkMoves = function(board){
  var moves = this.availableTwoInRowMoves(board, x)
  var result = [];
  var movesCount = {};
  for (position in moves){
    movesCount[moves[position]] == undefined? movesCount[moves[position]] = 1  : movesCount[moves[position]]++;
  }
  for (position in movesCount){
    if(movesCount[position] > 1){result.push(position)} 
  }
  return result;
}

Computer.prototype.userForkMoves = function(board){
  var moves = this.availableTwoInRowMoves(board, o)
  var result = [];
  var movesCount = {};
  for (position in moves){
    movesCount[moves[position]] == undefined? movesCount[moves[position]] = 1  : movesCount[moves[position]]++;
  }
  for (position in movesCount){
    if(movesCount[position] > 1){result.push(position)} 
  }
  return result;
}

Computer.prototype.availableTwoInRowMoves = function(board, playerMarker){
  var result = [];
  var neighborsData = this. neighborDirectionData(board, playerMarker);
  for(position in neighborsData){
    var pstn = neighborsData[position];
    if(pstn.left.same + pstn.right.same == 1 && pstn.left.blank + pstn.right.blank == 1){
      result.push(position)
    }
    if(pstn.up.same + pstn.down.same == 1 && pstn.up.blank + pstn.down.blank == 1){
      result.push(position)
    }
    if(pstn.upLeft.same + pstn.downRight.same == 1 && pstn.upLeft.blank + pstn.downRight.blank == 1){
      result.push(position)
    }
  }
  return result;
}


Computer.prototype.availableCenter = function(board){
  var center = ['center'];

  return this.findAvailable(board, center);
}

Computer.prototype.availableCorners = function(board){
  var cornerPositions = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
  return this.findAvailable(board, cornerPositions);
}

Computer.prototype.availableSides = function(board){
  var sidePositions = ['topCenter', 'middleRight', 'bottomCenter', 'middleLeft'];
  return this.findAvailable(board, sidePositions);
}

Computer.prototype.move = function(board){
  // this.userWinMoves(board);
  // this.userForkMoves(board, playerMarker);
  // this.availableTwoInRowMoves(board);
  // this.availableCenter(board);
  // this.availableCorners(board);
  // this.availableSides(board);
}

module.exports = Computer;