class Game {
  constructor(ctx) {
    this._ctx = ctx;
    this._intervalId = null;
    this._bg = new Background(ctx);
    this._fligth = new Fligth(ctx);
    this.tick = 0;
    this._fortsEnemy = [];
    this.score = 0;
  }
  start() {
    this._intervalId = setInterval(() => {
      this._clear();
      this._draw();
      this._move();
      this._addfortEnemy();
      this._clearfortEnemy();
      this.tick++;
    }, 1000 / 60);
  }

  _clearfortEnemy() {
    this._fortsEnemy = this._fortsEnemy.filter((f) => f.isVisible());
  }

  _addfortEnemy() {
    if (this.tick > 500) {
      this._fortsEnemy.push(new FortEnemy(this._ctx));
      this.tick = 0;
    }
  }
  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
  _draw() {
    this._bg.draw();
    this._fortsEnemy.forEach((o) => o.draw());
    this._fligth.draw();
    this._checkCollitions(this._fligth, this._fortsEnemy);
    this._drawScore();
  }
  _move() {
    this._bg.move();
    this._fligth.move();
    this._fortsEnemy.forEach((o) => o.move());
  }
  _checkCollitions(myFlight, arrayFortsEnemy, myBullets) {
    // Check collitions => My bullets to fortEnemy
    myFlight.bullets.forEach((bullet) => {
      for (let i = 0; i < arrayFortsEnemy.length; i++) {
        
        for (let j = 0; j < arrayFortsEnemy[i].gun.length; j++) {
            
            
          if ( 
              
              
            bullet.y + bullet.h / 2 > arrayFortsEnemy[i].gun[j].y + 120 
            &&
            bullet.y - bullet.h / 2 < arrayFortsEnemy[i].gun[j].y + 170
             &&
            bullet.x + bullet.w / 2 < arrayFortsEnemy[i].gun[j].x + 110 
            &&
            bullet.x - bullet.w / 2 > arrayFortsEnemy[i].gun[j].x - 110
          ) {

            
            this.score += 50;
            myFlight.bullets = myFlight.bullets.filter(
              (element) => element != bullet
            );
            arrayFortsEnemy[i].gun = arrayFortsEnemy[i].gun.filter(
              (e) => e != e
            );
          }
          
        }
      }
    });
  }
  _drawScore() {
    SCORE.innerHTML = `${this.score}`;
  }
}
