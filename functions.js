var sign = -.095;
var xval, yval;

let rpent = [[0,1,1],[1,1,0],[0,1,0]];
let new_glider = [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[0,1,0,0,1],[0,0,0,0,0]];

function make2DArray(cols, rows) {
  //creates a 2D array
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function initializeArray(cols, rows, xval, yval) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (randOn == false && i < cols/1.5 && j > rows/4 && i > cols/4 && j < rows/1.5) {
        grid[i][j] = int(random(2));
      } else if (randOn) {
        grid[i][j] = int(random(2));
      }
    }
  }
  return grid;
}

function initializeArray2(cols, rows) {
  //creates an initial 2D array of 1 or 0 values
  let grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = false;
    }
  }
  return grid;
}

function showArray(grid) {
  //shows grid of cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
    if (grid[i][j] == 1) {
      fill(0);
      rect(x, y, resolution, resolution);
    } else if (history[i][j] == true && grid[i][j] == 0) {
      fill(232, 245, 233);
        rect(x, y, resolution, resolution);
      }
      if (generation > 500) {
        let str = "";
        let strArr = [];
        for (let k = 0; k < 4; k++) {
          for (let l = 0; l < 4; l++) {
            let first = (i+k+2+cols)%cols;
            let second = (j+l+2+rows)%rows;
            strArr.push(grid[first][second]);
            str += String(grid[first][second]);
          }
        }
        let s = 0;
        for (let k = 0; k < strArr.length; k++) {
          s += strArr[k];
        }
        if (s >= 3 && s <= 8) {
          data.push(str);
        //saveStrings("patterns.txt", data);
        }
      }
    }
  }
  if (identify && generation > 500) {
    if (!checked) {
      dict = computeData(data);
      checked = true;
      let keys = Object.keys(dict);
      keyValues = [];
      for (var key in dict) {
        keyValues.push([key, dict[key] ]);
      }
      keyValues.sort(function compare(kv1, kv2) {
        // This comparison function has 3 return cases:
        // - Negative number: kv1 should be placed BEFORE kv2
        // - Positive number: kv1 should be placed AFTER kv2
        // - Zero: they are equal, any order is ok between these 2 items
        return kv1[1] - kv2[1]
      })
      for (let i = 0; i < 10; i++) {
        a.push(keys[i]);
      }
    }
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        for (let k = 0; k < 30; k ++) {
          let x = i * resolution;
          let y = j * resolution;
          if (typeof keyValues[k][0] != 'undefined') {
            check16Str(x,y,i,j,keyValues[keyValues.length - 1 - k][0],167, 255, 235);
          }
        }
      }
    }
  }
}

function computeData(arr) {
  arr = arr.sort();
  let counts = {};
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]] = (counts[arr[i]] || 0) + 1;
  }
  return counts;
}

function computeNext(grid, next, survive, born) {
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors
      let neighbors = countNeighbors(grid, i, j);
      if (state == 1 && survive.includes(neighbors)) {
        next[i][j] = 1;
      } else if (state == 0 && born.includes(neighbors)) {
        next[i][j] = 1;
      } else if (state == 1 && !survive.includes(neighbors)) {
        next[i][j] = 0;
        history[i][j] = true;
      } else {
        next[i][j] = 0;
      }
    }
  }
}

function countNeighbors(grid, x, y) {
  //counts number of neighbors
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (neighborhood[i + 1][j + 1] == 1){
        if (grid[col][row]==2) {
          sum += 1;
        } else {
          sum += grid[col][row];
        }
      }
    }
  }
  return sum;
}

