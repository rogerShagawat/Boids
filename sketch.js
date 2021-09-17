/// <reference path="TSDef/p5.global-mode.d.ts" />

let flock = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  clear();
  flock.forEach((element) => {
    element.update(flock);
    element.render();
  });
}
