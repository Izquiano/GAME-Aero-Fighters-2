class Heart {
    constructor(ctx) {
      this._ctx = ctx;
      this.x = Math.random() * this._ctx.canvas.width;
  
      this.y = -200;
      this.w = 20;
      this.h = 20;
      this.vy = 5;
      this.vx = 1;
  
      this._counter = 0;
      this.direction();
      
  
      this._img = new Image();
      this._img.frames = 7;
      this._img.frameIndex = 0;
      this._img.src = 'img/heart.png'
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
      this.animation();
      
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
  
   
  }
  