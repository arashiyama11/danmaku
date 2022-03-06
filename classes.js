export const on = (n, fn) => document.addEventListener(n, fn);
export const emit = (e) => document.dispatchEvent(e);
export const remove = (n, fn) => document.removeEventListener(n, fn);
export const atan = (x, y) => {
  if (x === 0 && y === 0) {
    return 0;
  }
  if (x === 0) {
    if (y > 0) {
      return Math.PI / 2;
    }
    return (Math.PI * 3) / 2;
  }
  if (x < 0) {
    return Math.atan(y / x) + Math.PI;
  }
  let t = Math.atan(y / x);
  if (t > 0) return t;
  if (t == 0) return 0;
  return Math.PI * 2 + t;
};
const views = {
  user: {
    size: 16,
    colors: ['erase', 'red'],
    display: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  olduser: {
    size: 16,
    colors: ['blue', 'erase', 'red'],
    display: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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

export class User {
  constructor(canvas) {
    this.x = window.innerWidth / 2;
    this.y = (window.innerHeight * 1.2) / 2;
    this.speed = 5;
    this.view = views.user;
    this.canvas = canvas;
    this.dotCanvas = new DotCanvas(canvas, 1);
    this.key = [];
    this.angle = 1;
    on('drow', this.drow.bind(this));
    on('touchuser', this.touchUser.bind(this));
    window.addEventListener('keydown', (e) => {
      if (this.key.includes(e.key)) return;
      this.key.push(e.key);
      this.key = this.key.filter(
        (k) => k != { d: 'a', s: 'w', a: 'd', w: 's' }[e.key]
      );
    });
    window.addEventListener('keyup', (e) => {
      this.key = this.key.filter((k) => k != e.key);
    });
    on('tick', () => {
      if (this.key.length === 0) return;
      for (const k of this.key) {
        switch (k) {
          case 'ArrowRight':
            this.x += this.speed;
            break;
          case 'd':
            this.x += this.speed;
            break;
          case 'ArrowLeft':
            this.x -= this.speed;
            break;
          case 'a':
            this.x -= this.speed;
            break;
          case 'ArrowUp':
            this.y -= this.speed;
            break;
          case 'w':
            this.y += this.speed;
            break;
          case 'ArrowDown':
            this.y += this.speed;
            break;
          case 's':
            this.y -= this.speed;
            break;
        }
      }
      if (this.x < 0) this.x = 0;
      if (this.x > innerWidth) this.x = innerWidth;
      if (this.y < 0) this.y = 0;
      if (this.y > innerHeight) this.y = innerHeight;
    });
  }
  drow() {
    this.dotCanvas.import(
      this.view,
      this.x - 5,
      (this.y + 5) * -1 + innerHeight,
      1
    );
  }
  touchUser() {
    console.log('touch');
  }
}
export class Ball {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dotCanvas = new DotCanvas(canvas);
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
export class DotCanvas {
  /**
   * @param {HTMLCanvasElement} canvas ドット絵を表示・作成するcanvasを指定
   * @param {number} size ドット絵の解像度を指定します
   */
  constructor(canvas, size) {
    this.backgroundColor = 'black';
    this.canvas = canvas;
    this.size = size;
    this.display = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
    this.pixcel = this.canvas.width / this.size;
    this.colors = [
      'erase',
      'white',
      'grey',
      'black',
      'red',
      'orange',
      'yellow',
      'lime',
      'green',
      'darkgreen',
      'blue',
      'midnightblue',
      'purple',
    ];
    this.color = 5;
    this.click = false;
    this.grid = 0;
    this.ctx = this.canvas.getContext('2d');
    this.canvasMousemoveEvent = (e) => {
      this.mouseX = Math.floor(e.offsetX / this.pixcel);
      this.mouseY = Math.floor(e.offsetY / this.pixcel);
      if (this.click) {
        this.display[this.mouseX][this.mouseY] = this.color;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
        this.drowAllPixcel();
      }
    };
    this.canvasTouchmoveEvent = (e) => {
      let tgt = e.touches[0].target.getBoundingClientRect();
      this.mouseX = Math.floor((e.touches[0].pageX - tgt.top) / this.pixcel);
      this.mouseY = Math.floor((e.touches[0].pageY - tgt.left) / this.pixcel);
      if (
        this.mouseX < 0 ||
        this.mouseY < 0 ||
        this.size - 1 < this.mouseX ||
        this.size - 1 < this.mouseY
      )
        return;
      this.display[this.mouseX][this.mouseY] = this.color;
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
      this.drowAllPixcel();
    };

    this.canvasClickEvent = () => {
      this.display[this.mouseX][this.mouseY] = this.color;
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
      this.drowAllPixcel();
    };
    this.canvasMousedownEvent = () => {
      this.click = true;
    };
    this.canvasMouseupEvent = () => {
      this.click = false;
    };
    this.canvas.addEventListener('mousemove', this.canvasMousemoveEvent);
    this.canvas.addEventListener('touchmove', this.canvasTouchmoveEvent);
    this.canvas.addEventListener('click', this.canvasClickEvent);
    this.canvas.addEventListener('mousedown', this.canvasMousedownEvent);
    this.canvas.addEventListener('mouseup', this.canvasMouseupEvent);
    this.toReadOnly();
  }
  set setBackGroundColor(num) {
    this.backgroundColor = `rgb(${num},${num},${num})`;
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
    this.drowAllPixcel();
  }
  gridPlus() {
    this.grid++;
    if (this.grid === 3) {
      this.grid = 0;
    }
    switch (this.grid) {
      case 0:
        this.drowGrid();
        break;
      case 1:
        this.disableGild();
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(0, 0, this.canvas.height, this.canvas.width);
        break;
      case 2:
        this.disableGild();
    }
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
    this.drowAllPixcel();
  }
  toReadOnly() {
    this.canvas.removeEventListener('mousemove', this.canvasMousemoveEvent);
    this.canvas.removeEventListener('touchmove', this.canvasTouchmoveEvent);
    this.canvas.removeEventListener('click', this.canvasClickEvent);
    this.canvas.removeEventListener('mousedown', this.canvasMousedownEvent);
    this.canvas.removeEventListener('mouseup', this.canvasMouseupEvent);
    this.grid = 2;
    this.disableGild();
    return this;
  }
  drowGrid() {
    let cs = this.canvas.width;
    let pixcel = cs / this.size;
    this.ctx.strokeStyle = 'black';
    for (let i = 0; i <= this.size; i++) {
      let y = pixcel * i;
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(cs, y);
    }
    for (let i = 0; i <= this.size; i++) {
      let x = pixcel * i;
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, cs);
    }
    this.ctx.stroke();
    return this;
  }
  disableGild() {
    this.drowAllPixcel();
    return this;
  }
  drowAllPixcel(offsetX = 0, offsetY = 0) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.fillDot(i, j, this.display[i][j], offsetX, offsetY);
      }
    }
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.strokeStyle = 'black';
    if (this.grid === 0) {
      this.drowGrid();
    } else if (this.grid === 1) {
      this.ctx.strokeRect(0, 0, this.canvas.height, this.canvas.width);
    }
  }
  fillDot(x, y, color, offsetX, offsetY) {
    if (this.colors[color] === 'erase') return;
    this.ctx.fillStyle = this.colors[color];
    this.ctx.strokeStyle = this.colors[color];
    this.ctx.fillRect(
      x * this.pixcel + offsetX,
      y * this.pixcel + offsetY,
      this.pixcel,
      this.pixcel
    );
    this.ctx.strokeRect(
      x * this.pixcel + offsetX,
      y * this.pixcel + offsetY,
      this.pixcel,
      this.pixcel
    );
  }
  /**
   * @param {object} option
   * compression(boolean):圧縮して出力するか
   * json(boolean):jsonで出力するか
   */
  export(option) {
    if (option?.compression) {
      let usedcolor = [];
      for (let color of this.display.flat()) {
        if (!usedcolor.includes(color)) {
          usedcolor.push(color);
        }
      }
      let colors = usedcolor.map((v) => this.colors[v]);
      let links = colors.map((v) => this.colors.indexOf(v));
      links.forEach((v, i, a) => {
        a[v] = i;
      });
      let dis = this.display.map((line) => {
        return line.map((v) => links[v]);
      });
      let obj = {
        size: this.size,
        colors: colors,
        display: dis,
      };
      if (option?.json) {
        return JSON.stringify(obj);
      }
      return obj;
    }
    if (option?.json) {
      return JSON.stringify({
        size: this.size,
        colors: this.colors,
        display: this.display,
      });
    }
    return {
      size: this.size,
      colors: this.colors,
      display: this.display,
    };
  }
  /**
   * @param {string} data dotCanvasクラスでexportされたJSON文字列あるいはオブジェクト
   * @param {number} offsetX x軸方向の描画の起点の座標
   * @param {number} offsetY y軸方向の描画の起点の座標
   * @param {number} pixcelSize 一つのピクセルの大きさ
   */
  import(data, offsetX = 0, offsetY = 0, pixcelSize) {
    let d = typeof data === 'string' ? JSON.parse(data) : data;
    if (
      d.display
        .map((a) => a.length)
        .map((n) => n === d.size)
        .includes(false) ||
      d.display.length !== d.size
    ) {
      console.log('missmatch');
      return this;
    }
    this.colors = d.colors;
    this.display = d.display;
    this.size = d.size;
    this.pixcel =
      pixcelSize === undefined ? this.canvas.width / this.size : pixcelSize;
    this.drowAllPixcel(offsetX, offsetY);
    return this;
  }
  getAllImgData() {
    let s = this.size;
    let oldData = this.export();
    let elm = buildElement('canvas', {
      height: s,
      width: s,
    });
    let d = new dotCanvas(elm).import(oldData, 1).toReadOnly();
    return elm.getContext('2d').getImageData(0, 0, s, s);
  }
}
