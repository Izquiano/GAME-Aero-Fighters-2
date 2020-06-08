class flightEnemiesBullet {
    constructor(ctx, x, y) {
      this._ctx = ctx
      this.x = x +50
      this.y = y +70
      this.vy = 10
      this.w = 5
      this.h = 20
      this._img = new Image()
      this._img.src = "img/enemyshoot.png"
      this._img.frameIndex = 0;
      this._img.frames = 1;
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
    
    animation(){
      this._img.frameIndex++;
    if (this._img.frameIndex >= this._img.frames) {
      this._img.frameIndex = 0;
    }
  }



    
  }
  