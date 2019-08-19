function initializeReact() {
  grid = [];
  next = [];
  for (var x = 0; x < cols; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < rows; y++) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }
  for (var i = int(cols/2.1); i < int(cols/2); i++) {
    for (var j = int(rows/2.1); j < int(rows/2); j++) {
      grid[i][j].b = 1;
    }
  }
}

function initializeReact2() {
  grid = [];
  next = [];
  for (var x = 0; x < cols; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < rows; y++) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }
}

function drawReact() {
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a +
        (dA * laplaceA(x, y)) -
        (a * b * b) +
        (feed * (1 - a));
      next[x][y].b = b +
        (dB * laplaceB(x, y)) +
        (a * b * b) -
        ((k + feed) * b);

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
        fill(c);
        rect(x * resolution, y * resolution, resolution, resolution);
    }
  }
  swap();
}

function drawReactPause() {
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      var c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      fill(c);
      rect(x * resolution, y * resolution, resolution, resolution);
    }
  }
}

function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[(x - 1 + cols) % cols][y].a * 0.2;
  sumA += grid[(x + 1 + cols) % cols][y].a * 0.2;
  sumA += grid[x][(y + 1 + rows) % rows].a * 0.2;
  sumA += grid[x][(y - 1 + rows) % rows].a * 0.2;
  sumA += grid[(x - 1 + cols) % cols][(y - 1 + rows) % rows].a * 0.05;
  sumA += grid[(x + 1 + cols) % cols][(y - 1 + rows) % rows].a * 0.05;
  sumA += grid[(x + 1 + cols) % cols][(y + 1 + rows) % rows].a * 0.05;
  sumA += grid[(x - 1 + cols) % cols][(y + 1 + rows) % rows].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[(x - 1 + cols) % cols][y].b * 0.2;
  sumB += grid[(x + 1 + cols) % cols][y].b * 0.2;
  sumB += grid[x][(y + 1 + rows) % rows].b * 0.2;
  sumB += grid[x][(y - 1 + rows) % rows].b * 0.2;
  sumB += grid[(x - 1 + cols) % cols][(y - 1 + rows) % rows].b * 0.05;
  sumB += grid[(x + 1 + cols) % cols][(y - 1 + rows) % rows].b * 0.05;
  sumB += grid[(x + 1 + cols) % cols][(y + 1 + rows) % rows].b * 0.05;
  sumB += grid[(x - 1 + cols) % cols][(y + 1 + rows) % rows].b * 0.05;
  return sumB;
}



function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}
