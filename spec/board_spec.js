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

    // describe('methods', function () {
    //   describe('newBoard', function () {
    //     var board = new Board();
    //     var blank = "[ ]";
    //     board.loadMarkers();


    //     it('returns a string with correct pluralization for multiple doors and multiple windows', function () {
    //       var house = new House(3,5);
    //       expect(house.toString()).toEqual('The house has 3 doors and 5 windows');
    //     });

    //     it('returns a string with correct pluralization for 1 door and multiple windows', function () {
    //       var house = new House(1,65);
    //       expect(house.toString()).toEqual('The house has 1 door and 65 windows');
    //     });

    //     it('returns a string with correct pluralization for 1 door and 1 window', function () {
    //       var house = new House(1,1);
    //       expect(house.toString()).toEqual('The house has 1 door and 1 window');
    //     });

    //     it('returns a string with correct pluralization for 0 doors and 0 windows', function () {
    //       var house = new House(0,0);
    //       expect(house.toString()).toEqual('The house has 0 doors and 0 windows');
    //     });
      // });
    // });
  });