const canvas = document.querySelector(".canvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, width, height);

let boid_pos_arr = [];
let boid_heading_arr = [];
let boid_count = 10;

function vecMag([x, y]) {
  return Math.sqrt(x * x + y * y);
}

function vecDiv([x, y], scalar) {
  return [x / scalar, y / scalar];
}

function vecMult([x, y], scalar) {
  return [x * scalar, y * scalar];
}

function vecNorm([x, y]) {
  return vecDiv([x, y], vecMag([x, y]));
}

function vecAdd([x1, y1], [x2, y2]) {
  return [x1 + x2, y1 + y2];
}

function genereateBoids(boid_count, max_x_pos, max_y_pos) {
  for (let i = 0; i < boid_count; i++) {
    boid_pos_arr[i] = [Math.random() * max_x_pos, Math.random() * max_y_pos];
    boid_heading_arr[i] = vecNorm([Math.random() - 0.5, Math.random() - 0.5]); //possible that heading can be 0 which is bad
  }
  console.log("Boid Pos: " + boid_pos_arr.toString());
  console.log("Boid Heading: " + boid_heading_arr.toString());
}

function constrain([x, y], min_x, max_x, min_y, max_y) {
  if (x > max_x) {
    x = min_x + x - max_x;
  } else if (x < min_x) {
    x = max_x + x - min_x;
  }
  if (y > max_y) {
    y = min_y + y - max_y;
  } else if (y < min_y) {
    y = max_y + y - min_y;
  }
  return [x, y];
}

function distanceSquared([x1, y1], [x2, y2]) {
  return (x2 - x1) ** 2 + (y1 - y2) ** 2;
}

function vecBetween ([x1,y1], [x2,y2]) {
    return vecNorm[x2-x1, y2-y1]
}

function seperation (index, locals, boid_pos_arr) {
    
}

function getLocals(index, boid_pos_arr, site_radius) {
  let locals = [];
  let bird = boid_pos_arr[index];
  for (let i = 0; i < boid_pos_arr.length; i++) {
    if (site_radius ** 2 <= distanceSquared(bird, [boid_pos_arr[i][0], boid_pos_arr[i][1]])) {
        locals.push(i);
    }
  }
  return locals;
}

function updateBoids() {
  let speed = 0.5;
  let site_radius = 50;
  for (let i = 0; i < boid_count; i++) {
    //update position
    boid_pos_arr[i] = constrain(vecAdd(boid_pos_arr[i], vecMult(boid_heading_arr[i], speed)), 0, width, 0, height);

    //update heading
    getLocals(i, boid_pos_arr, site_radius)
  }
}

function drawBoids() {
  for (let i = 0; i < boid_count; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(boid_pos_arr[i][0] - 5, boid_pos_arr[i][1] - 5, 10, 10);
    // heading line
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(boid_pos_arr[i][0], boid_pos_arr[i][1]);
    ctx.lineTo(boid_pos_arr[i][0] + boid_heading_arr[i][0] * 20, boid_pos_arr[i][1] + boid_heading_arr[i][1] * 20);
    ctx.stroke();

    // ctx.rect(i, i, 5, 5);
  }
  //   console.log("Done!");
}

function update() {
  updateBoids();
}

function draw() {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  drawBoids();
}

function init() {
  genereateBoids(100, width, height);
  boid_count = boid_pos_arr.length;
}

// Game Loop Stuff
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
  // Calculate the numb   er of seconds passed since the last frame
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Calculate fps
  fps = Math.round(1 / secondsPassed);

  // Draw number to the screen
  // ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, 200, 100);

  // Perform the drawing operation
  update();
  draw();

  //FPS STUFF
  //   ctx.font = "25px Arial";
  //   ctx.fillStyle = "white";
  //   ctx.fillText("FPS: " + fps, 10, 30);

  // The loop function has reached it's end. Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}

init();
gameLoop();
