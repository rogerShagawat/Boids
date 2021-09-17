/// <reference path="TSDef/p5.global-mode.d.ts" />

class Boid {
  constructor(pos = createVector(random(width), random(height)), heading = p5.Vector.random2D()) {
    this.pos = pos;
    this.heading = heading;
    this.speed = 2;
    this.site_radius = 50;
    this.locals = [];
    this.max_force = 1;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  seperation() {}

  alignment() {
    let total = 0;
    let steer_target = this.heading.copy();
    for (let other of this.locals) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < this.site_radius) {
        steer_target.add(other.heading);
        total++;
      }
    }
    if (total > 0) {
      steer_target.div(total);
      steer_target.limit(this.max_force);
      //   steer_target.sub(this.heading);
    }
    return steer_target;
  }

  cohesion() {
    let total = 0;
    let steer_target = this.heading.copy();
    for (let other of this.locals) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < this.site_radius) {
        steer_target.add(other.pos);
        total++;
      }
    }
    if (total > 0) {
      steer_target.div(total);
      steer_target.limit(this.max_force);
      //   steer_target.sub(this.heading);
    }
    return steer_target;
  }

  findLocals(flock) {
    for (let other of flock) {
      if (other != this) {
        this.locals.push(other);
      }
    }
  }

  update(flock) {
    this.findLocals(flock);

    // this.seperation();
    let alignment = this.alignment();
    let cohesion =  this.cohesion();

    this.heading = alignment;
    this.heading.normalize();

    this.pos.add(this.heading.copy().setMag(this.speed));

    this.locals = [];
    this.edges();
  }

  render() {
    ellipse(this.pos.x, this.pos.y, 10);
    stroke(255);
    line(this.pos.x, this.pos.y, this.pos.x + 50 * this.heading.x, this.pos.y + 50 * this.heading.y);
  }
}
