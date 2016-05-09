var x = " X ";
var o  = " O ";
var blank = "[ ]";

function Game (){
  this.lastMove = {player : null, position : null};
  this.currentPlayer = o;
  this.status = "active";
  this.board = new Board();
}

Game.prototype.message = function(message){
  console.log(message)
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

Game.prototype.moveIsValid = function(player, position){
  return this.availablePositions(this.board).indexOf(position) == -1  || this.currentPlayer != player ? false : true;
}
Game.prototype.setMove = function(player, position){
  if(this.moveIsValid(player, position)){
    this.board.positions[position].marker = player;
    this.lastMove = {player : player, position : position};
  }
  else{
    this.message("Invalid move")
  }
  this.updateGame();
}

Game.prototype.showBoard = function(){
    for(position in this.board.positions){
      if(this.board.positions[position].marker !== blank){
        var element = document.getElementById(position);
        element.innerHTML = this.board.positions[position].marker;
      }
    }
}

Game.prototype.updateGame = function(){
  this.showBoard()
  if(this.checkForWinner()){
    this.message = this.checkForWinner();
    this.status = "inActive";
    console.log(this.message)
  }
  else if(this.availablePositions(this.board).length == 0){
    this.message = "Tie";
    this.status = "inActive";
  }
  else{
    this.nextPlayerGo();
  }
}

Game.prototype.nextPlayerGo = function(){
  this.lastMove.player == o ? this.currentPlayer = x : this.currentPlayer = o;
}


///////////////////////////////////////



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
  return this.findAvailable(board, ['center']);
}



Computer.prototype.oppositeCorner = function(board){
  var result = [];
  var availablePositions = [];
  for (position in board.positions){
    if(board.positions[position].marker == blank){
      availablePositions.push(position);
    }
  }
  if(availablePositions.length == 7 && board.positions.center.marker == o){
    if(board.positions.topLeft.marker == x){ result.push('bottomRight')}
    if(board.positions.topRight.marker == x){ result.push('bottomLeft')}
    if(board.positions.bottomRight.marker == x){ result.push('topLeft')}
    if(board.positions.bottomLeft.marker == x){ result.push('topRight')}
  }

  return result;
}



Computer.prototype.availableCorners = function(board){
  var cornerPositions = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
  return this.findAvailable(board, cornerPositions);
}

Computer.prototype.availableSides = function(board){
  var sidePositions = ['topCenter', 'middleRight', 'bottomCenter', 'middleLeft'];
  return this.findAvailable(board, sidePositions);
}

Computer.prototype.doesNotForceFork = function(filterPositions, board){
  var computer1 = this;
  var result = [];
  var board = board;
  filterPositions.forEach(function(filterPosition){
    var tempBoard = new Board(board.positions);
    tempBoard.setMarker(filterPosition, x);
    var winMoves = computer1.computerWinMoves(tempBoard);
    var userForkMoves = computer1.userForkMoves(tempBoard);
    if(winMoves.length > 0){ 
      winMoves.forEach(function(winMovePosition){
        if(userForkMoves.indexOf(winMovePosition) == -1){
          result.push(filterPosition);
        }
      })
    }else{
      result.push(filterPosition);
    }

  })
  return result;
}

Computer.prototype.selectMove = function(board){
  console.log("in selectMove")
  var result;
  if(this.computerWinMoves(board).length > 0){
    result = this.computerWinMoves(board)[0];
  }
  else if(this.userWinMoves(board).length > 0){
    result = this.userWinMoves(board)[0];
  }
  else if(this.doesNotForceFork(this.availableTwoInRowMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.availableTwoInRowMoves(board), board)[0];
  }
  else if(this.doesNotForceFork(this.userForkMoves(board), board).length > 0){
    result = this.doesNotForceFork(this.userForkMoves(board), board)[0];
  }
  else if(this.availableCenter(board).length > 0){
    result = this.availableCenter(board)[0];
  }
  else if(this.doesNotForceFork(this.availableCorners(board), board).length > 0){
    result = this.doesNotForceFork(this.availableCorners(board), board)[0];
  }
  else if(this.doesNotForceFork(this.availableSides(board), board).length > 0){result = this.doesNotForceFork(this.availableSides(board), board)[0];
  }
  else {console.log("not coded")}
    console.log(result)
  return result;
}


// ////////////////////////////////////////

function Board(existingBoardPositions) {
  var blank = "[ ]";
// changing board creation
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
                                  down : "middleRight",
                                  downLeft : "center",
                                };
    this.positions.middleLeft.neighbors = {
                                  up : "topLeft", 
                                  upRight : "topCenter",
                                  right : "center",
                                  downRight : "bottomCenter",
                                  down : "bottomLeft",
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
  if(existingBoardPositions){
    for (position in existingBoardPositions){
      if(position.marker != blank){
        this.positions[position].marker = existingBoardPositions[position].marker;
      }
    }
  }

}

Board.prototype.setMarker = function(position, playerMarker){
  this.positions[position].marker = playerMarker;
};


///////////////////////////////////////////////
var game = new Game();
var computerPlayer = new Computer();
setInterval(function(){ 
  if(game.status != "inActive"){
  game.setMove(x, computerPlayer.selectMove(game.board))};}, 1000);


