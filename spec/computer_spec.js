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
    describe('finds available side moves', function () {
      // it('all sides are available initially', function () {
      //   var board = new Board();
      //   computer.move(board);
      //   expect(computer.availableSides(board)).toEqual(['topCenter', 'middleRight', 'bottomCenter', 'middleLeft']);
      // });

    //   it('determines only available side moves', function () {
    //     var board = new Board();
    //     computer.move(board);
    //     board.setMarker('topCenter', x);
    //     expect(computer.availableSides(board)).toEqual(['middleRight', 'bottomCenter', 'middleLeft']);
    //   });

    // });

    // describe('finds available corner move', function () {
    //   it('all corners are available initially', function () {
    //     var board = new Board();
    //     computer.move(board);
    //     expect(computer.availableCorners(board)).toEqual(['topLeft', 'topRight', 'bottomRight', 'bottomLeft']);
    //   });

    //   it('finds only available corner moves', function () {
    //     var board = new Board();
    //     computer.move(board);
    //     board.setMarker('topLeft', x);
    //     expect(computer.availableCorners(board)).toEqual(['topRight', 'bottomRight', 'bottomLeft']);
    //   });

    // });

    // describe('finds available center move', function () {
    //   it('center available initially', function () {
    //     var board = new Board();
    //     computer.move(board);
    //     expect(computer.availableCenter(board)).toEqual(['center']);
    //   });

    //   it('finds only available center move', function () {
    //     var board = new Board();
    //     computer.move(board);
    //     board.setMarker('center', x);
    //     expect(computer.availableCenter(board)).toEqual([]);
    //   });

    });

    describe('finds available moves that make two in a row', function () {
      // it('initially has no moves that make two in a row', function () {
      //   var board = new Board();
      //   computer.move(board);
      //   expect(computer.availableMovesMakeTwoInRow(board)).toEqual([]);
      // });

      it('move that make two in a row', function () {
        var board = new Board();
        board.setMarker('center', x);
        board.setMarker('middleLeft', x);
        computer.move(board);
        expect(computer.neighborDirectionData(board)).toContain(['middleRight']);
      });
      
    });

  });

});