function check9(x,y,i, j, arr,r,g,b) {
  if (grid[i][j]==arr[0][0]&&grid[(i+1+cols)%cols][j]==arr[0][1]&&grid[(i+2+cols)%cols][j]==arr[0][2]
      &&grid[i][(j+1+rows)%rows]==arr[1][0]&&grid[(i+1+cols)%cols][(j+1+rows)%rows]==arr[1][1]&&grid[(i+2+cols)%cols][(j+1+rows)%rows]==arr[1][2]
      &&grid[i][(j+2+rows)%rows]==arr[2][0]&&grid[(i+1+cols)%cols][(j+2+rows)%rows]==arr[2][1]&&grid[(i+2+cols)%cols][(j+2+rows)%rows]==arr[2][2]) {
        fill(r,g,b);
        if (arr[0][0]==1) {
          rect(x, y, resolution, resolution);
        } if (arr[0][1]==1) {
          rect(x+1*resolution, y, resolution, resolution);
        } if (arr[0][2]==1) {
          rect(x+2*resolution, y, resolution, resolution);
        } if (arr[1][0]==1) {
          rect(x, y+1*resolution, resolution, resolution);
        } if (arr[1][1]==1) {
          rect(x+resolution, y+1*resolution, resolution, resolution);
        } if (arr[1][2]==1) {
          rect(x+2*resolution, y+1*resolution, resolution, resolution);
        } if (arr[2][0]==1) {
          rect(x, y+2*resolution, resolution, resolution);
        } if (arr[2][1]==1) {
          rect(x+resolution, y+2*resolution, resolution, resolution);
        } if (arr[2][2]==1) {
          rect(x+2*resolution, y+2*resolution, resolution, resolution);
        }
        return true;
      }
  return false;
}

function check16(x,y,i, j, arr,r,g,b) {
  if (grid[i][j]==arr[0][0]&&grid[(i+1+cols)%cols][j]==arr[0][1]&&grid[(i+2+cols)%cols][j]==arr[0][2]&&grid[(i+3+cols)%cols][j]==arr[0][3]
      &&grid[i][(j+1+rows)%rows]==arr[1][0]&&grid[(i+1+cols)%cols][(j+1+rows)%rows]==arr[1][1]&&grid[(i+2+cols)%cols][(j+1+rows)%rows]==arr[1][2]&&grid[(i+3+cols)%cols][(j+1+rows)%rows]==arr[1][3]
      &&grid[i][(j+2+rows)%rows]==arr[2][0]&&grid[(i+1+cols)%cols][(j+2+rows)%rows]==arr[2][1]&&grid[(i+2+cols)%cols][(j+2+rows)%rows]==arr[2][2]&&grid[(i+3+cols)%cols][(j+2+rows)%rows]==arr[2][3]
      &&grid[i][(j+3+rows)%rows]==arr[3][0]&&grid[(i+1+cols)%cols][(j+3+rows)%rows]==arr[3][1]&&grid[(i+2+cols)%cols][(j+3+rows)%rows]==arr[3][2]&&grid[(i+3+cols)%cols][(j+3+rows)%rows]==arr[3][3]) {
        fill(r,g,b);
        if (arr[0][0]==1) {
          rect(x, y, resolution, resolution);
        } if (arr[0][1]==1) {
          rect(x+1*resolution, y, resolution, resolution);
        } if (arr[0][2]==1) {
          rect(x+2*resolution, y, resolution, resolution);
        } if (arr[0][3]==1) {
          rect(x+3*resolution, y, resolution, resolution);
        } if (arr[1][0]==1) {
          rect(x, y+1*resolution, resolution, resolution);
        } if (arr[1][1]==1) {
          rect(x+resolution, y+1*resolution, resolution, resolution);
        } if (arr[1][2]==1) {
          rect(x+2*resolution, y+1*resolution, resolution, resolution);
        } if (arr[1][3]==1) {
          rect(x+3*resolution, y+1*resolution, resolution, resolution);
        } if (arr[2][0]==1) {
          rect(x, y+2*resolution, resolution, resolution);
        } if (arr[2][1]==1) {
          rect(x+resolution, y+2*resolution, resolution, resolution);
        } if (arr[2][2]==1) {
          rect(x+2*resolution, y+2*resolution, resolution, resolution);
        } if (arr[2][3]==1) {
          rect(x+3*resolution, y+2*resolution, resolution, resolution);
        } if (arr[3][0]==1) {
          rect(x, y+3*resolution, resolution, resolution);
        } if (arr[3][1]==1) {
          rect(x+1*resolution, y+3*resolution, resolution, resolution);
        } if (arr[3][2]==1) {
          rect(x+2*resolution, y+3*resolution, resolution, resolution);
        } if (arr[3][3]==1) {
          rect(x+3*resolution, y+3*resolution, resolution, resolution);
        }
        return true;
      }
  return false;
}

