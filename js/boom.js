class Boom {
  constructor(element) {
    this._ctx = element._ctx;
    this.x = element.x;
    this.y = element.y;
    this.w = element.w;
    this.h = element.h;
    this._img = new Image();
    this._img.src = "img/explosionGrande.png";
    this._img.frames = 8;
    this._img.frameIndex = 0;
    this.counter = 0;

    
  }

  draw() {
    this.counter++;
    if (this.counter > 100) {
      this.counter = 0;
    }
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
    this.animation();
  }

  animation() {
    if (this.counter % 2 == 0) {
      if (this._img.frameIndex <= this._img.frames) {
        this._img.frameIndex++;
      }
    }
  }
}
