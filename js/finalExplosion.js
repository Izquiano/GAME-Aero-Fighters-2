class finalExplosion {
  constructor(ctx) {
    this._ctx = ctx
    this._intervalId = null
   
    this.x = 0
    this.y = 0

    this.w = 1000
    this.h = 800

       

    this._img = new Image();
    this._img.frames = 19;
    this._img.frameIndex = 0;
    this._img.src = "img/finalExplosion.png";
    this.finalExplosion = new Audio("sounds/finalExplosion.mp3")

    this.finalExplosion.play()

    
    
  }
  start() {
    this._intervalId = setInterval(() => {
      this._clear();
     
      this._draw();
      this._move();
  

      
    }, 1000 / 60);
  }


  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
  _draw() {
    this._ctx.drawImage(
      this._img,
      (this._img.frameIndex * this._img.width) / this._img.frames,
      0,
      this._img.width / this._img.frames, 
      this._img.height,
      this.x ,
      this.y,
      this.w,
      this.h
    );

    
  }
  _move() {
    this.animation()
    
    
  }
  animation() {
    this._img.frameIndex++;
    if (this._img.frameIndex >= this._img.frames) {
      this._img.frameIndex = 0;
      clearInterval(this._intervalId)
      this._ctx.font = "40px Pixellari";
      this._ctx.textAlign = "center";
      this._ctx.fillText(
        "GAME OVER",
        this._ctx.canvas.width / 2,
        this._ctx.canvas.height / 2)
        const main = document.getElementById('main')
        main.innerHTML += `<a id="playAgain">PLAY AGAIN</a>`
        main.addEventListener('click', this.playAgain)
    }
  }
  playAgain(){
    const playAgain = document.getElementById('playAgain')
    playAgain.remove()
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const game = new Game (ctx)
    game.start()
  }

 
}



      
