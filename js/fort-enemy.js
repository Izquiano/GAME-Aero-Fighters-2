class FortEnemy {
  constructor(ctx) {
    this._ctx = ctx;
    this.x = Math.random() * this._ctx.canvas.width;

    this.y = -200;
    this.w = 150;
    this.h = 200;
    this.vy = 1;
    
    this.gun = [ new FortGun(this._ctx, this.x, this.y, this.vy) ]
    

    this._img = new Image();
    this._img.src = "img/fort.png";

   
  }

  draw() {
    this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h);

    this.gun.forEach(e => {
      
      e.draw()}
      )
    
  }

  move() {
    this.y += this.vy;
    this.gun.forEach(e => e.move())

    
  }

  isVisible() {
    return this.y < this._ctx.canvas.height;
  }
}
