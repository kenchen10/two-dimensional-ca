let grid; // Grid of cells
let cols; // Number of columns in grid
let rows; // Number of rows in grid
let resolution = 8; // Pixel size
let history; // Where a cell has been
let rule; // Rule for the rule CA
let gameOfLifeOn = true;
let brianBrainOn = false;
let r5On = false;
let r6On = false; // Cyclic CA
let r7On = false;
let r8On = false;
let pause = false;
let cycles3 = false;
let generation = 0;
let lines = false;
let gol;
let drawing = false;
let tbox;
let r5;
let r6;
let r7;
let r8;
let step;
let style;
let g2;
let identify = false;
let colors = [[255, 248, 225],[255, 236, 179],[255, 224, 130],
              [255, 213, 79],[255, 202, 40],[255, 193, 7],
              [255, 179, 0],[255, 160, 0],[255, 143, 0],
              [255, 111, 0],[255, 87, 34],[244, 81, 30],
              [230, 74, 25],[216, 67, 21],[191, 54, 12],
              [194, 24, 91],[173, 20, 87],[136, 14, 79]];
let colors1;
// [[255, 235, 238],[244, 143, 177],[206, 147, 216],
//               [179, 157, 219],[159, 168, 218],[144, 202, 249],
//               [129, 212, 250],[77, 208, 225],[128, 203, 196],
//               [165, 214, 167],[124, 179, 66],[220, 231, 117],
//               [255, 245, 157],[255, 213, 79]]

let num_states = 14;
let R = 1;
let T = 1;
let fn = 0;

let hide = false;
let show;
let info;
let textInput;
let data;
let dict;
let checked = false;
let a = [];
let keyValues;

let survive = [2,3];
let born = [3];
let all_survive = [0,1,2,3,4,5,6,7,8]
let all_born = [0,1,2,3,4,5,6,7,8]
let b0;
let b1;
let b2;
let b3;
let b4;
let b5;
let b6;
let b7;
let b8;
let b01;
let b12;
let b23;
let b34;
let b45;
let b56;
let b67;
let b78;
let b89;

let style2;
let canvas;
let r;

let tbox2;
let tbox3;
let tbox4;
let prev;

let dA = 1.0;
let dB = 0.4;
let feed = 0.0367;
let k = 0.0649;

var myColor = '#eeee00';
var ca = ["Game of Life", "Rules", "Cyclic", "Diffusion"]
var gui;
var neighborhood = [[1,1,1],
                    [1,0,1],
                    [1,1,1]];
let b00;
let b10;
let b20;
let b30;
let b40;
let b50;
let b60;
let b70;
let stylen;
let nextButton;
let rand;
let randOn = false;

let lrs; // LR Symmetry Button
let uds; // UD Symmetry Button
let ds; // DIAG Symmetry Button
let lr_symm = [[[1,0,1],
                [1,0,1],
                [1,0,1]],
               [[1,1,1],
                [1,0,1],
                [1,1,1]],
                [[1,0,1],
                 [0,0,0],
                 [1,0,1]]];
let ud_symm = [[[1,1,1],
                [0,0,0],
                [1,1,1]],
                [[0,1,0],
                 [1,0,1],
                 [0,1,0]]];
let diag_symm = [[[1,1,0],
                  [1,0,0],
                  [0,0,1]],
               [[0,1,0],
                [1,0,1],
                [0,1,1]],
                [[0,1,1],
                 [1,0,1],
                 [1,1,1]]];
let diag_i = 0;
let ud_i = 0;
let lr_i = 0;

let ud_symm_on = false;
let lr_symm_on = false;
let diag_symm_on = false;
let square = false;

let square_button;

let new_neighborhood = [[0,0,0],[0,0,0],[0,0,0]];

let fillButton;
let fillOn = false;

let ones_idx = [];
let zeros_idx = [];

let onPatterns = false;

