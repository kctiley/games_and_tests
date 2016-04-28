 var Board = require('../src/Board');

  describe('Board', function () {
    describe('constructor', function () {
      var board = new Board();
      var blank = "[ ]";

      it('has specific slots with specific neighbors', function () {
        expect(board.slots.topLeft.neighbors.left).toEqual(undefined);
      });

      it('has specific slots with specific neighbors', function () {
        expect(board.slots.center.neighbors.left).toEqual(board.slots.middleLeft);
      });

      it('has specific slots with specific neighbors', function () {
        expect(board.slots.bottomRight.neighbors.up).toEqual(board.slots.middleRight);
      });

      it('has slots with initial markers that are blank if no slots are provided', function () {
        expect(board.slots.bottomRight.marker).toEqual(blank);
      });

      it('has slots with initial markers that are blank if no slots are provided', function () {
        expect(board.slots.bottomLeft.marker).toEqual(blank);
      });
      

    });

    describe('methods', function () {
      describe('setMarker', function () {
        
        it('sets marker to position of player choice if existing is blank', function () {
          var board = new Board();
          board.setMarker("center", " X ");
          expect(board.slots.center.marker).toEqual(' X ');
        });

      });
    });
  });