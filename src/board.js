function Board(existingBoardSlots) {
  var blank = "[ ]";

  if(!existingBoardSlots){
    this.slots = {
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
    this.slots.topLeft.neighbors = {right : this.slots.topCenter, 
                                    down : this.slots.middleLeft, 
                                    downRight : this.slots.center 
                                  };
    this.slots.topCenter.neighbors = {
                                  left : this.slots.topLeft, 
                                  right : this.slots.topRight, 
                                  downRight : this.slots.middleRight,
                                  down : this.slots.center,
                                  downLeft : this.slots.middleLeft
                                };
    this.slots.topRight.neighbors = {
                                  left : this.slots.topCenter, 
                                  down : this.slots.middleLeft,
                                  downLeft : this.slots.center
                                };
    this.slots.middleLeft.neighbors = {
                                  up : this.slots.topLeft, 
                                  upRight : this.slots.topCenter,
                                  right : this.slots.center,
                                };
    this.slots.center.neighbors = {
                                  left : this.slots.middleLeft,
                                  upLeft : this.slots.topLeft,
                                  up : this.slots.topCenter, 
                                  upRight : this.slots.topRight,
                                  right : this.slots.middleRight,
                                  downRight : this.slots.bottomRight,
                                  down : this.slots.bottomCenter,
                                  downLeft : this.slots.bottomLeft,
                                }; 
    this.slots.middleRight.neighbors = {
                                  left : this.slots.center,
                                  upLeft : this.slots.topCenter,
                                  up : this.slots.topRight, 
                                  down : this.slots.bottomRight,
                                  downLeft : this.slots.bottomCenter,
                                };
    this.slots.bottomLeft.neighbors = {
                                  up : this.slots.middleLeft, 
                                  upRight : this.slots.center,
                                  right : this.slots.bottomCenter,
                                };
    this.slots.bottomCenter.neighbors = {
                                  left : this.slots.bottomLeft, 
                                  upLeft : this.slots.middleLeft,
                                  up : this.slots.center,
                                  upRight : this.slots.middleRight,
                                  right : this.slots.bottomRight,
                                };
    this.slots.bottomRight.neighbors = {
                                  left : this.slots.bottomCenter, 
                                  upLeft : this.slots.center,
                                  up : this.slots.middleRight,
                                };             


  }
  else{
    this.slots = currentGameSlots;
  }

  

}

  module.exports = Board;