function preload() {
  // ft = loadFont('/fonts/SourceSansPro-ExtraLight.otf');
  data = [];
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  cols = round(width / resolution);
  rows = round(height / resolution)
  //create initial array of array with random 0 or 1 value
  grid = initializeArray(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
  gol = new Button(width/70, height/70 + height/20, width/19, height/30, "Game Of Life");
  r8 = new Button(width/70+width/18, height/70 + height/20, width/19, height/30, "Rule");
  brain = new Button(width/70, height/70 + 2 * height/20, width/19, height/30, "Brian's Brain");
  r5 = new Button(width/70, height/70 + 3 * height/20, width/19, height/30, "r5");
  r6 = new Button(width/70+width/18, height/70 + 2 * height/20, width/19, height/30, "Cycles");
  r7 = new Button(width/70 + width/18, height/70 + 3 * height/20, width/19, height/30, "Diffusion");
  c3 = new Button(width/70, height/70 + 4 * height/20, width/19, height/30, "Cycles 3");
  d = new Button(width/70, height/70 + 6 * height/20, width/19, height/30, "Draw");
  nextButton = new Button(width/70, height/70 + 7 * height/20, width/19, height/30, "Next");

  //lrs = new Button(width/70 + width/18, height/70 + 8 * height/20, width/(19*3), height/30, "LR");
  lrs = new Rect(width/70, height/70 + 8 * height/20, width/(19*3), height/30, color(0), color(87), color(51), color(102), false);
  //uds = new Button(width/70 + width/18 + width/(19*3), height/70 + 8 * height/20, width/(19*3), height/30, "UD");
  uds = new Rect(width/70 + width/(19*3), height/70 + 8 * height/20, width/(19*3), height/30, color(0), color(87), color(51), color(102), false);
  //ds = new Button(width/70 + width/18 + 2 * width/(19*3), height/70 + 8 * height/20, width/(19*3), height/30, "D");
  ds = new Rect(width/70 + 2 * width/(19*3), height/70 + 8 * height/20, width/(19*3), height/30, color(0), color(87), color(51), color(102), false);
  square_button = new Button(width/70 + width/18, height/70 + 8 * height/20, width/38, height/30, "square");
  fillButton = new Button(width/70 + width/18 + width/38, height/70 + 8 * height/20, width/38, height/30, "fill");
  rand = new Button(width/70 + width/18, height/70 + 7 * height/20, width/19, height/30, "Rand");
  id = new Button(width/70+width/18, height/70 + 4*height/20, width/19, height/30, "rgb");
  step = new Button(width/70, height/70 + 5 * height/20, width/19, height/30, "Step");
  p = new Button(width/70+width/18, height/70 + 5 * height/20, width/19, height/30, "Pause");
  tbox = new TEXTBOX(width/70 + width/24, height/70 + 8 * height/19.9, width/15, height/30);
  tbox2 = new TEXTBOX(width/70 + width/24, height/70 + 9 * height/19.9, width/15, height/30);
  tbox3 = new TEXTBOX(width/70 + width/24, height/70 + 10 * height/19.9, width/15, height/30);
  tbox4 = new TEXTBOX(width/70 + width/24, height/70 + 11 * height/19.9, width/15, height/30);
  style = new Button(width/95, height/100, width/9.3+width/120, height/2.2, "");
  show = new Button(width/80, height/70, width/100, width/150, "-");
  info = new Button(width/2, height/50, width/7, height/30, "");
  r = new Button(width/70+width/18, height/70 + 6 * height/20, width/19, height/30, "Res");
  style.hover = color(232, 234, 246);
  style.baseColor = color(232, 234, 246);
  info.hover = color(232, 234, 246);
  info.baseColor = color(232, 234, 246);
  // rule = [0,1,1,1,1,0,1,1,0,0,0,0,0,0,1,0];
  // Square:
  // rule = [1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,1] //: Sierpinski
  // rule = [0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1]
  // rule = [0,1,1,1,0,0,0,1,0,0,0,0,1,0,0,1]//: histogram thing, cyclic
  // rule = [0,1,0,0,1,1,1,0,0,0,1,0,0,1,0,1]//: histogram thing, cyclic
  // rule = [0,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1]//: interesting sierpinski
  // rule = [0,0,1,0,1,1,0,1,1,0,0,0,1,1,0,1]//: interesting sierpinski
  // rule = [0,1,0,1,1,1,0,1,1,0,1,0,1,0,1,0]//: interesting sierpinski
  // rule = [1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1]//: interesting sierpinski
  // rule = [0,1,1,1,1,0,0,0,0,0,1,1,0,0,1,0]//: interesting sierpinski
  // rule = [0,1,0,0,1,0,1,0,1,1,0,1,1,1,1,1]//: interesting sierpinski\
   rule = [0,0,0,1,1,1,1,0,1,1,1,0,0,0,0,0]//: interesting sierpinski, hexagonal convergence
  // rule = [0,0,1,0,1,1,0,1,1,1,1,1,0,0,0,0]//: Sierpinski to left
  // rule = [0,1,1,1,1,0,0,1,1,0,1,1,0,0,1,0]//: hexagons
  // rule = [0,1,1,1,0,0,1,1,1,0,1,1,0,0,0,1]//: cool snake thing
  // rule = [0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1]//: symmetrical maze thing
  // Starting from Random:
  // rule = [0,1,1,1,1,0,1,1,0,0,0,0,0,0,1,0]
  //
  // rule = [1,0,0,1,1,1,0,1,1,0,0,0,1,1,0,1] //: really interesting sierpinski with border start
  ones_idx = [[3],[4],[5],[6], [8], [9], [10]];
  zeros_idx = [[0], [1],[2],[7],[11],[12],[13],[14],[15]];


  // rule = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  g2 = initializeArray2(cols, rows);
  loadB();
  loadB1();
  style2 = new Button(width/95 + 3.9 * width/18, height/100, width/5.5, height/14, "");
  style2.hover = color(232, 234, 246);
  style2.baseColor = color(232, 234, 246);
  b34.is_on = true;
  b2.is_on = true;
  b3.is_on = true;
  // textInput = createInput();
  // textInput.position(width/70, height/50 + 8 * height/20);
  colors1 = get_colors(20);

  // Neighborhood buttons
  b00 = new Rect(width/10 + 15 * width/18, height/1.2 + 2 * height/70, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b10 = new Rect(width/10 + 15 * width/18 + width/100, height/1.2 + 2 * height/70, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b20 = new Rect(width/10 + 15 * width/18 + width/50, height/1.2 + 2 * height/70, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b30 = new Rect(width/10 + 15 * width/18, height/1.2 + 2 * height/70 + width/100, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b40 = new Rect(width/10 + 15 * width/18 + width/50, height/1.2 + 2 * height/70 + width/100, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b50 = new Rect(width/10 + 15 * width/18, height/1.2 + 2 * height/70 + width/50, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b60 = new Rect(width/10 + 15 * width/18 + width/100, height/1.2 + 2 * height/70 + width/50, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b70 = new Rect(width/10 + 15 * width/18 + width/50, height/1.2 + 2 * height/70 + width/50, width/100, width/100, color(0), color(87), color(51), color(102), false);
  b00.is_on = 1;
  b10.is_on = 1;
  b20.is_on = 1;
  b30.is_on = 1;
  b40.is_on = 1;
  b50.is_on = 1;
  b60.is_on = 1;
  b70.is_on = 1;
  stylen = new Button(width/10 + 15 * width/18 - width/200, height/1.2 + 2 * height/70 - width/200, width/100 * 4, width/100 * 4, "");
  stylen.hover = color(232, 234, 246);
  stylen.baseColor = color(232, 234, 246);
  // gui = createGui('p5.gui');
  // gui.addGlobals('myColor', 'ca');
}

function draw() {
  //background gradient
  //gradient();
  background(255);
  //show array
  if (!pause) {
    drawing = false;
    p.t = "Pause";
    generation += 1;
    if (gameOfLifeOn) {
      let next = make2DArray(cols, rows);
      computeNext(grid, next, survive, born);
      grid = next;
      showArray(grid);
      //update array based on rules
    } else if (brianBrainOn) {
      showArrayBrian(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextBrian(grid, next);
      grid = next;
    } else if (r5On) {
      showArrayr5(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr5(grid, next);
      grid = next;
    } else if (r6On) {
      showArrayr6(grid, num_states);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr6(grid, next, num_states, T, R, fn);
      grid = next;
    } else if (r7On) {
      drawReact();
    } else if (r8On) {
      showArrayr8(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr8(grid, next);
      grid = next;
    } else if (cycles3) {
      showArrayEat(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextEat(grid, next);
      grid = next;
    }
  } else {
    p.t = "Play";
    if (gameOfLifeOn) {
      showArray(grid);
    } else if (brianBrainOn) {
      showArrayBrian(grid);
    } else if (r5On) {
      showArrayr5(grid);
    } else if (r6On) {
      showArrayr6(grid, num_states);
    } else if (r7On) {
      drawReactPause();
    } else if (r8On) {
      showArrayr8(grid);
    } else if (cycles3) {
      showArrayEat(grid);
    }
  }
  if (drawing) {
    stroke(0);
    strokeWeight(1);
    line(int(floor(mouseX/resolution)*resolution), 0, int(floor(mouseX/resolution)*resolution), height);
    line(0, int(floor(mouseY/resolution)*resolution), width, int(floor(mouseY/resolution)*resolution));
    line(int(floor(mouseX/resolution)*resolution)+resolution, 0, int(floor(mouseX/resolution)*resolution)+resolution, height);
    line(0, int(floor(mouseY/resolution)*resolution)+resolution, width, int(floor(mouseY/resolution)*resolution)+resolution);
  }
  if (!hide) {
    show.t = "-";
    style.display();
    style.isOver();
    stylen.display();
    stylen.isOver();
    // textFont(ft);
    textAlign(LEFT);
    fill(0);
    noStroke();
    // textFont(ft);
    textAlign(LEFT);
    textSize(height/50);
    text("gen: " + generation, width/35, height/20);
    textAlign(LEFT);
    text("res: " + resolution, width/12, height/20);
    if (r8On) {
      rand.display();
      rand.isOver();
      lrs.draw_rect();
      lrs.update();
      text("lrs", lrs.rectX, lrs.rectY+10)
      uds.draw_rect();
      uds.update();
      ds.draw_rect();
      ds.update();
      let str = ""
      for (let i = 0; i < rule.length; i++) {
        str = str+(rule[i]);
      }
      textAlign(LEFT);
      noStroke();
      var w = textWidth("rule: " + str);
      fill(255);
      // rect(width/95 + width/9 + width/150, height/70 + resolution * 7.7, w * 1.1, 14);
      fill(0);
      // text("rule: " + str, width/95 + width/9+width/120, height/70 + resolution * 9);
      // textFont(ft);
      textAlign(LEFT);
      textSize(height/50);
      text("lr", lrs.rectX + width/200, lrs.rectY+height/40);
      text("ud", uds.rectX + width/200, uds.rectY+height/40)
      text("d", ds.rectX + width/200, ds.rectY+height/40)
    }
    gol.display();
    gol.isOver();
    brain.display();
    brain.isOver();
    r5.display();
    r5.isOver();
    r6.display();
    r6.isOver();
    r7.display();
    r7.isOver();
    r8.display();
    r8.isOver();
    p.display();
    p.isOver();
    d.display();
    d.isOver();
    step.display();
    step.isOver();
    id.display();
    id.isOver();
    c3.display();
    c3.isOver();
    r.display();
    r.isOver();
    b00.draw_rect();
    b10.draw_rect();
    b20.draw_rect();
    b30.draw_rect();
    b40.draw_rect();
    b50.draw_rect();
    b60.draw_rect();
    b70.draw_rect();
    b00.update();
    b10.update();
    b20.update();
    b30.update();
    b40.update();
    b50.update();
    b60.update();
    b70.update();
    if (gameOfLifeOn) {
      style2.display();
      style2.isOver();
      nextButton.display();
      nextButton.isOver();
      rand.display();
      rand.isOver();
      drawB();
      drawB1();
      fill(0);
      text("0", width/95 + 4* width/17.6, height/70 + 4 * height/65);
      text("1", width/95 + 4* width/17.6 + width/50, height/70 + 4 * height/65);
      text("2", width/95 + 4* width/17.6 + 2*width/50, height/70 + 4 * height/65);
      text("3", width/95 + 4* width/17.6 + 3*width/50, height/70 + 4 * height/65);
      text("4", width/95 + 4* width/17.6 + 4*width/50, height/70 + 4 * height/65);
      text("5", width/95 + 4* width/17.6 + 5*width/50, height/70 + 4 * height/65);
      text("6", width/95 + 4* width/17.6 + 6*width/50, height/70 + 4 * height/65);
      text("7", width/95 + 4* width/17.6 + 7*width/50, height/70 + 4 * height/65);
      text("8", width/95 + 4* width/17.6 + 8*width/50, height/70 + 4 * height/65);
    } if (r6On) {
      textAlign(LEFT);
      let fn_word;
      if (fn == 1) {
        fn_word = "M";
      } else if (fn == 2) {
        fn_word = "other";
      } else {
        fn_word = "VN";
      }
      fill(0);
      text("fn: " + fn_word,width/70, height/70 + 8 * height/19);
      text("R: " + R,width/70, height/70 + 9 * height/19);
      text("T: " + T,width/70, height/70 + 10 * height/19);
      text("states: " + num_states,width/70, height/70 + 11 * height/19);
      tbox.DRAW();
      tbox2.DRAW();
      tbox3.DRAW();
      tbox4.DRAW();
    } else if (r8On) {
      nextButton.display();
      nextButton.isOver();
      square_button.display();
      square_button.isOver();
      fillButton.display();
      fillButton.isOver();
    }
  } else {
    show.t = '+';
  }
  show.display();
  show.isOver();
  fill(0);
  //text(grid[int(mouseX / resolution)][int(mouseY/resolution)], mouseX, mouseY);
}

function res() {
  resolution = Math.min(Math.max(parseInt((resolution + 1)%20), 7), 20);
  cols = round(width / resolution);
  rows = round(height / resolution);
  if (gameOfLifeOn) {
    grid = initializeArray(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
    g2 = initializeArray2(cols, rows);
  } else if (brianBrainOn) {
    grid = initializeArrayBrian(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (r5On) {
    grid = initializeArrayr5(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  } else if (r6On) {
    grid = initializeArrayr6(cols, rows, num_states);
    history = initializeArray2(cols, rows);
  } else if (r7On) {
    r7fn();
  } else if (r8On) {
    grid = initializeArrayr8(cols, rows, 4, 4);
    history = initializeArray2(cols, rows);
  }
  generation = 0;
}

function gameOfLife() {
  pause = false;
  generation = 0;
  gameOfLifeOn = true;
  brianBrainOn = false;
  cycles3 = false;
  r5On = false;
  r6On = false;
  r7On = false;
  r8On = false;
  grid = initializeArray(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
  g2 = initializeArray2(cols, rows);
  neighborhood = [[1,1,1],
                  [1,0,1],
                  [1,1,1]];
  changedNeighborhood();
}

function brianBrain() {
  pause = false;
  r5On = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = true;
  r8On = false;
  r7On = false;
  cycles3 = false;
  r6On = false;
  grid = initializeArrayBrian(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function r5fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r5On = true;
  r8On = false;
  r7On = false;
  r6On = false;
  cycles3 = false;
  grid = initializeArrayBrian(cols, rows, 4, 4);
  history = initializeArray2(cols, rows);
}

function r6fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r5On = false;
  r6On = true;
  r8On = false;
  cycles3 = false;
  r7On = false;
  grid = initializeArrayr6(cols, rows, num_states);
  history = initializeArray2(cols, rows);
}

function r7fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r5On = false;
  r6On = false;
  r8On = false;
  cycles3 = false;
  r7On = true;
  initializeReact();
}

function r8fn() {
  neighborhood = [[1,0,1],
                  [0,0,0],
                  [1,0,1]];
  b00.is_on = 1;
  b10.is_on = 0;
  b20.is_on = 1;
  b30.is_on = 0;
  b40.is_on = 0;
  b50.is_on = 1;
  b60.is_on = 0;
  b70.is_on = 1;
  if (lr_symm_on || ud_symm_on || diag_symm_on) {
    getRule2();
  }
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r5On = false;
  r6On = false;
  r8On = true;
  r7On = false;
  cycles3 = false;
  grid = initializeArrayr8(cols, rows, 4, 4);
  tbox.maxLen = 15;
}

function cycles3fn() {
  pause = false;
  generation = 0;
  gameOfLifeOn = false;
  brianBrainOn = false;
  r5On = false;
  r6On = false;
  r7On = false;
  r8On = false;
  cycles3 = true;
  grid = initializeArrayEat(cols, rows, 4, 4);
}

function pause_fn() {
  pause = !pause;
}

function id_fn() {
  identify = !identify;
}

function hide_fn() {
  hide = !hide;
}

function mouseDragged() {
  if (!style.over) {
    if (drawing || pause) {
      if (gameOfLifeOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      } else if (brianBrainOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r5On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r6On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r8On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      }
    }
  }
  if (r7On && !style.over) {
    grid[int(mouseX/resolution)][int(mouseY/resolution)].b = 1;
  }
}

function mousePressed () {
  if (style && !style.over) {
    if (drawing || pause) {
      if (gameOfLifeOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      } else if (brianBrainOn) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r5On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r6On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 0;
      } else if (r8On) {
        grid[int(mouseX/resolution)][int(mouseY/resolution)] = 1;
      }
    }
  }
  if (r7On && !style.over) {
    grid[int(mouseX/resolution)][int(mouseY/resolution)].b = 1;
  }
  if (gol.over) {
    id.t = "rgb";
    gameOfLife();
  } else if (brain.over) {
    brianBrain();
  } else if (p.over) {
    pause_fn();
  } else if (d.over) {
    drawer();
  } else if (r5.over) {
    r5fn();
  } else if (r6.over) {
    r6fn();
  } else if (r7.over) {
    r7fn();
  } else if (r8.over) {
    id.t = "Patterns";
    r8fn();
  } else if (id.over) {
    if (r8On) {
      onPatterns = !onPatterns;
    } else {
      colors1 = get_colors(20);
      id_fn();
    }
  } else if (c3.over) {
    cycles3fn();
  } else if (show.over) {
    hide_fn();
  } else if (r.over) {
    res();
  } else if (rand.over) {
    if (r8On) {
      randOn = !randOn;
      r8fn();
    } else {
      randOn = !randOn;
      gameOfLife();
    }
  } else if (square_button.over) {
    square = !square;
  }
  if (nextButton.over && gameOfLifeOn) {
    let b_val = int(random(1, 9));
    let s_val = int(random(1, 9));
    born = getRandom(all_born, b_val);
    survive = getRandom(all_survive, s_val);
    gameOfLife();
    if (born.includes(0)) {
      b0.is_on = 1;
    } else {
      b0.is_on = 0;
    } if (born.includes(1)) {
      b1.is_on = 1;
    } else {
      b1.is_on = 0;
    } if (born.includes(2)) {
      b2.is_on = 1;
    } else {
      b2.is_on = 0;
    } if (born.includes(3)) {
      b3.is_on = 1;
    } else {
      b3.is_on = 0;
    } if (born.includes(4)) {
      b4.is_on = 1;
    } else {
      b4.is_on = 0;
    } if (born.includes(5)) {
      b5.is_on = 1;
    } else {
      b5.is_on = 0;
    } if (born.includes(6)) {
      b6.is_on = 1;
    } else {
      b6.is_on = 0;
    } if (born.includes(7)) {
      b7.is_on = 1;
    } else {
      b7.is_on = 0;
    } if (born.includes(8)) {
      b8.is_on = 1;
    } else {
      b8.is_on = 0;
    }

    if (survive.includes(0)) {
      b01.is_on = 1;
    } else {
      b01.is_on = 0;
    } if (survive.includes(1)) {
      b12.is_on = 1;
    } else {
      b12.is_on = 0;
    } if (survive.includes(2)) {
      b23.is_on = 1;
    } else {
      b23.is_on = 0;
    } if (survive.includes(3)) {
      b34.is_on = 1;
    } else {
      b34.is_on = 0;
    } if (survive.includes(4)) {
      b45.is_on = 1;
    } else {
      b45.is_on = 0;
    } if (survive.includes(5)) {
      b56.is_on = 1;
    } else {
      b56.is_on = 0;
    } if (survive.includes(6)) {
      b67.is_on = 1;
    } else {
      b67.is_on = 0;
    } if (survive.includes(7)) {
      b78.is_on = 1;
    } else {
      b78.is_on = 0;
    } if (survive.includes(8)) {
      b89.is_on = 1;
    } else {
      b89.is_on = 0;
    }
  } else if (nextButton.over && r8On) {
    if (lr_symm_on || ud_symm_on || diag_symm_on) {
      getRule2();
    } else {
      ones_idx = [];
      zeros_idx = [];
      for (let i = 0; i < rule.length; i++) {
        let v = int(random(2));
        rule[i] = v;
      }
      while (rule[0] == 1 && rule[rule.length - 1] == 0) {
        for (let i = 0; i < rule.length; i++) {
          let v = int(random(2));
          rule[i] = v;
        }
      }
      for (let v = 0; v < rule.length; v++) {
        if (rule[v] == 1) {
          ones_idx.push([v]);
        } else {
          zeros_idx.push([v]);
        }
      }

    }

    // getRule();
    grid = initializeArrayr8(cols, rows);
    generation = 0;
  }
  if (fillButton.over) {
    fillOn = !fillOn;
  }

  if (lrs.rectOver) {
    //neighborhood = lr_symm[lr_i];
    lr_symm_on = !lr_symm_on;
    lrs.is_on = !lrs.is_on;
    //changedNeighborhood();
    //lr_i = (lr_i + 1) % lr_symm.length
  } else if (uds.rectOver) {
    //neighborhood = ud_symm[ud_i];
    ud_symm_on = !ud_symm_on;
    uds.is_on = !uds.is_on;
    // changedNeighborhood();
    // ud_i = (ud_i + 1) % ud_symm.length
  } else if (ds.rectOver) {
    //neighborhood = diag_symm[diag_i];
    diag_symm_on = !diag_symm_on;
    ds.is_on = !ds.is_on;
    // changedNeighborhood();
    // diag_i = (diag_i + 1) % diag_symm.length
  }

  ifB();
  ifB1();
  ifNeighborhood();
  if (step.over && pause) {
    if (gameOfLifeOn) {
      showArray(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNext(grid, next, survive, born);
      grid = next;
    } else if (brianBrainOn) {
      showArrayBrian(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextBrian(grid, next);
      grid = next;
    } else if (r5On) {
      showArrayr5(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr5(grid, next);
      grid = next;
    } else if (r6On) {
      showArrayr6(grid, num_states);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr6(grid, next, num_states, T, R, fn);
      grid = next;
    } else if (r7On) {
      showArrayr7(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr7(grid, next);
      grid = next;
    } else if (r8On) {
      showArrayr8(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextr8(grid, next);
      grid = next;
    } else if (cycles3) {
      showArrayEat(grid);
      //update array based on rules
      let next = make2DArray(cols, rows);
      computeNextEat(grid, next);
      grid = next;
    }
    generation += 1;
  }
  tbox.PRESSED(mouseX, mouseY);
  tbox2.PRESSED(mouseX, mouseY);
  tbox3.PRESSED(mouseX, mouseY);
  tbox4.PRESSED(mouseX, mouseY);
}

function keyTyped() {
  if (tbox.Text.length < 17) {
    tbox.KEYPRESSED(key, keyCode);
  }
  tbox2.KEYPRESSED(key, keyCode);
  tbox3.KEYPRESSED(key, keyCode);
  tbox4.KEYPRESSED(key, keyCode);
}

function keyPressed() {
  let t = tbox.Text;
  let t2 = tbox2.Text;
  let t3 = tbox3.Text;
  let t4 = tbox4.Text;
  if (keyCode == 32 || keyCode == BACKSPACE) {
    // if (t.length == 16 && r8On) {
    //   for (let i = 0; i < rule.length; i++) {
    //       rule[i] = t.charAt(i) - '0';
    //   }
    // }
    tbox.KEYPRESSED(key, keyCode);
    tbox2.KEYPRESSED(key, keyCode);
    tbox3.KEYPRESSED(key, keyCode);
    tbox4.KEYPRESSED(key, keyCode);
  } else if (keyCode == ENTER) {
    tbox.Text = "";
    tbox2.Text = "";
    tbox3.Text = "";
    tbox4.Text = "";
    if (r6On && t.length >= 1) {
      fn = int(t);
      r6fn();
    }
    if (r6On && t2.length >= 1) {
      R = int(t2);
      r6fn();
    }
    if (r6On && t3.length >= 1) {
      T = int(t3);
      r6fn();
    }
    if (r6On && t4.length >= 1) {
      num_states = int(t4);
      r6fn();
    }
    if (t.length == 16 && r8On) {
      for (let i = 0; i < rule.length; i++) {
          rule[i] = t.charAt(i) - '0';
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = 0;
          history[i][j] = false;
        }
      }
      grid[int(cols/2)][int(rows/2)] = 1;
    }
  }
}

function drawer() {
  pause = true;
  drawing = true;
  grid = make2DArray(cols, rows);
  generation = 0;
  if (gameOfLifeOn) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0
        history[i][j] = false;
        g2[i][j]=false;
      }
    }
  } else if (brianBrainOn) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 2;
        history[i][j] = false;
      }
    }
  } else if (r5On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r6On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
        history[i][j] = false;
      }
    }
  } else if (r7On) {
    initializeReact2();
  } else if (r8On) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
        history[i][j] = false;
      }
    }
  } else if (cycles3) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
        history[i][j] = false;
      }
    }
  }
}

function ifNeighborhood() {
  // b00 = new Rect(width/95 + 15 * width/18, height/70 + 2 * height/70, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b10 = new Rect(width/95 + 15 * width/18 + width/100, height/70 + 2 * height/70, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b20 = new Rect(width/95 + 15 * width/18 + width/50, height/70 + 2 * height/70, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b30 = new Rect(width/95 + 15 * width/18, height/70 + 2 * height/70 + width/100, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b40 = new Rect(width/95 + 15 * width/18 + width/50, height/70 + 2 * height/70 + width/100, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b50 = new Rect(width/95 + 15 * width/18, height/70 + 2 * height/70 + width/50, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b60 = new Rect(width/95 + 15 * width/18 + width/100, height/70 + 2 * height/70 + width/50, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // b70 = new Rect(width/95 + 15 * width/18 + width/50, height/70 + 2 * height/70 + width/50, width/100, width/100, color(0), color(87), color(51), color(102), false);
  // [[b00, b10, b20],
  //  [b30,  x,  b40],
  //  [b50, b60, b70]]
  if (b00.rectOver) {
    b00.is_on = ! b00.is_on;
    neighborhood[0][0] = int(b00.is_on);
  } if (b10.rectOver) {
     b10.is_on = ! b10.is_on;
     neighborhood[1][0] = int(b10.is_on);
   }  if (b20.rectOver) {
     b20.is_on = ! b20.is_on;
     neighborhood[2][0] = int(b20.is_on);
   }  if (b30.rectOver) {
     b30.is_on = ! b30.is_on;
     neighborhood[0][1] = int(b30.is_on);
   }  if (b40.rectOver) {
     b40.is_on = ! b40.is_on;
     neighborhood[2][1] = int(b40.is_on);
  }  if (b50.rectOver) {
     b50.is_on = ! b50.is_on;
     neighborhood[0][2] = int(b50.is_on);
   }  if (b60.rectOver) {
     b60.is_on = !b60.is_on;
     neighborhood[1][2] = int(b60.is_on);
   }  if (b70.rectOver) {
     b70.is_on = ! b70.is_on;
     neighborhood[2][2] = int(b70.is_on);
   }

   let ones = 0;
   for (let i = 0; i < neighborhood.length; i++) {
     for (let j = 0; j < neighborhood[0].length; j++) {
       if (neighborhood[i][j] == 1) {
         ones += 1;
       }
     }
   }
   if (r8On && rule.length != 2**ones && !(lr_symm_on || ud_symm_on || diag_symm_on)) {
     // Change rule based on neighborhood change.
     rule = [];
     for (let i = 0; i < 2 ** ones; i++) {
       rule[i] = int(random(2));
     }
     while (rule[0] == 1 && rule[rule.length - 1] == 0) {
       for (let i = 0; i < rule.length; i++) {
         rule[i] = int(random(2));
       }
     }

   }
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function changedNeighborhood() {
  b00.is_on = neighborhood[0][0];
  b10.is_on = neighborhood[0][1];
  b20.is_on = neighborhood[0][2];
  b30.is_on = neighborhood[1][0];
  b40.is_on = neighborhood[1][2];
  b50.is_on = neighborhood[2][0];
  b60.is_on = neighborhood[2][1];
  b70.is_on = neighborhood[2][2];
}

function matrix_repr(i) {
  let neighborSize = int(Math.log(rule.length)/Math.log(2));
  let binaryCode = (i >>> 0).toString(2);
  while (binaryCode.length < neighborSize) {
    binaryCode = '0' + binaryCode;
  }
  let matrix = [[0,0,0],[0,0,0],[0,0,0]];
  let counter = 0
  for (let nc = 0; nc < neighborhood.length; nc++) {
    let r = [];
    for (let nr = 0; nr < neighborhood[0].length; nr++) {
      if (neighborhood[nc][nr] == 1) {
        matrix[nr][nc] = int(binaryCode[neighborSize - counter - 1]);
        counter += 1;
      }
      else {
        matrix[nr][nc] = 0;
      }
    }
  }
  return matrix;
}

function getSymms() {
  let d = {}
  let neighborSize = 8;
  for (let i = 0; i < 256; i++) {
    let binaryCode = (i >>> 0).toString(2);
    while (binaryCode.length < neighborSize) {
      binaryCode = '0' + binaryCode;
    }
    let matrix = [[0,0,0],[0,0,0],[0,0,0]];
    let counter = 0
    for (let nc = 0; nc < neighborhood.length; nc++) {
      let r = [];
      for (let nr = 0; nr < neighborhood[0].length; nr++) {
        if (neighborhood[nc][nr] == 1) {
          matrix[nr][nc] = int(binaryCode[neighborSize - counter - 1]);
          counter += 1;
        }
        else {
          matrix[nr][nc] = 0;
        }
      }
    }
    let new_m_lr = countPatternIndex(makeLR(matrix));
    let new_m_ud = countPatternIndex(makeUD(matrix));
    let new_m_diag = countPatternIndex(makeDiag(matrix));
    let symm_arr = [new_m_lr, new_m_ud, new_m_diag];
    d[i] = symm_arr;
  }
  return d;
}

function containsSame(arr, v) {
  for (let i = 0; i < arr.length; i++) {
    if (v.length == arr[i].length) {
      if (arraysEqual(v, arr[i])) {
        return true;
      }
    }
  }
  return false;
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function getRule2() {
  let d = getSymms();

  neighborhood = [[1,1,1],
                  [1,0,1],
                  [1,1,1]];
  b00.is_on = 1;
  b10.is_on = 1;
  b20.is_on = 1;
  b30.is_on = 1;
  b40.is_on = 1;
  b50.is_on = 1;
  b60.is_on = 1;
  b70.is_on = 1;
  rule = new Array(2 ** 8 - 1).fill(2);;
  let num_ones = 16;
  let num_single = int(random(8));
  let num_zeros = 16;
  let one_arr = [];
  let zero_arr = [];
  ones_idx = [];
  zeros_idx = [];
  let single_arr = [];
  for (let i = 0; i < num_ones; i++) {
    let idx = int(random(rule.length));
    while (rule[idx] != 2) {
      idx = int(random(rule.length));
    }
    rule[idx] = 1;
    if (lr_symm_on) {
      rule[d[idx][0]] = 1;
      if (d[idx][0] != idx) {
        let pair = [idx, d[idx][0]];
        if (!containsSame(ones_idx,pair)) {
          ones_idx.push([idx, d[idx][0]]);
        }
      } else {
        if (!containsSame(ones_idx,[idx])) {
          ones_idx.push([idx]);
        }
      }
    } else if (ud_symm_on) {
      rule[d[idx][1]] = 1;
      if (d[idx][1] != idx) {
        let pair = [idx, d[idx][1]];
        if (!containsSame(ones_idx,pair)) {
          ones_idx.push([idx, d[idx][1]])
        }
      } else {
        if (!containsSame(ones_idx,[idx])) {
          ones_idx.push([idx])
        }
      }
    } else if (diag_symm_on) {
      rule[d[idx][2]] = 1;
      if (d[idx][2] != idx) {
        let pair = [idx, d[idx][2]];
        if (!containsSame(ones_idx,pair)) {
          ones_idx.push([idx, d[idx][2]])
        }
      } else {
        if (!containsSame(ones_idx,[idx])) {
          ones_idx.push([idx])
        }
      }
    }
  }
  for (let i = 0; i < num_single; i++) {
    idx = 2 ** (9 - num_single - 1);
    rule[idx] = 1;
    if (lr_symm_on) {
      rule[d[idx][0]] = 1;
      if (d[idx][0] != idx) {
        let pair = [idx, d[idx][0]];
        if (!containsSame(ones_idx,pair)) {
          ones_idx.push([idx, d[idx][0]]);
        }
      } else {
        if (!containsSame(ones_idx,[idx])) {
          ones_idx.push([idx])
        }
      }
    } else if (ud_symm_on) {
      rule[d[idx][1]] = 1;
      if (d[idx][1] != idx) {
        let pair = [idx, d[idx][1]];
        if (!containsSame(ones_idx,pair)) {
          ones_idx.push([idx, d[idx][1]]);
        }
      } else {
        if (!containsSame(ones_idx,[idx])) {
          ones_idx.push([idx])
        }
      }
    } else if (diag_symm_on) {
      rule[d[idx][2]] = 1;
      if (d[idx][2] != idx) {
        let pair = [idx, d[idx][2]];
        if (!containsSame(ones_idx,pair)) {
          ones_idx.push([idx, d[idx][2]]);
        }
      } else {
        if (!containsSame(ones_idx,[idx])) {
          ones_idx.push([idx])
        }
      }
    }
  }
  for (let i = 0; i < num_zeros; i++) {
    let idx = int(random(rule.length));
    while (rule[idx] != 2) {
      idx = int(random(rule.length));
    }
    rule[idx] = 0;
    if (lr_symm_on) {
      rule[d[idx][0]] = 0;
      if (d[idx][0] != idx) {
        zeros_idx.push([idx, d[idx][0]])
      } else {
        zeros_idx.push([idx])
      }
    } else if (ud_symm_on) {
      rule[d[idx][1]] = 0;
      if (d[idx][1] != idx) {
        zeros_idx.push([idx, d[idx][1]])
      } else {
        zeros_idx.push([idx])
      }
    } else if (diag_symm_on) {
      rule[d[idx][2]] = 0;
      if (d[idx][2] != idx) {
        zeros_idx.push([idx, d[idx][2]])
      } else {
        zeros_idx.push([idx])
      }
    }
  }
  console.log("zeros:", zeros_idx);
  console.log("ones:", ones_idx);
}

function getRule() {
  let new_rule = rule.slice();
  for (let i = 0; i < neighborhood.length; i++) {
    for (let j = 0; j < neighborhood.length; j++) {
      new_neighborhood[j][i] = neighborhood[i][j];
    }
  }
  new_rule[0] = 0;
  let neighborSize = int(Math.log(rule.length)/Math.log(2));
  for (let i = 0; i < rule.length; i++) {
    let binaryCode = (i >>> 0).toString(2);
    while (binaryCode.length < neighborSize) {
      binaryCode = '0' + binaryCode;
    }
    if (rule[i] == 1) {
      let matrix = [[0,0,0],[0,0,0],[0,0,0]];
      let counter = 0
      for (let nc = 0; nc < neighborhood.length; nc++) {
        let r = [];
        for (let nr = 0; nr < neighborhood[0].length; nr++) {
          if (neighborhood[nc][nr] == 1) {
            matrix[nr][nc] = int(binaryCode[neighborSize - counter - 1]);
            counter += 1;
          }
          else {
            matrix[nr][nc] = 0;
          }
        }
      }
      if (lr_symm_on) {
        new_m = makeLR(matrix);
        if (!isInNeighborhood(new_m)) {
          new_rule[countPatternIndex(matrix)] = 0;
        }
        if (leftRightSymm(matrix)) {
          new_rule[countPatternIndex(matrix)] = 0;
        } else if (isInNeighborhood(new_m)) {
          new_rule[countPatternIndex(new_m)] = 1;
        }
      }

      else if (ud_symm_on) {
        new_m = makeUD(matrix);
        if (!isInNeighborhood(new_m)) {
          new_rule[countPatternIndex(matrix)] = 0;
        }
        if (upDownSymm(matrix)) {
          new_rule[countPatternIndex(matrix)] = 0;
        } else if (isInNeighborhood(new_m)) {
          new_rule[countPatternIndex(new_m)] = 1;
        }
      }

      else if (diag_symm_on) {
        new_m = makeDiag(matrix);
        if (!isInNeighborhood(new_m)) {
          new_rule[countPatternIndex(matrix)] = 0;
        }
        if (diagonalSymm(matrix)) {
          new_rule[countPatternIndex(matrix)] = 0;
        } else if (isInNeighborhood(new_m)) {
          new_rule[countPatternIndex(new_m)] = 1;
        }
      }

    }
  }
  rule = new_rule;
}

function isInNeighborhood(matrix) {
  for (let i = 0; i < neighborhood.length; i++) {
    for (let j = 0; j < neighborhood.length; j++) {
      if (matrix[i][j] == 1 && new_neighborhood[i][j] != 1) {
        return false;
      }
    }
  }
  return true;
}

function arrayEqual(m1, m2) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (m1[i][j] != m2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function countPatternIndex(matrix) {
  cellNeighbors = [];
  for (let i = 0; i < neighborhood.length; i++) {
    for (let j = 0; j < neighborhood.length; j++) {
      new_neighborhood[j][i] = neighborhood[i][j];
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (new_neighborhood[j][i] == 1){
        if (matrix[j][i]==1) {
          cellNeighbors.push(1);
        } else {
          cellNeighbors.push(0);
        }
      }
    }
  }
  let idx = 0;
  for (let i = 0; i < cellNeighbors.length; i++) {
    idx += 2**i * cellNeighbors[i];
  }
  return idx;
}

function generateRule() {
  for (let i = 0; i < rule.length; i++) {
    rule[i] = int(random(2));
  }
  while (rule[0] == 1 && rule[rule.length - 1] == 0) {
    for (let i = 0; i < rule.length; i++) {
      rule[i] = int(random(2));
    }
  }
}

function transpose(matrix) {
  let t = [];
  for (let i = 0; i < matrix.length; i++) {
    let row = []
    for (let j = 0; j < matrix[0].length; j++) {
      row.push(0)
    }
    t.push(row)
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      t[i][j] = matrix[j][i];
    }
  }
  return t;
}

function isSymmetric(matrix, t) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] != t[i][j]) {
              return false;
            }
        }
    }
    return true;
}

function diagonalSymm(matrix) {
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
          if (matrix[i][j] != matrix[matrix[0].length - 1 - j][matrix[0].length - 1 - i]) {
            return false;
          }
      }
  }
  return true;
}

function makeDiag(matrix) {
  let new_m = [[0,0,0],
               [0,0,0],
               [0,0,0]];
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        new_m[i][j] = matrix[matrix[0].length - 1 - j][matrix[0].length - 1 - i];
      }
  }
  return new_m;
}

function leftRightSymm(matrix) {
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
          if (matrix[i][j] != matrix[i][matrix[0].length - 1 - j]) {
            return false;
          }
      }
  }
  return true;
}

function makeLR(matrix) {
  let new_m = [[0,0,0],
               [0,0,0],
               [0,0,0]];
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        new_m[i][j] = matrix[i][matrix[0].length - 1 - j];
      }
  }
  return new_m;
}

function upDownSymm(matrix) {
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
          if (matrix[i][j] != matrix[matrix[0].length - 1 - i][j]) {
            return false;
          }
      }
  }
  return true;
}

function makeUD(matrix) {
  let new_m = [[0,0,0],
               [0,0,0],
               [0,0,0]];
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        new_m[i][j] = matrix[matrix[0].length - 1 - i][j]
      }
  }
  return new_m;
}

function keyTyped() {
  if (key === 's') {
    save(canvas, 'rule_ca.png');
  }
}
