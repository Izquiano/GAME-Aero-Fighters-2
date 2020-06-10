const startButton = document.getElementById('start')
const name = document.getElementById('name')
const main = document.getElementById('main')

startButton.addEventListener('click', storeName )

function storeName(){
    window.localStorage.setItem('name', name.value);
    main.innerHTML = `
    <div id="util-nav">
    <div>Lives: <span id="lives">2</span></div>
    <div>Health: <span id="health">123</span><span> %</span><div id="healthBar"><div></div></div></div>
    <div>Score: <span id="score">123</span></div>
    
 
    </div>
    <canvas id="canvas" width="1000" height="800"></canvas> 
  
        
    
    
    `


}