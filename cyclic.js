function moore(t, r, states, x, y) {
  let sum = 0;
  for (let i = -r; i < r + 1; i ++) {
    for (let j = -r; j < r + 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      let state = grid[x][y];
      if (grid[col][row] == (state + 1) % states) {
        sum += 1;
      }
    }
  }
  if (sum >= t) {
    return (grid[x][y] + 1) % states;
  }
  return grid[x][y];
}

function vn(t, r, states, x, y) {
  let k = r;
  let sum = 0;
  for (let i = 0; i < r + 1; i++) {
    for (let j = -r + i; j < r - i + 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      let state = grid[x][y];
      if (grid[col][row] == (state + 1) % states) {
        sum += 1;
      }
    }
  }
  for (let i = -1; i > -r - 1; i--) {
    for (let j = -r - i; j < r + i + 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      let state = grid[x][y];
      if (grid[col][row] == (state + 1) % states) {
        sum += 1;
      }
    }
  }
  if (sum >= t) {
    return (grid[x][y] + 1) % states;
  }
  return grid[x][y];
}

function other(t, x, y) {
  let state = grid[x][y];
  let tl = grid[(x - 1 + cols) % cols][(y - 1 + rows) % rows];
  let tr = grid[(x + 1 + cols) % cols][(y - 1 + rows) % rows];
  let bl = grid[(x - 1 + cols) % cols][(y + 1 + rows) % rows];
  let br = grid[(x + 1 + cols) % cols][(y + 1 + rows) % rows];
  let b = grid[(x + cols) % cols][(y + 1 + rows) % rows];
  let tt = grid[(x + cols) % cols][(y - 1 + rows) % rows];
  let rr = grid[(x + 1 + cols) % cols][(y + rows) % rows];
  let ll = grid[(x - 1 + cols) % cols][(y + rows) % rows];
  let sum = 0;
  if (tl == (state + 1)%num_states && neighborhood[0][0] == 1) {
    sum += 1;
  }
  if (tr == (state + 1)%num_states && neighborhood[0][2] == 1) {
    sum += 1;
  }
  if (bl == (state + 1)%num_states && neighborhood[2][0] == 1) {
    sum += 1;
  }
  if (br == (state + 1)%num_states && neighborhood[2][2] == 1) {
    sum += 1;
  }
  if (b == (state + 1)%num_states && neighborhood[2][1] == 1) {
    sum += 1;
  }
  if (tt == (state + 1)%num_states && neighborhood[0][1] == 1) {
    sum += 1;
  }
  if (rr == (state + 1)%num_states && neighborhood[1][2] == 1) {
    sum += 1;
  }
  if (ll == (state + 1)%num_states && neighborhood[1][0] == 1) {
    sum += 1;
  }
  if (sum >= t) {
    return (state + 1) % num_states
  }
  return state;
}
