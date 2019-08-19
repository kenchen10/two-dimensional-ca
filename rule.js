// Essentially the elementary CA in 2 dimensions.

// NOTES: Interesting patters: 1010001110101001 sierpinski, 1001100101110110,
// 0100100010100001, 1100010001001001

function initializeArrayr8(cols, rows) {
  //creates an initial 2D array of 1 or 0 values

  let grid = make2DArray(cols, rows);
  let x = int(cols/2);
  let y = int(rows/2)

  if (square == false) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (randOn) {
          grid[i][j] = int(random(2));
        } else {
          grid[i][j] = 0;
        }
      }
    }
    if (!randOn) {
      grid[x][y] = 1;
    }
  }

  if (square == true) {
    grid = make2DArray(rows, rows);
    x = int(rows); //int(cols/2);
    y = int(rows);
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (randOn) {
          grid[i][j] = int(random(2));
        } else {
          grid[i][j] = 0;
        }
      }
    }
    if (!randOn) {
      grid[int(x/2)][int(y/2)] = 1;
    }
  }
  return grid;

}

function showArrayr8(grid) {
  // shows grid of cells

  // TODO: list of number from 0 - 2^n, where n is the number of neighbors. When
  // we look at a cell, we keep the neighbors as a number, so for example, 0110
  // would be equal to 6, because 2^3 * 0 + 2^2 * 1 + 2^1 * 1 + 2^0 * 0 = 6.
  // We then find the value of this index in the list of 0-2^n, which will be a
  // 0 or 1 value. Will save a bunch of if statements.

  // Example: Let's say the rule is [0, 1, 1, 1] for a 2-neighbor system. We arrive
  // at a cell, with the following neighbors: [0, 1]. This would correspond to the
  // value 2^0 * 0 + 2^1 * 1  = 2. Therefore, we look at position 2 of the rule array
  // to get 1. So, the current cell becomes 1.
  if (square == false) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 0) {
          fill(255);
          noStroke();
          rect(x, y, resolution, resolution);
        } else if (grid[i][j] == 1) {
          fill(0);
          noStroke();
          rect(x, y, resolution, resolution);
        }
      }
  }
} else {
  for (let i = int(rows/2); i < int(rows) + int(rows/2); i++) {
    for (let j = 0; j < int(rows); j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i - int(rows/2)][j] == 0) {
        fill(255);
        noStroke();
        rect(x, y, resolution, resolution);
      } else if (grid[i - int(rows/2)][j] == 1) {
        fill(0);
        noStroke();
        rect(x, y, resolution, resolution);
      }
    }
  }
}

  if (!hide && onPatterns) {
    // Draw the configurations that create an alive cell.
    // let neighborSize = int(Math.log(rule.length)/Math.log(2));
    // let current = 0;
    // let current2 = 0;
    // for (let i = 0; i < rule.length; i++) {
    //   let binaryCode = (i >>> 0).toString(2);
    //   while (binaryCode.length < neighborSize) {
    //     binaryCode = '0' + binaryCode;
    //   }
      // let matrix = [[0,0,0],
      //               [0,0,0],
      //               [0,0,0]];
      // let codeCount = 0;
      // //binaryCode = reverse(binaryCode.split(""));
      // if (rule[i] == 1) {
      //   for (let k = 0; k < 3; k++) {
      //     for (let j = 0; j < 3; j++) {
      //       if (neighborhood[k][j] == 1) {
      //         if (int(binaryCode[codeCount]) == 1) {
      //           matrix[k][j] = 1;
      //         }
      //         codeCount += 1;
      //       }
      //     }
      //   }
      // }
      //
      // print(binaryCode, matrix);


  //     if (rule[i] == 1) {
  //       let four = 0;
  //       let strokeColor = 0;
  //       if (rule[0] == 1 && rule[rule.length - 1] == 1) {
  //         strokeColor = 255;
  //       }
  //       noFill();
  //       stroke(strokeColor);
  //       rect(width/95 + width/9+width/120 + four * resolution * 1 + current * resolution * 1 * 3 + current*resolution - width/1500, height/80, resolution*3.1, resolution*3.1);
  //       for (let k = 0; k < neighborhood.length; k++) {
  //         for (let j = 0; j < neighborhood[0].length; j++) {
  //           if (neighborhood[k][j] == 1) {
  //             if (int(binaryCode[neighborSize - 1 - four]) == 1) {
  //               fill(200, 230, 201);
  //               noStroke();
  //               rect(width/95 + width/9+width/120 + k * resolution * 1 + current * resolution * 1 * 3 + current*resolution, height/70 + j * resolution * 1, resolution*1, resolution*1);
  //             } else {
  //               fill(0);
  //               noStroke();
  //               rect(width/95 + width/9+width/120 + k * resolution * 1 + current * resolution * 1 * 3 + current*resolution, height/70 + j * resolution * 1, resolution*1, resolution*1);
  //             }
  //             four += 1;
  //           }
  //         }
  //       }
  //       current += 1;
  //     } else if (rule[i] == 0) {
  //       let four = 0;
  //       let strokeColor = 0;
  //       if (rule[0] == 1 && rule[rule.length - 1] == 1) {
  //         strokeColor = 255;
  //       }
  //       noFill();
  //       stroke(strokeColor);
  //       rect(width/95 + width/9+width/120 + four * resolution * 1 + current2* resolution * 1 * 3 + current2*resolution - width/1500, height/80 + resolution * 4, resolution*3.1, resolution*3.1);
  //       for (let k = 0; k < neighborhood.length; k++) {
  //         for (let j = 0; j < neighborhood[0].length; j++) {
  //           if (neighborhood[k][j] == 1) {
  //             if (int(binaryCode[neighborSize - 1 - four]) == 1) {
  //               fill(200, 230, 201);
  //               noStroke();
  //               rect(width/95 + width/9+width/120 + k * resolution * 1 + current2 * resolution * 1 * 3 + current2*resolution, height/70 + (j) * resolution * 1 + 4 * 1*resolution, resolution*1, resolution*1);
  //             } else {
  //               fill(0);
  //               noStroke();
  //               rect(width/95 + width/9+width/120 + k * resolution * 1 + current2 * resolution * 1 * 3 + current2*resolution, height/70 + (j) * resolution * 1 + 4 * 1*resolution, resolution*1, resolution*1);
  //             }
  //             four += 1;
  //           }
  //         }
  //       }
  //       current2 += 1;
  //     }
  //   }
  // }
  let size = 10;
  let ones_count = 0;
  let h = 0;
    for (let i = 0; i < ones_idx.length; i++) {
      for (let j = 0; j < ones_idx[i].length; j++) {
        if (width/95 + width/9+width/120 + 4 * size * (ones_count + 1) >= width) {
          ones_count = 0;
          h += 1;
        }
        drawBox(ones_idx[i][j], ones_count, h, 1);
        ones_count += 1;
      }
    }

    ones_count = 0;
    h += 1;

    for (let i = 0; i < zeros_idx.length; i++) {
      for (let j = 0; j < zeros_idx[i].length; j++) {
        if (width/95 + width/9+width/120 + 4 * size * (ones_count + 1) >= width) {
          ones_count = 0;
          h += 1;
        }
        drawBox(zeros_idx[i][j], ones_count, h, 0);
        ones_count += 1;
      }
    }
  }
}

