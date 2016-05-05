var x = " X ";
var o  = " O ";
var blank = "[ ]";

var Computer = require('../src/computer');
var Board = require('../src/board');

describe('Computer', function () {
  var computer;
  beforeEach(function(){
    computer = new Computer();
  })
    
  describe('methods', function () {
    describe('selects available side position', function () {
      it('determines available side moves', function () {
        var board = new Board();
        computer.move(board);
        expect(computer.availableSideMoves(board)).toEqual(['topCenter', 'middleRight', 'bottomCenter', 'middleLeft']);
      });

      it('determines available side moves', function () {
        var board = new Board();
        computer.move(board);
        board.setMarker('topCenter', x);
        expect(computer.availableSideMoves(board)).toEqual(['middleRight', 'bottomCenter', 'middleLeft']);
      });


    });
  });

});