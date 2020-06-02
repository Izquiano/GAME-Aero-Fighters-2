class FortEnemy {
  constructor(ctx) {
    this._ctx = ctx;
    this.x = Math.random() * this._ctx.canvas.width;

    this.y = -200;
    this.w = 150;
    this.h = 200;
    this.vy = 3;

    this._img = new Image();
    this._img.src = "img/fort.png";

    this.gunW = 50;
    this.gunH = 50;
    this._gun1 = new Image();
    this._gun1.src = "img/gun1.png";

    this._gun1.frameIndex = 4;
    this._gun1.frames = 9;
    this.animationCount = 0;
  }

  draw() {
    this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h);

    this._ctx.drawImage(
      this._gun1,
      this.gunW * this._gun1.frameIndex,
      0,
      this._gun1.width / this._gun1.frames,
      this._gun1.height,
      this.x + this.w / 2 - this.gunW / 2,
      this.y + 120,
      this.gunW,
      this.gunH
    );
  }

  move() {
    this.y += this.vy;

    if (this.animationCount++ > 30 && (this._gun1.frameIndex > 0 && this._gun1.frameIndex < 8)) {
      if (this.x > this._ctx.canvas.width / 2) {
        
          this._gun1.frameIndex -= 1;
          this.animationCount = 0;
        
        
      } else {
        this._gun1.frameIndex += 1;
        this.animationCount = 0;
      }
    }
  }

  isVisible() {
    return this.y < this._ctx.canvas.height;
  }
}