function check16Str(x,y,i, j, str,r,g,b) {
  if (grid[i][j]==int(str.charAt(0))&&grid[(i+1+cols)%cols][j]==int(str.charAt(1))&&grid[(i+2+cols)%cols][j]==int(str.charAt(2))&&grid[(i+3+cols)%cols][j]==int(str.charAt(3))
      &&grid[i][(j+1+rows)%rows]==int(str.charAt(4))&&grid[(i+1+cols)%cols][(j+1+rows)%rows]==int(str.charAt(5))&&grid[(i+2+cols)%cols][(j+1+rows)%rows]==int(str.charAt(6))&&grid[(i+3+cols)%cols][(j+1+rows)%rows]==int(str.charAt(7))
      &&grid[i][(j+2+rows)%rows]==int(str.charAt(8))&&grid[(i+1+cols)%cols][(j+2+rows)%rows]==int(str.charAt(9))&&grid[(i+2+cols)%cols][(j+2+rows)%rows]==int(str.charAt(10))&&grid[(i+3+cols)%cols][(j+2+rows)%rows]==int(str.charAt(11))
      &&grid[i][(j+3+rows)%rows]==int(str.charAt(12))&&grid[(i+1+cols)%cols][(j+3+rows)%rows]==int(str.charAt(13))&&grid[(i+2+cols)%cols][(j+3+rows)%rows]==int(str.charAt(14))&&grid[(i+3+cols)%cols][(j+3+rows)%rows]==int(str.charAt(15))) {
        fill(r,g,b);
        if (int(str.charAt(0))==1) {
          rect(x, y, resolution, resolution);
        } if (int(str.charAt(1))==1) {
          rect(x+1*resolution, y, resolution, resolution);
        } if (int(str.charAt(2))==1) {
          rect(x+2*resolution, y, resolution, resolution);
        } if (int(str.charAt(3))==1) {
          rect(x+3*resolution, y, resolution, resolution);
        } if (int(str.charAt(4))==1) {
          rect(x, y+1*resolution, resolution, resolution);
        } if (int(str.charAt(5))==1) {
          rect(x+resolution, y+1*resolution, resolution, resolution);
        } if (int(str.charAt(6))==1) {
          rect(x+2*resolution, y+1*resolution, resolution, resolution);
        } if (int(str.charAt(7))==1) {
          rect(x+3*resolution, y+1*resolution, resolution, resolution);
        } if (int(str.charAt(8))==1) {
          rect(x, y+2*resolution, resolution, resolution);
        } if (int(str.charAt(9))==1) {
          rect(x+resolution, y+2*resolution, resolution, resolution);
        } if (int(str.charAt(10))==1) {
          rect(x+2*resolution, y+2*resolution, resolution, resolution);
        } if (int(str.charAt(11))==1) {
          rect(x+3*resolution, y+2*resolution, resolution, resolution);
        } if (int(str.charAt(12))==1) {
          rect(x, y+3*resolution, resolution, resolution);
        } if (int(str.charAt(13))==1) {
          rect(x+1*resolution, y+3*resolution, resolution, resolution);
        } if (int(str.charAt(14))==1) {
          rect(x+2*resolution, y+3*resolution, resolution, resolution);
        } if (int(str.charAt(15))==1) {
          rect(x+3*resolution, y+3*resolution, resolution, resolution);
        }
        return true;
      }
  return false;
}

//Color gradient background
function gradient() {
  if (c >= 100 || c <= 65) {
    sign *= -1;
    c += sign;
  } else {
    c += sign;
  }
  background(0);
}