function drawBox(idx, x, y, v) {
  let neighborSize = int(Math.log(rule.length)/Math.log(2));
  let binaryCode = (idx >>> 0).toString(2);
  while (binaryCode.length < neighborSize) {
    binaryCode = '0' + binaryCode;
  }
  binaryCode = reverse(binaryCode.split(""));
  let count = 0;
  // for (let i = 0; i < neighborhood.length; i++) {
  //   for (let j = 0; j < neighborhood.length; j++) {
  //     let val = binaryCode[count];
  //     fill(200, 230, 201);
  //     noStroke();
  //     rect(width/95 + width/9+width/120 + i * resolution * 1 + x * resolution * 1 * 3 + x*resolution, height/70 + (j) * resolution * 1 + 4 * 1*resolution, resolution*2, resolution*2);
  //   }
  // }
  let color = [0, 230, 201];
  let back_color = 0;
  if (rule[0] == 1) {
    back_color = 255;
  }
  if (v == 0) {
    color = [255, 82, 82];
  }
  let size = 10;
  for (let i = 0; i < neighborhood.length; i++) {
    for (let j = 0; j < neighborhood.length; j++) {
      let val = binaryCode[count];
      if (neighborhood[i][j] == 1) {
        if (val == 1) {
          fill(color[0], color[1], color[2]);
          noStroke();
          rect(width/95 + width/9+width/120 + size * i + 4 * size * x, height/70 + size * j + y * 4 * size, size, size);
        } else {
          fill(back_color);
          noStroke();
          rect(width/95 + width/9+width/120 +size * i + 4 * size * x, height/70 + size * j + y * 4 * size, size, size);
        }
        count += 1;
      } else {
        fill(back_color);
        noStroke();
        rect(width/95 + width/9+width/120 + size * i + 4 * size * x, height/70 + size * j + y * 4 * size, size, size);
      }
    }
  }

}

