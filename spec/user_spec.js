var User = require('../src/user');

describe('User', function () {

    describe('methods', function () {
      describe('userSelectPosition', function () {
        var user = new User();
        it('prompts user to select a position', function () {
          expect(user.prompt()).toEqual("User select pos");
        });

        // it('will not set marker to position of player choice if existing is not blank', function () {
        //   board.setMarker("topLeft", o);
        //   board.setMarker("topLeft", x);
        //   expect(board.positions.topLeft.marker).toEqual(' O ');
        // });
      });
    });

  });