"use strict";

class GameDefinition {
  size : number;
  id   : string;
  board: Cell[][];

  constructor(size: number) {
    this.size = size;
    this.board = new Array(this.size);
    for (var i = 0; i < this.size; i++) {
      this.board[i] = new Array(this.size);
      for (var j = 0; j < this.size; j++) this.board[i][j] = new Cell(i, j, false);
    }
  }

}

class Game {
  size : number;
  gene : number;
  board: Cell[][];

  constructor(def: GameDefinition) {
    this.size  = def.size;
    this.gene  = 0;
    this.board = this.deepCopy(def);
    nestedLoop(this.size, (i:number ,j:number) => {this.neighbors(i, j)}); // 初回近傍設定<
  }

  deepCopy(def: GameDefinition) {
    var copied: Cell[][];
    copied = new Array(this.size);
    for (var i = 0; i < this.size; i++) copied[i] = new Array(this.size);
    nestedLoop(this.size, (i:number, j:number) => {copied[i][j] = new Cell(i, j, def.board[i][j].alive)});
    return copied;
  }
  neighbors(i: number, j: number) {
    var neighbors: number = 0, row: number, col: number;
    for (var row = i-1; row <= i+1; row++) {
      for (var col = j-1; col <= j+1; col++) {
        if ((0<=row&&0<=col)&&!(row==i&&col==j)&&(row<this.size&&col<this.size)) {// 上端左端内, 自分自身以外, 下端右端内
          if (this.board[row][col].alive) neighbors++;
        }
      }
    }
    this.board[i][j].neighbors = neighbors;
    this.board[i][j].next();
  }
  reload() {
    console.time('reload');
    nestedLoop(this.size, (i:number ,j:number) => {this.neighbors(i, j)}); // 近傍計算
    nestedLoop(this.size, (i:number, j:number) => {this.board[i][j].commit();}); // コミット
    this.gene++;
    console.timeEnd('reload');
  }
}

class Cell {
  row      : number;
  col      : number;
  alive    : boolean;
  reserve  : boolean;
  neighbors: number;

  constructor(row: number, col:number, alive: boolean) {
    this.row = row;
    this.col = col;
    this.alive = alive;
  }

  next() {
    this.reserve = this.alive
    ? (this.neighbors === 2 || this.neighbors === 3) // 生存
    : (this.neighbors === 3);                        // 誕生
  }
  commit() {
    this.alive = this.reserve;
  }
}

function nestedLoop(size: number, func: Function) {
  var i: number, j: number;
  for (i = 0; i < size; i++) for (j = 0 ; j < size; j++) func(i, j);
}
