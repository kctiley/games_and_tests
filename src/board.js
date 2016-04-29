function Board(existingBoardpositions) {
  var blank = "[ ]";

  if(!existingBoardpositions){
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
                                  down : "middleLeft",
                                  downLeft : "center"
                                };
    this.positions.middleLeft.neighbors = {
                                  up : "topLeft", 
                                  upRight : "topCenter",
                                  right : "center",
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


  }
  else{
    this.positions = currentGamepositions;
  }

}

Board.prototype.setMarker = function(position, marker){
  var position = this.positions[position];
  var blank = "[ ]";
  if(position.marker == blank){
    position.marker = marker;
  }

};





  module.exports = Board;