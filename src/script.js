const canvas = document.getElementById('can');
canvas.height = innerHeight;
canvas.width = innerWidth;
const ctx = canvas.getContext('2d');
import { User, DotCanvas, on, emit, remove, atan, Score } from './classes.js';
import { Bullet, Asteroid, Hound, Bound } from './bullet.js';
Number.prototype.in = function (min, max) {
  return min <= this && this <= max;
};
const score = new Score(canvas);
const events = {
  drow: new Event('drow'),
  move: new Event('move'),
  touchuser: new Event('touchuser'),
  tick: new Event('tick'),
};
on('drow', () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  score.write();
});
const user = new User(canvas,events);
user.onTouch(() => {
  if (score.value > 0) score.minus();
});

let balls = [];
let a = Math.PI / 2 - 0.3;
let phase = 0;
let fence;
let engin_i = 0;
setInterval(() => {
  if (score.value === 0) return;
  emit(events.tick);
  emit(events.move);
  emit(events.drow);
}, 1000 / 20);
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
    ins = new Asteroid(user, innerWidth / 2, 0).honet(
      innerWidth,
      innerHeight
    );
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
on('tick', engins[2]);

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
