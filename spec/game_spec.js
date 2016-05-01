var Game = require('../src/game');
var Board = require('../src/board');
var User = require('../src/user');
// var Computer = require('../src/computer');
var x = " X ";
var o  = " O ";
var blank = "[ ]";

  describe('Game', function () {
    
    describe('constructor', function () {
      var game; 
      beforeEach(function(){
        game = new Game();
      })
      
      it('should initially have null for last move data', function () {
        expect(game.lastMove).toEqual({player : null, position : null});
      });

      it('should have initial status of next', function () {
        expect(game.status).toEqual("next");
      });

    });

    describe('methods', function () {

      var game; 
      var board; 
      beforeEach(function(){
        game = new Game();
        board = new Board();
      })
      
      it('should have all board positions listed as available when a new game is created with no existing positions as arguments', function () {
        var allPositions = [];
        for (position in board.positions){
          allPositions.push(position);
        }
        expect(game.availablePositions(board)).toEqual(allPositions);
      });

      it('should have all board positions listed as available when a new game is created with no existing positions as arguments', function () {
        var allPositions = [];
        for (position in board.positions){
          allPositions.push(position);
        }
        expect(game.availablePositions(board)).toEqual(allPositions);
      });

      it('should check for a win for x', function () {
        var allPositions = [];
        board.positions.topLeft.marker = x;
        board.positions.center.marker = x;
        board.positions.bottomRight.marker = x;

        expect(game.checkForWin(board)).toEqual(x);
      });

      it('should check for a win for o', function () {
        var allPositions = [];
        board.positions.topCenter.marker = o;
        board.positions.center.marker = o;
        board.positions.bottomCenter.marker = o;

        expect(game.checkForWin(board)).toEqual(o);
      });

      it('should check for a win for a tie', function () {
        var allPositions = [];
        board.positions.topCenter.marker = x;
        board.positions.center.marker = x;
        board.positions.bottomCenter.marker = o;
        board.positions.topLeft.marker = o;
        board.positions.topRight.marker = x;
        board.positions.middleLeft.marker = x;
        board.positions.middleRight.marker = o;
        board.positions.bottomRight.marker = x;
        board.positions.bottomLeft.marker = o;

        expect(game.checkForTie(board)).toEqual(true);
      });

      it('should set last move data', function () {
        var allPositions = [];
        game.setLastMove(x, "center")

        expect(game.lastMove).toEqual({player : x, position : "center"});
      });

      it('should determine next player to select a position', function () {
        game.setLastMove(x, "center");
        spyOn(game, 'promptUser');
        game.next(board);

        expect(game.promptUser).toHaveBeenCalled();
      })
      
     it('should determine next player to select a position', function () {
        game.setLastMove(o, "bottomCenter");
        spyOn(game, 'promptComputer');
        game.next(board);

        expect(game.promptComputer).toHaveBeenCalled();
      })

     it('should determine if move is valid', function () {
        game.setLastMove(o, "bottomCenter", board);

        expect(game.moveIsValid('bottomCenter', board)).toEqual(false);
      })

     it('should determine if move is valid', function () {
        game.setLastMove(o, "bottomCenter", board);

        expect(game.moveIsValid('center', board)).toEqual(true);
      })


    });

  });