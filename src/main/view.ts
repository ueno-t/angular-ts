/// <reference path="app.ts"/>
var def       : GameDefinition;
var game      : Game;
var boardsize : number = 64;
var cellsize  : number = 12;

var canvas    : HTMLCanvasElement;
var context   : CanvasRenderingContext2D;
var buttonNext: HTMLButtonElement;
var buttonAuto: HTMLButtonElement;
var counter   : HTMLParagraphElement;

var running   : boolean;
var timer     : number;

class Board {

  constructor() {
    def  = new GameDefinition(boardsize);
    game = new Game(def);

    // ボタン
    buttonNext = <HTMLButtonElement>document.getElementById('buttonNext');
    buttonNext.addEventListener('click', next, false);
    buttonAuto = <HTMLButtonElement>document.getElementById('buttonAuto');
    buttonAuto.addEventListener('click', auto, false);

    // カウンタ
    counter = <HTMLParagraphElement> document.createElement("p");
    counter.textContent = "gene: " + game.gene.toString();
    document.body.appendChild(counter);

    // キャンバス
    canvas    = <HTMLCanvasElement>document.createElement("canvas");
    context   = canvas.getContext("2d");
    canvas.width  = boardsize * cellsize;
    canvas.height = boardsize * cellsize;
    canvas.addEventListener('click', canvasClick, false);
    document.body.appendChild(canvas);

    // 描画
    context.fillStyle = 'rgb(60, 60, 60)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    nestedLoop(def.size, (i:number ,j:number) => {drawCell(game.board[i][j])});
  }
}

function drawCell(c: Cell) {
  context.fillStyle = c.alive ? 'rgb(156, 255,0)' : 'rgb(40,40,40)';
  context.fillRect(c.col*cellsize , c.row*cellsize, cellsize-1, cellsize-1);
}
function canvasClick(e:any) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var row = Math.floor(x / cellsize);
  var col = Math.floor(y / cellsize);
  var c   = game.board[col][row];
  c.alive = c.alive ? false : true;
  drawCell(c);
}
function next() {
  game.reload();
  nestedLoop(def.size, (i:number ,j:number) => {drawCell(game.board[i][j])});
  counter.textContent = "gene: " + game.gene.toString();
}
function auto() {
  if (running) {
    clearInterval(timer);
    buttonAuto.value = "start"
    running = false;
  } else {
    next();
    timer = setInterval('next()', 200);
    buttonAuto.value = "stop"
    running = true;
  }
}
function exec() {
  var board = new Board();
}

exec();
