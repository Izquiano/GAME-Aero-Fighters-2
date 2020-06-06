class Game {
  constructor(ctx) {
    this._ctx = ctx;
    this._intervalId = null;
    this._bg = new Background(ctx);
    this._fligth = new Fligth(ctx);
    this.tick = 0;
    this._fortsEnemy = [];
    this._flightsEnemies = [];
    this.score = 0;
    this.health = 100;
  }
  start() {
    this._intervalId = setInterval(() => {
      this._clear();
      this._draw();
      this._move();
      this._addfortEnemy();
      this._clearfortEnemy();
      this._addFlightEnemy();
      this._clearFligthEnemy();

      this.tick++;
    }, 1000 / 60);
  }

  _addfortEnemy() {
    if (this.tick > 500) {
      this._fortsEnemy.push(new FortEnemy(this._ctx));
      this.tick = 0;
    }
  }
  _clearfortEnemy() {
    this._fortsEnemy = this._fortsEnemy.filter((f) => f.isVisible());
  }

  _addFlightEnemy() {
    if (this.tick % 100 == 0) {
      this._flightsEnemies.push(new fligthEnemie(this._ctx));
      console.log(this._flightsEnemies);
    }
  }
  _clearFligthEnemy() {
    this._flightsEnemies = this._flightsEnemies.filter((f) => f.isVisible());
  }
  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
  _draw() {
    this._bg.draw();
    this._fortsEnemy.forEach((o) => o.draw());
    this._flightsEnemies.forEach((o) => o.draw());
    this._fligth.draw();
    this._checkCollitions(this._fligth, this._fortsEnemy, this._flightsEnemies);
    this._drawScore();
    this._drawHealth();
  }
  _move() {
    this._bg.move();
    this._fligth.move();
    this._fortsEnemy.forEach((o) => o.move());
    this._flightsEnemies.forEach((o) => o.move());
  }
  _checkCollitions(myFlight, arrayFortsEnemy, flightsEnemies) {
    // Check collitions => My bullets to fortEnemy
    myFlight.bullets.forEach((bullet) => {
      for (let i = 0; i < arrayFortsEnemy.length; i++) {
        for (let j = 0; j < arrayFortsEnemy[i].gun.length; j++) {
          if (
            bullet.y + bullet.h / 2 > arrayFortsEnemy[i].gun[j].y + 120 &&
            bullet.y - bullet.h / 2 < arrayFortsEnemy[i].gun[j].y + 170 &&
            bullet.x + bullet.w / 2 > arrayFortsEnemy[i].gun[j].x + 50 &&
            bullet.x - bullet.w / 2 < arrayFortsEnemy[i].gun[j].x + 100
          ) {
            this.score += 25;
            myFlight.bullets = myFlight.bullets.filter(
              (element) => element != bullet
            );
            arrayFortsEnemy[i].gun = arrayFortsEnemy[i].gun.filter(
              (e) => e != e
            );
            // añadir sonido destruido
          }
        }
      }
    });

    // Check collitions => FortEnemy Bullets to myFlight
    // game._fortsEnemy[0].gun[0].bullets[0]
    arrayFortsEnemy.forEach((fort) =>
      fort.gun.forEach((gun) =>
        gun.bullets.forEach((bullet) => {
          if (
            bullet.y < myFlight.y + myFlight.h &&
            bullet.y + bullet.h > myFlight.y &&
            bullet.x < myFlight.x + myFlight.w / 2 &&
            bullet.x + bullet.w > myFlight.x - myFlight.w / 2
          ) {
            this.health -= 10;
            gun.bullets = gun.bullets.filter((el) => el != bullet);
            // Añadir sonido "tocado"
          }
        })
      )
    );
    // Check collitions => myFlight to enemyFlights
    flightsEnemies.forEach((fligtEnemy) => {
      if (
        fligtEnemy.y < myFlight.y + myFlight.h &&
        fligtEnemy.y + fligtEnemy.h > myFlight.y &&
        fligtEnemy.x < myFlight.x + myFlight.w / 2 &&
        fligtEnemy.x + fligtEnemy.w > myFlight.x - myFlight.w / 2
      ) {
        this.health = 0;
        this._flightsEnemies = this._flightsEnemies.filter((el) => el != fligtEnemy);
        // Añadir sonido "tocado"
        // Boom!!!!
      }
    });
    // Check collitions => myFlight to enemyFlightsBullets
    flightsEnemies.forEach((fligtEnemy) => {
      fligtEnemy.bullets.forEach((bullet) =>{
        if (
          bullet.y < myFlight.y + myFlight.h &&
          bullet.y + bullet.h > myFlight.y &&
          bullet.x < myFlight.x + myFlight.w / 2 &&
          bullet.x + bullet.w > myFlight.x - myFlight.w / 2
        ){
          this.health -= 10;
          fligtEnemy.bullets = fligtEnemy.bullets.filter((el) => el != bullet);

        }
      })
      
    });
     // Check collitions => myBullets to enemyFlights
     flightsEnemies.forEach((fligtEnemy) => {
      myFlight.bullets.forEach((bullet) => {
        if (
          fligtEnemy.y < bullet.y + bullet.h &&
          fligtEnemy.y + fligtEnemy.h > bullet.y &&
          fligtEnemy.x < bullet.x + bullet.w  &&
          fligtEnemy.x + fligtEnemy.w > bullet.x - bullet.w
        ){
          this.health += 20;
          this._flightsEnemies = this._flightsEnemies.filter((el) => el != fligtEnemy);
          myFlight.bullets = myFlight.bullets.filter( (el) => el != bullet)
        // Añadir sonido "tocado"
        // Boom!!!!
        }

      })
      
        
      
      
    });
  }
  _drawScore() {
    SCORE.innerHTML = `${this.score}`;
  }
  _drawHealth() {
    HEALTH.innerHTML = `${this.health}`;
    let myHealth = document.querySelector('#healthBar > div')
    myHealth.style.width = this.health + '%'
  }
}
