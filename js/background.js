class Background {
    constructor (ctx){
        this._ctx = ctx

        this.x = 0
        this.y = 0

        this.w = this._ctx.canvas.width
        this.h = this._ctx.canvas.height

        this.vy = +3
        

        this._img = new Image()
        this._img.src = 'img/background.png'


        

    }
    draw(){
        this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h)
        

        this._ctx.drawImage(this._img, this.x, this.y - this.h, this.w, this.h)

    }
    move(){
                
       
        this.y += this.vy
        if(this.y > this.h){
            this.y = 0
        }
    
      

    }
}