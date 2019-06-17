// LIAM WRIGLEY
// Depth First Search
// Recursive Backtracking
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

var cols, rows;
var w = 10;
var grid = [];

var current;
var stack = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width/w);
  rows = floor(height/w);
  // frameRate(5);

  for (var i = 0; i < rows; i++ ) {
    for (var j = 0; j < cols; j++ ) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++ ) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  var next = current.checkAround();
  if (next) {
    next.visited = true;
    removeWalls(current, next);
    stack.push(current);
    current = next;
  } else if (stack.length > 0) {
    stack.pop()
    current = stack[stack.length -1 ];
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > rows-1 || j > cols-1) {
    return -1;
  }
  return j + i * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkAround = function() {
    var neighbors = [];

    var top = grid[index(i, j+1)];
    var right = grid[index(i+1, j)];
    var bottom = grid[index(i, j-1)];
    var left = grid[index(i-1, j)];

    [top, right, bottom, left].forEach(n => {
      if (n && !n.visited) {
        neighbors.push(n);
      }
    })

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  this.highlight = function() {
    var x = this.j*w;
    var y = this.i*w;
    noStroke();
    fill(255,255,0,255);
    rect(x,y,w,w);
  }

  this.show = function() {
    var x = this.j*w;
    var y = this.i*w;
    stroke(255);

    //lines
    if (this.walls[0]) {
      //top
      line(x,y,x+w,y);
    }
    if (this.walls[1]) {
      //right
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2]) {
      //bottom
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3]) {
      //left
      line(x,y+w,x,y);
    }

    //change colour if visited
    if (this.visited) {
      noStroke();
      fill(255,0,0,100);
      rect(x,y,w,w);
    }
  }
}

function removeWalls(a, b) {
  var x = a.j - b.j;
  var y = a.i - b.i;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
