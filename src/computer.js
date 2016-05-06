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



Computer.prototype.neighborDirectionData = function(board){
  var same = x;
  var checkDirection = function(position, direction){
    var directionCounts = {};
    directionCounts[direction] = {same : 0, blank : 0};
    var homePosition = position;
    var checkNeighbor = function(pstn, direction){
      if(board.positions[pstn].neighbors[direction]){
        var neighborPosition = board.positions[pstn].neighbors[direction];
        if(board.positions[neighborPosition].marker == same){
          directionCounts[direction].same++;
        }
        if(board.positions[neighborPosition].marker == blank){
          directionCounts[direction].blank++;
        }
        checkNeighbor(neighborPosition, direction)
      }
    }
    checkNeighbor(homePosition, direction);
    console.log(directionCounts)
    return (directionCounts)
    
    
  }
  var data = {};
  for (position in board.positions){
    data[position] = {};
    console.log(position)
    if(board.positions[position].marker == blank){
      for (direction in board.positions[position].neighbors){
        // checkDirection(position, direction)
        data[position][direction] = checkDirection(position, direction)[direction]
      }
    }
  }
  console.log(data)
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
  this.neighborDirectionData;
  this.availableCenter(board);
  this.availableCorners(board);
  this.availableSides(board);
}

module.exports = Computer;