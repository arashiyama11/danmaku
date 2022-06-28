const canvas = document.getElementById('can');
canvas.height = innerHeight;
canvas.width = innerWidth;
const ctx = canvas.getContext('2d');
import {
  User,
  DotCanvas,
  on,
  emit,
  remove,
  atan,
  Score,
  PressSpaceToStart,
} from './classes.js';
import { Bullet, Asteroid, Hound, Bound } from './bullet.js';
Number.prototype.in = function (min, max) {
  return min <= this && this <= max;
};
let isStarted = false;
let score = new Score(canvas);
let psts = new PressSpaceToStart(canvas);
const events = {
  drow: new Event('drow'),
  move: new Event('move'),
  touchuser: new Event('touchuser'),
  tick: new Event('tick'),
};
on('drow', () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  if (isStarted) score.write();
});
const user = new User(canvas, events);
user.onTouch(() => {
  if (score.value > 0) score.minus();
});

addEventListener('keydown', ({ key }) => {
  if (key !== ' ' || isStarted) return;
  isStarted = true;
  on('tick', engins[0]);
  setInterval(() => {
    if(score.value===0)return
    emit(events.tick);
    emit(events.move);
    emit(events.drow);
  }, 1000 / 20);
});
let balls = [];
let a = Math.PI / 2 - 0.3;
let phase = 0;
let fence;
let engin_i = 0;
let x = 0;
let engins = [
  () => {
    if (fence === undefined) {
      fence = Array(63)
        .fill(0)
        .map((_, i) => {
          let ins = new Asteroid(
            user,
            130 * Math.cos(i / 10) + innerWidth / 2,
            130 * Math.sin(i / 10) + innerHeight / 2
          );
          ins.speed = 0.1;
          ins.honet(innerWidth / 2, innerHeight / 2);
          return ins;
        });
      setTimeout(() => {
        fence.forEach((f) => {
          f.speed = -20;
        });
        remove('tick', engins[0]);
        on('tick', engins[1]);
      }, 40 * 1000);
    }
    a += Math.PI / 3 - 0.01;
    let ins = new Asteroid(user, innerWidth / 2, innerHeight / 2);
    ins.angle = a;
    ins.speed = 5;
    balls.push(ins);
    balls = balls.filter((ball) => !ball.delete);
  },
  () => {
    let fence = [];
    let ins = new Asteroid(user, innerWidth / 2, 0).honet(0, innerHeight);
    ins.speed = 15;
    fence.push(ins);
    ins = new Asteroid(user, innerWidth / 2, 0).honet(innerWidth, innerHeight);
    ins.speed = 15;
    fence.push(ins);
    if (phase === 0) {
      x += 10;
      ins = new Asteroid(user, innerWidth / 2, 0).honet(x, innerHeight);
      ins.speed = 15;
      if (x > innerWidth * 0.9) {
        x = innerWidth;
        phase = 0.5;
        setTimeout(() => {
          phase = 1;
        }, 800);
      }
    }
    if (phase === 1) {
      ins = new Asteroid(user, innerWidth / 2, 0).honet(user.x - 0.1, user.y);
      ins.speed = 15;
      setTimeout(() => {
        remove('tick', engins[1]);
        on('tick', engins[2]);
      }, 20000);
    }
  },
  () => {
    balls = [];
    if (++engin_i % 5 === 0)
      balls.push(
        new Bound(user, innerWidth / 2, innerHeight / 2).honet(user.x, user.y)
      );
    /*
    setTimeout(() => {
      remove('tick', engins[2]);
    }, 2000);*/
  },
];
