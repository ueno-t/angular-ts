/// <reference path="app.ts"/>

function testgame() {
  var def = new GameDefinition(64);
  def.board[1][1].alive = true;
  def.board[1][2].alive = true;
  def.board[1][3].alive = true;
  var game = new Game(def);

// 初期状態
// 0:_____
// 1:_XXX_
// 2:_____

  game.reload();
  game.reload();
  game.reload();
  game.reload();
  game.reload();

// 5世代後状態
// 0:__X__
// 1:__X__
// 2:__X__

  assert(game.board[0][1].alive, false);
  assert(game.board[0][2].alive, true);
  assert(game.board[0][3].alive, false);
  assert(game.board[1][1].alive, false);
  assert(game.board[1][2].alive, true);
  assert(game.board[1][3].alive, false);
  assert(game.board[2][1].alive, false);
  assert(game.board[2][2].alive, true);
  assert(game.board[2][3].alive, false);
  assert(game.gene, 5);

  console.log(game);
}

function assert(actual: any, expected: any) {
  console.log('.');
  console.assert(actual === expected, '\nact: ' + actual + '\nexp: ' + expected);
}

testgame();
