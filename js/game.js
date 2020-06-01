class Game {
    constructor(ctx){
        this._ctx = ctx
        this._intervalId = null
        this._bg = new Background(ctx)
        this._fligth = new Fligth(ctx)
    }
    start() {
        this._intervalId = setInterval(() => {
          this._clear()
          this._draw()
          this._move()
        }, 1000 / 60);
    }

    _clear(){
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)

    }
    _draw(){
        this._bg.draw()
        this._fligth.draw()


    }
    _move(){
        this._bg.move()
        this._fligth.move()

    }
}