class Game {
    constructor(ctx){
        this._ctx = ctx
        this._intervalId = null
        this._bg = new Background(ctx)
        this._fligth = new Fligth(ctx)
        this.tick = 0
        this._fortsEnemy = []
    }
    start() {
        this._intervalId = setInterval(() => {
          this._clear()
          this._draw()
          this._move()
          this._addfortEnemy() 
          this._clearfortEnemy()
          this.tick ++
        }, 1000 / 60);
    }

    _clearfortEnemy() {
        this._fortsEnemy = this._fortsEnemy.filter(f => f.isVisible())
      }

    _addfortEnemy() {
       if (this.tick > 100){
        this._fortsEnemy.push(new FortEnemy(this._ctx))
        this.tick = 0
       }

           
           
        
      }
    _clear(){
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)

    }
    _draw(){
        this._bg.draw()
        this._fortsEnemy.forEach(o => o.draw())
        this._fligth.draw()
        


    }
    _move(){
        this._bg.move()
        this._fligth.move()
        this._fortsEnemy.forEach(o => o.move())

    }
}