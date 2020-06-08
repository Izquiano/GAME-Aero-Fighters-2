class FligthEnemie {
  constructor(ctx) {
    this._ctx = ctx;
    this.x = Math.random() * this._ctx.canvas.width;

    this.y = -200;
    this.w = 100;
    this.h = 70;
    this.vy = 4;
    this.vx = 2;

    this._counter = 0;
    this.direction();
    this.bullets = [];

    this._img = new Image();
    let ramdom = Math.floor(Math.random() * 3);
    this.enemiesImg = [
      "img/enemyFligth.png",
      "img/enemyFligth2.png",
      "img/enemyFligth3.png",
    ];

    this._img.frames = 1;
    this._img.frameIndex = 0;
    this._img.src = this.enemiesImg[ramdom];
  }

  draw() {
    this._ctx.drawImage(
      this._img,
      (this._img.frameIndex * this._img.width) / this._img.frames,
      0,
      this._img.width / this._img.frames,
      this._img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this._shoot();

    this.bullets.forEach((el) => el.draw());
  }

  move() {
    this.animation();
    this.bullets.forEach((el) => el.move());
    this.y += this.vy;
    this.x += this.vx;
  }

  animation() {
    this._img.frameIndex++;
    if (this._img.frameIndex >= this._img.frames) {
      this._img.frameIndex = 0;
    }
  }
  isVisible() {
    return this.y < this._ctx.canvas.height;
  }
  direction() {
    if (this.x > this._ctx.canvas.width / 2) {
      this.vx = -2;
    }
  }

  _shoot() {
    this._counter++;

    if (this._counter++ > 50) {
      this.bullets.push(new flightEnemiesBullet(this._ctx, this.x, this.y));
      this._counter = 0;
    }
  }
}
