var x = " X ";
var o  = " O ";
var blank = "[ ]";
var User = require('../src/user.js');
var Computer = require('../src/computer');
var Board = require('../src/board');
var Game = require('../src/game');

var game = new(Game);
game.next();