function computeNextr8(grid, next) {
  // Compute next based on grid
  let ii = cols;
  if (square == true) {
    ii = rows;
    for (let i = 0; i < int(ii); i++) {
      for (let j = 0; j < int(rows); j++) {
        // let state = grid[i][j];
        // Lookup next value based on rule.
        next[i][j] = countNeighborsr8(grid, i, j);
      }
    }
  }
  else {
    for (let i = 0; i < int(ii); i++) {
      for (let j = 0; j < int(rows); j++) {
        // let state = grid[i][j];
        // Lookup next value based on rule.
        next[i][j] = countNeighborsr8(grid, i, j);
      }
    }
  }
}

function countNeighborsr8(grid, x, y) {
  //counts number of neighbors
  // let ll = grid[x][(y-1+rows)%rows];
  // let l = grid[x][(y+1+rows)%rows];
  // let m = grid[(x - 1 + cols) % cols][y];
  // let r = grid[(x + 1 + cols) % cols][[y]];
  //
  // if (ll == 0 && l == 0 && m == 0 && r == 0) {
  //   return rule[0];
  // } else if (ll == 0 && l == 0 && m == 0 && r == 1) {
  //   return rule[1];
  // } else if (ll == 0 && l == 0 && m == 1 && r == 0) {
  //   return rule[2];
  // } else if (ll == 0 && l == 0 && m == 1 && r == 1) {
  //   return rule[3];
  // } else if (ll == 0 && l == 1 && m == 0 && r == 0) {
  //   return rule[4];
  // } else if (ll == 0 && l == 1 && m == 0 && r == 1) {
  //   return rule[5];
  // } else if (ll == 0 && l == 1 && m == 1 && r == 0) {
  //   return rule[6];
  // } else if (ll == 0 && l == 1 && m == 1 && r == 1) {
  //   return rule[7];
  // } else if (ll == 1 && l == 0 && m == 0 && r == 0) {
  //   return rule[8];
  // } else if (ll == 1 && l == 0 && m == 0 && r == 1) {
  //   return rule[9];
  // } else if (ll == 1 && l == 0 && m == 1 && r == 0) {
  //   return rule[10];
  // } else if (ll == 1 && l == 0 && m == 1 && r == 1) {
  //   return rule[11];
  // } else if (ll == 1 && l == 1 && m == 0 && r == 0) {
  //   return rule[12];
  // } else if (ll == 1 && l == 1 && m == 0 && r == 1) {
  //   return rule[13];
  // } else if (ll == 1 && l == 1 && m == 1 && r == 0) {
  //   return rule[14];
  // } else if (ll == 1 && l == 1 && m == 1 && r == 1) {
  //   return rule[15];
  // }
  let jj = cols;
  let ii = rows;
  let cellNeighbors = [];
  if (square == true) {
    ii = rows;
    jj = rows;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + int(jj)) % int(jj);
        let row = (y + j + int(ii)) % int(ii);
        if (neighborhood[i + 1][j + 1] == 1){
          if (grid[col][row]==1) {
            cellNeighbors.push(1);
          } else {
            cellNeighbors.push(0);
          }
        }
        if (fillOn) {
          if (neighborhood[i + 1][j + 1] == 0 && grid[col][row] == 1) {
            return grid[x][y];
          }
        }
      }
    }
  }
  if (square == false) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + int(jj)) % int(jj);
        let row = (y + j + int(ii)) % int(ii);
        if (neighborhood[i + 1][j + 1] == 1){
          if (grid[col][row]==1) {
            cellNeighbors.push(1);
          } else {
            cellNeighbors.push(0);
          }
        }
        if (fillOn) {
          if (neighborhood[i + 1][j + 1] == 0 && grid[col][row] == 1) {
            return grid[x][y];
          }
        }
      }
    }
  }
  let matrix = [[0,0,0],
                [0,0,0],
                [0,0,0]];
  let codeCount = 0;
  //binaryCode = reverse(binaryCode.split(""));
    for (let k = 0; k < 3; k++) {
      for (let j = 0; j < 3; j++) {
        if (neighborhood[j][k] == 1) {
          if (cellNeighbors[codeCount] == 1) {
            matrix[j][k] = 1;
          }
          codeCount += 1;
        }
      }
    }
  let idx = 0;
  // let count = 0;
  // for (let i = 0; i < matrix.length; i++) {
  //   for (let j = 0; j < matrix.length; i++) {
  //     if (neighborhood[j][i] == 1) {
  //       idx += 2**count * matrix[j][i];
  //       count += 1;
  //     }
  //   }
  // }
  for (let i = 0; i < cellNeighbors.length; i++) {
    idx += 2**(i) * cellNeighbors[i];
  }
  // if (rule[idx] == 1) {
  //   print(cellNeighbors)
  //   print(matrix)
  // }
  if (rule[idx] == 2) {
    return grid[x][y];
  }
  return rule[idx];
}