//-----------------------------------------------------------------------------
function loadB() {
  b0 = new Rect(width/95 + 4 * width/18, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b0.v = 0;
  b1 = new Rect(width/95 + 4 * width/18 + 2*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b1.v = 1;
  b2 = new Rect(width/95 + 4 * width/18 + 4*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b2.v = 2;
  b3 = new Rect(width/95 + 4 * width/18+ 6*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b3.v = 3;
  b4 = new Rect(width/95 + 4 * width/18+ 8*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b4.v = 4;
  b5 = new Rect(width/95 + 4 * width/18+ 10*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b5.v = 5;
  b6 = new Rect(width/95 + 4 * width/18+ 12*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b6.v = 6;
  b7 = new Rect(width/95 + 4 * width/18+ 14*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b7.v = 7;
  b8 = new Rect(width/95 + 4 * width/18+ 16*width/100, height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b8.v = 8;
}

function drawB() {
  b0.draw_rect();
  b0.update();
  b1.draw_rect();
  b1.update();
  b2.draw_rect();
  b2.update();
  b3.draw_rect();
  b3.update();
  b4.draw_rect();
  b4.update();
  b5.draw_rect();
  b5.update();
  b6.draw_rect();
  b6.update();
  b7.draw_rect();
  b7.update();
  b8.draw_rect();
  b8.update();
}

function ifB() {
 if (b0.rectOver) {
    b0.is_on = ! b0.is_on;
  } else if (b1.rectOver) {
    b1.is_on = ! b1.is_on;
  } else if (b2.rectOver) {
    b2.is_on = ! b2.is_on;
  } else if (b3.rectOver) {
    b3.is_on = ! b3.is_on;
  } else if (b4.rectOver) {
    b4.is_on = ! b4.is_on;
  } else if (b5.rectOver) {
    b5.is_on = ! b5.is_on;
  } else if (b6.rectOver) {
    b6.is_on = ! b6.is_on;
  } else if (b7.rectOver) {
    b7.is_on = ! b7.is_on;
  } else if (b8.rectOver) {
    b8.is_on = ! b8.is_on;
  }

  if (b0.rectOver && !b0.is_on) {
     survive.splice(survive.indexOf(b0.v), 1);
   }  else if (b1.rectOver && !b1.is_on) {
     survive.splice(survive.indexOf(b1.v), 1);
   }  else if (b2.rectOver && !b2.is_on) {
     survive.splice(survive.indexOf(b2.v), 1);
   }  else if (b3.rectOver && !b3.is_on) {
    survive.splice(survive.indexOf(b3.v), 1);
  }  else if (b4.rectOver && !b4.is_on) {
     survive.splice(survive.indexOf(b4.v), 1);
   }  else if (b5.rectOver && !b5.is_on) {
     survive.splice( survive.indexOf(b5.v), 1);
   } else  if (b6.rectOver && !b6.is_on) {
     survive.splice(survive.indexOf(b6.v), 1);
   } else  if (b7.rectOver && !b7.is_on) {
     survive.splice(survive.indexOf(b7.v), 1);
   } else  if (b8.rectOver && !b8.is_on) {
     survive.splice(survive.indexOf(b8.v), 1);
   }

 if (b0.rectOver && b0.is_on) {
    survive.push(0);
  } else if (b1.rectOver && b1.is_on) {
    survive.push(1);
  } else if (b2.rectOver && b2.is_on) {
    survive.push(2);
  } else if (b3.rectOver && b3.is_on) {
    survive.push(3);
  } else if (b4.rectOver && b4.is_on) {
    survive.push(4);
  } else if (b5.rectOver && b5.is_on) {
    survive.push(5)
  } else if (b6.rectOver && b6.is_on) {
    survive.push(6);
  } else if (b7.rectOver && b7.is_on) {
    survive.push(7);
  } else if (b8.rectOver && b8.is_on) {
    survive.push(8);
  }
}

//-----------------------------------------------------------------------------
function loadB1() {
  b01 = new Rect(width/95 + 4 * width/18, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b01.v = 0;
  b12 = new Rect(width/95 + 4 * width/18 + 2*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b12.v = 1;
  b23 = new Rect(width/95 + 4 * width/18 + 4*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b23.v = 2;
  b34 = new Rect(width/95 + 4 * width/18+ 6*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b34.v = 3;
  b45 = new Rect(width/95 + 4 * width/18+ 8*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b45.v = 4;
  b56 = new Rect(width/95 + 4 * width/18+ 10*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b56.v = 5;
  b67 = new Rect(width/95 + 4 * width/18+ 12*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b67.v = 6;
  b78 = new Rect(width/95 + 4 * width/18+ 14*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b78.v = 7;
  b89 = new Rect(width/95 + 4 * width/18+ 16*width/100, height/70 + 2 * height/70, width/100, height/70, color(0), color(87), color(51), color(102), false);
  b89.v = 8;
}

function drawB1() {
  b01.draw_rect();
  b01.update();
  b12.draw_rect();
  b12.update();
  b23.draw_rect();
  b23.update();
  b34.draw_rect();
  b34.update();
  b45.draw_rect();
  b45.update();
  b56.draw_rect();
  b56.update();
  b67.draw_rect();
  b67.update();
  b78.draw_rect();
  b78.update();
  b89.draw_rect();
  b89.update();
}

function ifB1() {
  if (b01.rectOver) {
     b01.is_on = ! b01.is_on;
   }  if (b12.rectOver) {
     b12.is_on = ! b12.is_on;
   }  if (b23.rectOver) {
     b23.is_on = ! b23.is_on;
   }  if (b34.rectOver) {
     b34.is_on = ! b34.is_on;
  }  if (b45.rectOver) {
     b45.is_on = ! b45.is_on;
   }  if (b56.rectOver) {
     b56.is_on = !b56.is_on;
   }  if (b67.rectOver) {
     b67.is_on = ! b67.is_on;
   }  if (b78.rectOver) {
     b78.is_on = ! b78.is_on;
   }  if (b89.rectOver) {
     b89.is_on = ! b89.is_on;
   }

  if (b01.rectOver && !b01.is_on) {
     born.splice(born.indexOf(b01.v), 1);
   }  if (b12.rectOver && !b12.is_on) {
     born.splice(born.indexOf(b12.v), 1);
   }  if (b23.rectOver && !b23.is_on) {
     born.splice(born.indexOf(b23.v), 1);
   }  if (b34.rectOver && !b34.is_on) {
    born.splice(born.indexOf(b34.v), 1);
  }  if (b45.rectOver && !b45.is_on) {
     born.splice(born.indexOf(b45.v), 1);
   }  if (b56.rectOver && !b56.is_on) {
     born.splice( born.indexOf(b56.v), 1 );
   }  if (b67.rectOver && !b67.is_on) {
     born.splice(born.indexOf(b67.v), 1);
   }  if (b78.rectOver && !b78.is_on) {
     born.splice(born.indexOf(b78.v), 1);
   }  if (b89.rectOver && !b89.is_on) {
     born.splice(born.indexOf(b89.v), 1);
   }
 if (b01.rectOver && b01.is_on) {
    born.push(0);
  }  if (b12.rectOver && b12.is_on) {
    born.push(1);
  }  if (b23.rectOver && b23.is_on) {
    born.push(2);
  }  if (b34.rectOver && b34.is_on) {
    born.push(3);
  }  if (b45.rectOver && b45.is_on) {
    born.push(4);
  }  if (b56.rectOver && b56.is_on) {
    born.push(5)
  }  if (b67.rectOver && b67.is_on) {
    born.push(6);
  }  if (b78.rectOver && b78.is_on) {
    born.push(7);
  }  if (b89.rectOver && b89.is_on) {
    born.push(8);
  }
}

// function get_colors(n) {
//   let ret = [];
//   let r = int(random(256));
//   let g = int(random(256));
//   let b = int(random(256));
//   let step = 256 / n;
//   for (let i = 0; i < n; i++) {
//     r += step;
//     g += step;
//     b += step;
//     r = int(r) % 256;
//     g = int(g) % 256;
//     b = int(b) % 256;
//     ret.push([r,g,b]);
//   }
//   return ret;
// }

function get_colors(total)
{
    var i = 360 / (total - 1); // distribute the colors evenly on the hue range
    var r = []; // hold the generated colors
    for (var x=0; x<total; x++)
    {
        r.push(hsvToRgb(i * x, 100, 100)); // you can also alternate the saturation and value for even more contrast between the colors
    }
    return r;
}

function hsvToRgb(h, s, v) {
	var r, g, b;
	var i;
	var f, p, q, t;

	// Make sure our arguments stay in-range
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));

	// We accept saturation and value arguments from 0 to 100 because that's
	// how Photoshop represents those values. Internally, however, the
	// saturation and value are calculated from a range of 0 to 1. We make
	// That conversion here.
	s /= 100;
	v /= 100;

	if(s == 0) {
		// Achromatic (grey)
		r = g = b = v;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}

	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i; // factorial part of h
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));

	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;

		case 1:
			r = q;
			g = v;
			b = p;
			break;

		case 2:
			r = p;
			g = v;
			b = t;
			break;

		case 3:
			r = p;
			g = q;
			b = v;
			break;

		case 4:
			r = t;
			g = p;
			b = v;
			break;

		default: // case 5:
			r = v;
			g = p;
			b = q;
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
