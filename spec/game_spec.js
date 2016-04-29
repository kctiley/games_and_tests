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
      
      it('should have all board positions listed', function () {
        var game = new Game();
        var board = new Board();
        var blankPositions = [];
        for (position in board.positions){
          blankPositions.push(position);
        }
        expect(game.availablePositions(board)).toEqual(blankPositions);
      });

      // it('should have initial status of next', function () {
      //   expect(game.status).toEqual("next");
      // });

    });

  });