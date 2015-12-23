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
      for (var j = 0; j < this.size; j++) this.board[i][j] = new Cell(false);
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
  }

  nestedLoop(size: number, func: Function) {
    var i: number, j: number;
    for (i = 0; i < size; i++) for (j = 0 ; j < size; j++) func(i, j);
  }
  deepCopy(def: GameDefinition) {
    var copied: Cell[][];
    copied = new Array(this.size);
    for (var i = 0; i < this.size; i++) copied[i] = new Array(this.size);
    this.nestedLoop(this.size, (i, j) => {copied[i][j] = new Cell(def.board[i][j].alive)});
    return copied;
  }
  neighbors(i: number, j: number) {
    var neighbors: Cell[] = new Array();
    for (var row = i-1; row <= i+1; row++) {
      for (var col = j-1; col <= j+1; col++) {
        if (this.board[i][j].survive === 0) continue; // 近傍がなければ再計算しない
        if ((0<=row&&0<=col)&&!(row==i&&col==j)&&(row<this.size&&col<this.size)) {
          neighbors.push(this.board[row][col]);
        }
      }
    }
    this.board[i][j].neighbors = neighbors;
  }
  reload() {
    this.nestedLoop(this.size, (i ,j) => {this.neighbors(i, j)}); // 近傍設定
    this.nestedLoop(this.size, (i, j) => {this.board[i][j].next();}); // 次世代計算
    this.nestedLoop(this.size, (i, j) => {this.board[i][j].commit();}); // コミット
    this.gene++;
  }
}

class Cell {
  alive    : boolean;
  reserve  : boolean;
  neighbors: Cell[];
  survive  : number;

  constructor(alive: boolean) {
    this.alive = alive;
  }

  next() {
    this.survive = this.neighbors.filter((n) => {return n.alive}).length;
    this.reserve = this.alive ? this.isAlive(this.survive) : this.isBirth(this.survive);
  }
  isBirth(survive:number): boolean {
    return (!this.alive && survive === 3);
  }
  isAlive(survive:number): boolean {
    return (this.alive && (survive === 2 || survive === 3));
  }
  commit() {
    this.alive = this.reserve;
  }
}

