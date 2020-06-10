// window.onload = () => {

  // function resizeCanvas() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
  // resizeCanvas();

 

//   ctx.fillStyle = "green";
//   ctx.fillRect(10, 10, 100, 100);
// };



const startButton = document.getElementById('start')
const name = document.getElementById('name')
const userName = document.getElementById('userName')
const main = document.getElementById('main')

startButton.addEventListener('click', storeName )

function storeName(){
    userName.innerText = name.value
    main.innerHTML = `
  
    <canvas id="canvas" width="1000" height="800"></canvas> 
  
           
    
    `
    
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const game = new Game (ctx)
    game.start()

   
    
   


}