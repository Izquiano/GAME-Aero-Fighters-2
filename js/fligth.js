class Fligth {
  constructor(ctx) {
    this._ctx = ctx;

    this.x = 0;
    this.y = this._ctx.canvas.height * 0.8;

    this.w = 100;
    this.h = 100;

    this.vy = 0;
    this.vx = 0;
    this.ax = 0;
    this.ay = 0;

    this.frames = 3;

    this._img = new Image();
    this._img.src = "../img/alien.png";

    this._setListeners();
  }

  draw() {
    this._ctx.drawImage(this._img, this.x , this.y, this.w, this.h);
  }
  move() {
    this.vy += this.ay;
    this.vx += this.ax;
    this.x += this.vx;
    this.y += this.vy;
  }

  _setListeners() {
    document.addEventListener("keydown", (event) => {
      if(this._inCanvas()){
        this._movements(event.keyCode);
      }
        
      
    });
    document.addEventListener("keyup", (event) => {
      this.vx = 0;
      this.vy = 0;
    });
  }

  _movements(keyCode) {
    switch (event.keyCode) {
      case RIGHT:
        this.vx += 5;
        break;
      case LEFT:
        this.vx -= 5;
        break;
      case UP:
        this.vy -= 5;
        break;
      case DOWN:
        this.vy += 5;
        break;
    }
  }
  _inCanvas(){
    console.log(this.x)
    if(this.x >= 0){
      return true

    }else{
      this.x = 0
    }
  }
  
}
