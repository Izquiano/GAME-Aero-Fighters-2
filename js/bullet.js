class Bullet {
    constructor(ctx, x, y){
        this._ctx = ctx
        this.x = x -5
        this.y = y -7
        // this.r = 5
         this.vy = -10
        this.w = 10  
        this.h = 14
        this._img = new Image()
        this._img.src = "img/shoot.png"
    }
    draw() {
        this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h)
        // this._ctx.beginPath();
        // this._ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        // this._ctx.fill();
        // this._ctx.closePath()
      }
    
      move() {
        this.y += this.vy
      }
}