var Game = require('../src/game');
var Board = require('../src/board');
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
      
      it('should have all board positions listed as available when a new game is created with no existing positions as arguments', function () {
        var game = new Game();
        var board = new Board();
        var allPositions = [];
        for (position in board.positions){
          allPositions.push(position);
        }
        expect(game.availablePositions(board)).toEqual(allPositions);
      });

      it('should have all board positions listed as available when a new game is created with no existing positions as arguments', function () {
        var game = new Game();
        var board = new Board();
        var allPositions = [];
        for (position in board.positions){
          allPositions.push(position);
        }
        expect(game.availablePositions(board)).toEqual(allPositions);
      });

      it('should check for a win for x', function () {
        var game = new Game();
        var board = new Board();
        var allPositions = [];
        board.positions.topLeft.marker = x;
        board.positions.center.marker = x;
        board.positions.bottomRight.marker = x;

        expect(game.checkForWin(board)).toEqual(x);
      });

      it('should check for a win for o', function () {
        var game = new Game();
        var board = new Board();
        var allPositions = [];
        board.positions.topCenter.marker = o;
        board.positions.center.marker = o;
        board.positions.bottomCenter.marker = o;

        expect(game.checkForWin(board)).toEqual(o);
      });
      

    });

  });