class fortBullet {
  constructor(ctx, x, y) {
    this._ctx = ctx;
    this.x = x + 70;
    this.y = y + 130;
    this.vy = 10;
    this.w = 10;
    this.h = 10;
    this._img = new Image();
    this._img.src = "img/fortshoot.png";
    this._img.frames = 1;
    this._img.frameIndex = 0;

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
  }

  move() {
    this.animation()
    this.y += this.vy;
  }
  animation() {
    this._img.frameIndex++;
    if (this._img.frameIndex >= this._img.frames) {
      this._img.frameIndex = 0;
    }
  }
}
