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
  }

  draw() {
    this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h);
  }

  move() {
    this.y += this.vy;
  }
}
