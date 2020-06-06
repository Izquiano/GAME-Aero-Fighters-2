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
    }
  
    draw() {
      this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h)
    }
  
    move() {
      this.y += this.vy;
    }
  }
  