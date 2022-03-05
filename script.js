const canvas = document.getElementById('can');
canvas.height = innerHeight;
canvas.width = innerWidth;
const ctx = canvas.getContext('2d');
import { User, DotCanvas, on, emit, Ball, atan } from './classes.js';
Number.prototype.in = function (min, max) {
  return min <= this && this <= max;
};
const events = {
  drow: new Event('drow'),
  move: new Event('move'),
  touchuser: new Event('touchuser'),
  tick: new Event('tick'),
};
on('drow', () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, innerWidth, innerHeight);
});
const user = new User(canvas);
user.drow();
class Hound extends Ball {
  constructor(c, x, y, t) {
    super(c, x, y);
    this.type = t;
    this.view =
      '{"size":16,"colors":["erase","red","grey","black","red","orange","yellow","lime","green","darkgreen","blue","midnightblue","purple"],"display":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}';
  }
  onWall() {
    if (this.phase == 1) return;
    super.onWall();
  }
  isTouchUser() {
    if (this.x.in(user.x - 3, user.x + 20) && this.y.in(user.y - 20, user.y)) {
      emit(events.touchuser);
      this.delete = true;
    }
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
class Asteroid extends Ball {
  isTouchUser() {
    if (this.x.in(user.x - 3, user.x + 20) && this.y.in(user.y - 20, user.y)) {
      emit(events.touchuser);
      this.delete = true;
    }
  }
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

let balls = [];
let fence = Array(63)
  .fill(0)
  .map((_, i) => {
    let ins = new Asteroid(
      canvas,
      150 * Math.cos(i / 10) + innerWidth / 2,
      150 * Math.sin(i / 10) + innerHeight / 2
    );
    ins.speed = 0.1;
    ins.honet(innerWidth / 2, innerHeight / 2);

    return ins;
  });
let a = Math.PI / 2 - 0.3;

setInterval(() => {
  emit(events.tick);
  emit(events.move);
  emit(events.drow);
}, 1000 / 20);

on('tick', () => {
  a += Math.PI / 3 - 0.01;
  let ins = new Asteroid(canvas, innerWidth / 2, innerHeight / 2);
  ins.angle = a;
  ins.speed = 5;
  balls.push(ins);
  balls = balls.filter((ball) => !ball.delete);
});

/*
{
  let b = 0;
  let c = 0;
  let d = 0;
  let b2 = 0;
  let c2 = innerWidth;
  let d2 = 0;
  setInterval(() => {
    if (d % 2 === 0) {
      c += 10;
    } else {
      c -= 10;
    }
    if (c > innerWidth || c < 0) d++;
    if (++b % 5 === 0)
      balls.push(new Asteroid(canvas, innerWidth, 0).honet(c, innerHeight));
    if (d2 % 2 === 0) {
      c2 += 10;
    } else {
      c2 -= 10;
    }
    if (c2 > innerWidth || c2 < 0) d2++;
    if (++b2 % 5 === 0)
      balls.push(new Asteroid(canvas, 0, 0).honet(c2, innerHeight));
    emit(events.drow);
    emit(events.move);
    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      if (ball.outTime === 1) ball.delete = true;
      if (ball.delete) {
        balls[i] = undefined;
        balls = balls.filter((v) => v != undefined);
      }
    }
  }, 1000 / 20);
}
/*
setInterval(() => {
  if (++a % 2 === 0 && balls.length < 100){
    if(Math.random()<0.5){
      balls.push(
        new Haund(
          canvas,
          Math.random() < 0.5 ? 10 : innerWidth - 10,
          0,
          //Math.round(Math.random())
          0
        )
      );
    }else{
      balls.push(new Asteroid(canvas,innerWidth/2,1))
    }
  }
    
  a = a % 2;
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.honet(user.x, user.y);
    ball.move();
    if (ball.delete) {
      balls[i] = undefined;
      balls = balls.filter((v) => v != undefined);
    }
  }
  emit('drow');
}, 1000 / 30);
*/
