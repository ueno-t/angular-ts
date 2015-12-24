/// <reference path="app.ts"/>
var def: GameDefinition;
var game: Game;
var canvas:HTMLCanvasElement;
var context:any;
var cellsize:number = 8;
var buttonNext: any;
var buttonAuto: any;
var running: boolean;
var timer:any;

class Board {

  constructor() {
    canvas    = <HTMLCanvasElement>document.querySelector("canvas");
    context   = canvas.getContext("2d");

    def  = new GameDefinition(64);
    game = new Game(def);

    buttonNext = document.getElementById('buttonNext');
    buttonNext.addEventListener('click', next, false);
    buttonAuto = document.getElementById('buttonAuto');
    buttonAuto.addEventListener('click', auto, false);

    context.fillStyle = 'rgb(60, 60, 60)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    nestedLoop(def.size, (i:number ,j:number) => {drawCell(game.board[i][j])});
    canvas.addEventListener('click', canvasClick, false);
  }
}

function canvasClick(e:any) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    var row = Math.floor(x / cellsize);
    var col = Math.floor(y / cellsize);
    var c: Cell = game.board[col][row];
    c.alive = c.alive ? false : true;
    drawCell(c);
}
function drawCell(c: Cell) {
  context.fillStyle = c.alive ? 'rgb(156, 255,0)' : 'rgb(40,40,40)';
  context.fillRect(c.col*cellsize , c.row*cellsize, cellsize-1, cellsize-1);
}
function auto() {
  if (running) {
    clearInterval(timer);
    running = false;
  } else {
    next();
    timer = setInterval('next()', 200);
    running = true;
  }
}
function next() {
  game.reload();
  nestedLoop(def.size, (i:number ,j:number) => {drawCell(game.board[i][j])});
}
function exec() {
  var board = new Board();
}

exec();
