class Fligth {
  constructor(ctx) {
    this._ctx = ctx;

    this.x = this._ctx.canvas.width / 2;
    this.y = this._ctx.canvas.height * 0.6;

    this.w = 100;
    this.h = 80;

    this.vy = 0;
    this.vx = 0;
    this.ax = 0;
    this.ay = 0;

    this.frames = 4;

    this._img = new Image();
    this._img.frames = 4;
    this._img.frameIndex = 0;
    this._img.src = "img/fligth-sprit.png";

    this._aniamationCounter = 0;

    this._setListeners();

    this._turnRight = false;
    this._turnLeft = false;

    this.bullets = [];


    this.audioShot = new Audio ('sounds/Gunshot2.mp3')
    this.audio = new Audio ('sounds/airplane+seaplane-3.mp3')
    this.audio.loop = true;
    // this.audio.play()
  }

  draw() {
    this.bullets.forEach((el) => el.draw());
    this._ctx.drawImage(
      this._img,
      (this._img.frameIndex * this._img.width) / this._img.frames,
      0,
      this._img.width / this._img.frames,
      this._img.height,
      this.x - this.w / 2,
      this.y,
      this.w,
      this.h
    );
  }
  move() {
    this.vy += this.ay;
    this.vx += this.ax;
    this.x += this.vx;
    this.y += this.vy;

    this._animation();
    this.bullets.forEach((el) => el.move());
  }

  _setListeners() {
    document.addEventListener("keydown", (event) => {
      this._inCanvas();
      this._movements(event.keyCode);
    });
    document.addEventListener("keyup", (event) => {
      if (event.keyCode !== SPACE) {
        this.vx = 0;
        this.vy = 0;
        this._turnRight = false;
        this._turnLeft = false;
        this._img.src = "img/fligth-sprit.png";
      }
      this.audioShot.pause();
      this.audioShot.currentTime = 0;
      
    });
  }

  _movements(keyCode) {
    switch (keyCode) {
      case RIGHT:
        this.vx = 5;
        this._turnRight = true;
        break;
      case LEFT:
        this.vx = -5;
        this._turnLeft = true;
        break;
      case UP:
        this.vy = -5;
        break;
      case DOWN:
        this.vy = 5;
        break;
      case SPACE:
        this._shoot();
        break;
    }
  }

  _inCanvas() {
    if (this.x - this.w / 2 <= 0) {
      this.x = this.w / 2;
      this.vx = 0;
    } else {
    }
  }
  _animation() {
    if (this._turnRight === true && this._img.frameIndex < this._img.frames) {
      this._img.frameIndex = 3;

      this._img.src = "img/fligth-TurningR.png";
    } else if (
      this._turnLeft === true &&
      this._img.frameIndex < this._img.frames
    ) {
      this._img.frameIndex = 3;
      this._img.src = "img/fligth-TurningL.png";
    } else {
      this._aniamationCounter++;
      if (this._aniamationCounter > 10) {
        this._aniamationCounter = 0;
        this._img.frameIndex++;
        if (this._img.frameIndex >= this._img.frames) {
          this._img.frameIndex = 0;
        }
      }
    }
  }
  _shoot() {
    this.audioShot.play()
    this.bullets.push(new Bullet(this._ctx, this.x, this.y));
  }
}
