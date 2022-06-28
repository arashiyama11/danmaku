import { DotCanvas, on, atan, emit } from './classes.js';
const views = {
  ball: {
    size: 16,
    colors: ['white', 'erase'],
    display: [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
};
export class Bullet {
  constructor(user, x, y) {
    this.events = user.events;
    this.user = user;
    this.canvas = user.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.dotCanvas = new DotCanvas(this.canvas);
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.view = views.ball;
    this.speed = 3;
    this.delete = false;
    let d = this.drow.bind(this);
    this.phase = 0;
    this.out = false;
    this.outing = false;
    this.outTime = 0;
    on('drow', d);
    on('move', this.move.bind(this));
    on('tick', () => {
      if (this.delete) return;
      this.onWall();
      this.isTouchUser();
      this.out =
        this.x < 0 ||
        this.x > window.innerWidth ||
        this.y < 0 ||
        this.y > window.innerHeight;
    });
  }
  isTouchUser() {
    if (
      this.x.in(this.user.x - 7, this.user.x + 7) &&
      this.y.in(this.user.y - 7, this.user.y + 7)
    ) {
      emit(this.events.touchuser);
      this.delete = true;
    }
  }
  drow() {
    if (this.delete) return;
    this.dotCanvas.import(this.view, this.x, this.y * -1 + innerHeight, 5);
  }
  move() {
    if (this.delete) return;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }
  honet(x, y) {
    this.angle = atan(x - this.x, y - this.y);
    return this;
  }
  onWall() {
    if (
      this.outing &&
      0 < this.x &&
      this.x < innerWidth &&
      0 < this.y &&
      this.y < innerHeight
    ) {
      this.outing = false;
      return;
    }
    if (this.outing || !this.out) return;
    this.outTime++;
    if (this.x > innerWidth) {
      this.angle =
        Math.atan((Math.sin(this.angle) / Math.cos(this.angle)) * -1) + Math.PI;
    } else if (Math.PI / 2 <= this.angle && this.angle <= (Math.PI / 2) * 3) {
      if (this.x <= 0) {
        this.angle = Math.atan(
          (Math.sin(this.angle) / Math.cos(this.angle)) * -1
        );
      } else
        this.angle =
          Math.atan((Math.sin(this.angle) / Math.cos(this.angle)) * -1) +
          Math.PI;
    } else
      this.angle = Math.atan(
        (Math.sin(this.angle) / Math.cos(this.angle)) * -1
      );
    this.outing = true;
  }
}

export class Hound extends Bullet {
  constructor(u, x, y, events, t) {
    super(u, x, y, events);
    this.type = t;
    this.view =
      '{"size":16,"colors":["erase","red","grey","black","red","orange","yellow","lime","green","darkgreen","blue","midnightblue","purple"],"display":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}';
  }
  onWall() {
    if (this.phase == 1) return;
    super.onWall();
  }

  honet(x, y) {
    if (this.phase === 0 && this.type === 0) {
      super.honet(
        innerWidth / 2 +
          (Math.random() - 0.5) * 10 +
          150 * Math.sign(this.x - x),
        innerHeight
      );
      this.speed = 5;
      this.phase = 1;
      setTimeout(() => {
        this.phase = 2;
      }, 2500);
      return this;
    }

    if (this.type === 1 && this.phase === 0) {
      super.honet(x, y);
      this.phase = 2;
      setTimeout(() => {
        this.phase = 3;
      }, 5000);
    }
    if (this.phase === 1) {
      setTimeout(() => {
        this.phase = 3;
      }, 10000);
    }
    if (this.phase == 1 || this.phase == 3) return;
    if (this.speed > 1) this.speed -= 0.05;
    let moveAngle = atan(x - this.x, y - this.y) - this.angle;
    //if (moveAngle.in(-0.1, 0.1)) this.f = 2;
    let n = 0.05;
    if (Math.abs(moveAngle) > n) {
      if (moveAngle.in(0, Math.PI)) {
        this.angle += n;
      } else {
        this.angle -= n;
      }
      if (this.angle >= Math.PI * 2) this.angle -= Math.PI * 2;
      if (this.angle <= 0) this.angle += Math.PI * 2;
    } else super.honet(x, y);
    return this;
  }
}
export class Asteroid extends Bullet {
  honet(x, y) {
    if (this.phase === 0) {
      //super.honet(innerWidth * Math.random(), y);
      super.honet(x, y);
      this.phase = 1;
    } else {
      super.honet(x, y);
    }
    return this;
  }
  onWall() {
    if (this.out) this.delete = true;
  }
}
export class Bound extends Bullet {
  onWall() {
    if (this.outTime === 10) this.delete = true;
    super.onWall();
  }
}
