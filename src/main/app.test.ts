/// <reference path="app.ts"/>

function testgame() {
  var def = new GameDefinition(1024);
  def.board[1][1].alive = true;
  def.board[1][2].alive = true;
  def.board[1][3].alive = true;
  var game = new Game(def);

  game.reload();
  game.reload();
  game.reload();
  game.reload();
  game.reload();

  assert(game.board[0][1].alive, false);
  assert(game.board[0][2].alive, true);
  assert(game.board[0][3].alive, false);
  assert(game.board[1][1].alive, false);
  assert(game.board[1][2].alive, true);
  assert(game.board[1][3].alive, false);
  assert(game.board[2][1].alive, false);
  assert(game.board[2][2].alive, true);
  assert(game.board[2][3].alive, false);
}

function assert(actual, expected) {
  console.log('.');
  console.assert(actual === expected, '\nact: ' + actual + '\nexp: ' + expected);
}

testgame();
