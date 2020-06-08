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
    this.boom = false;
    this.boomArray = [];
    this.giftsArray = []
    this.heartsArray = []

    this.audioBoom = new Audio("sounds/boom.mp3");
    this.fortBoom = new Audio("sounds/fortBoom.mp3");
    this.shootMe = new Audio("sounds/Shootme.mp3");
    this.heartBoing = new Audio("sounds/heart.mp3");
    this.moneyBoing = new Audio("sounds/money.mp3");
    // this.audio.loop = true
  }
  start() {
    this._intervalId = setInterval(() => {
      this._clear();
      this._clearBoom();
      this._draw();
      this._move();
      this._addfortEnemy();
      this._clearfortEnemy();
      this._addFlightEnemy();
      this._clearFligthEnemy();
      this._addGift()
      this._addHeart()
      this._clearGift()

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
      this._flightsEnemies.push(new FligthEnemie(this._ctx));
    }
  }
  _clearFligthEnemy() {
    this._flightsEnemies = this._flightsEnemies.filter((f) => f.isVisible());
  }

  _addGift(){
    if (this.tick % 200 == 0) {
      this.giftsArray.push(new Gift(this._ctx));
    }
  }
  _clearGift(){
    if (this.tick % 200 == 0) {
      this.giftsArray = this.giftsArray.filter((f) => f.isVisible())
    }
  }

  _addHeart(){
    if (this.tick % 300 == 0) {
      this.heartsArray.push(new Heart(this._ctx));
    }
  }
  _clearHeart(){
    if (this.tick % 300 == 0) {
      this.heartsArray = this.heartsArray.filter((f) => f.isVisible())
    }
  }

  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
  _draw() {
    this._bg.draw();
    this._fortsEnemy.forEach((o) => o.draw());
    this._flightsEnemies.forEach((o) => o.draw());
    this.giftsArray.forEach((o) => o.draw());
    this.heartsArray.forEach((o) => o.draw());
    this._fligth.draw();

    this._checkCollitions(this._fligth, this._fortsEnemy, this._flightsEnemies);
    this.boomArray.forEach((o) => o.draw());
    this._drawScore();
    this._drawHealth();
  }
  _move() {
    this._bg.move();
    this._fligth.move();
    this._fortsEnemy.forEach((o) => o.move());
    this._flightsEnemies.forEach((o) => o.move());
    this.boomArray.forEach((o) => o.move());
    this.giftsArray.forEach((o) => o.move());
    this.heartsArray.forEach((o) => o.move());
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
            this.fortBoom.play();
            this.boomArray.push(new Boom(arrayFortsEnemy[i].gun[j]));

            myFlight.bullets = myFlight.bullets.filter(
              (element) => element != bullet
            );
            arrayFortsEnemy[i].gun = arrayFortsEnemy[i].gun.filter(
              (e) => e != e
            );
            this.score += 25;
          }
        }
      }
    });

    // Check collitions => FortEnemy Bullets to myFlight
    arrayFortsEnemy.forEach((fort) =>
      fort.gun.forEach((gun) =>
        gun.bullets.forEach((bullet) => {
          if (
            bullet.y < myFlight.y + myFlight.h &&
            bullet.y + bullet.h > myFlight.y &&
            bullet.x < myFlight.x + myFlight.w / 2 &&
            bullet.x + bullet.w > myFlight.x - myFlight.w / 2
          ) {
            this.shootMe.play();
            this.boomArray.push(new Boom(bullet));
            this.score += 30;
            gun.bullets = gun.bullets.filter((el) => el != bullet);
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
        if (!this.boom) {
          this.health = 0;
          this._flightsEnemies = this._flightsEnemies.filter(
            (el) => el != fligtEnemy
          );
        }

        // Boom!!!!
        // Boom!!!!
      }
    });
    // Check collitions => enemyFlightsBullets to myFlight
    flightsEnemies.forEach((fligtEnemy) => {
      fligtEnemy.bullets.forEach((bullet) => {
        if (
          bullet.y < myFlight.y + myFlight.h &&
          bullet.y + bullet.h > myFlight.y &&
          bullet.x < myFlight.x + myFlight.w / 2 &&
          bullet.x + bullet.w > myFlight.x - myFlight.w / 2
        ) {
          this.boomArray.push(new Boom(bullet));
          this.shootMe.pause();
          this.shootMe.play();
          this.health -= 10;
          fligtEnemy.bullets = fligtEnemy.bullets.filter((el) => el != bullet);
        }
      });
    });
    // Check collitions => myBullets to enemyFlights
    flightsEnemies.forEach((fligtEnemy) => {
      myFlight.bullets.forEach((bullet) => {
        if (
          fligtEnemy.y < bullet.y + bullet.h &&
          fligtEnemy.y + fligtEnemy.h > bullet.y &&
          fligtEnemy.x < bullet.x + bullet.w &&
          fligtEnemy.x + fligtEnemy.w > bullet.x - bullet.w
        ) {
          this.audioBoom.play();

          myFlight.bullets = myFlight.bullets.filter((el) => el != bullet);
          this._flightsEnemies = this._flightsEnemies.filter(
            (el) => el != fligtEnemy
          );
          this.score += 20;
          this.boomArray.push(new Boom(fligtEnemy));
        }
      });
    });
     // Check collitions => myFlight to Gifts
     this.giftsArray.forEach((gift) => {
      
        if (
          gift.y < myFlight.y + myFlight.h &&
          gift.y + gift.h > myFlight.y &&
          gift.x < myFlight.x + myFlight.w / 2 &&
          gift.x + gift.w > myFlight.x - myFlight.w / 2
        ) {
          this.moneyBoing.play()
          this.score += 100;
          this.giftsArray = this.giftsArray.filter((el) => el != gift);
        }
      
    });
        // Check collitions => myFlight to Hearts
        this.heartsArray.forEach((heart) => {
      
          if (
            heart.y < myFlight.y + myFlight.h &&
            heart.y + heart.h > myFlight.y &&
            heart.x < myFlight.x + myFlight.w / 2 &&
            heart.x + heart.w > myFlight.x - myFlight.w / 2
          ) {
            this.heartBoing.play()
            this.health = 100;
            this.heartsArray = this.heartsArray.filter((el) => el != heart);
          }
        
      });
  }
  _drawScore() {
    SCORE.innerHTML = `${this.score}`;
  }
  _drawHealth() {
    HEALTH.innerHTML = `${this.health}`;
    MYHEALTH.style.width = this.health + "%";
  }
  _clearBoom() {
    if (this.boomArray.length > 3) {
      this.boomArray.shift();
    }
  }
}
