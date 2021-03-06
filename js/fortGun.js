class FortGun {
  constructor(ctx, x, y, vy) {
    this._ctx = ctx;
    this.x = x;
    this.y = y;
    this.vy = vy;

    this.gunW = 50;
    this.gunH = 50;

    this._img = new Image();
    this._img.src = "img/gun1.png";

    this._img.frameIndex = 4;
    this._img.frames = 9;
    this.animationCount = 0;

    this._counter = 0;

    this.bullets = [];
  }

  draw() {
    this.bullets.forEach((el) => el.draw());
    this._shoot();

    this._ctx.drawImage(
      this._img,
      (this._img.frameIndex * this._img.width) / this._img.frames,
      0,
      this._img.width / this._img.frames,
      this._img.height,
      this.x + 50,
      this.y + 110,
      this.gunW,
      this.gunH
    );
  }

  move() {
    this.y += this.vy;

    this.bullets.forEach((el) => el.move());
    // if (this.animationCount++ > 30 && (this._gun1.frameIndex > 0 && this._gun1.frameIndex < 8)) {

    //   if (this.x > this._ctx.canvas.width / 2) {

    //       this._gun1.frameIndex -= 1;
    //       this.animationCount = 0;

    //   } else {
    //     this._gun1.frameIndex += 1;
    //     this.animationCount = 0;
    //   }
    // }
  }

  isVisible() {
    return this.y < this._ctx.canvas.height;
  }

  _shoot() {
    this._counter++;

    if (this._counter++ > 200) {
      this.bullets.push(new fortBullet(this._ctx, this.x, this.y));
      this._counter = 0;
    }
  }
  _clear() {
    this.bullets = this.bullets.filter((e) => e.y < this._ctx.canvas.height);
  }
}
