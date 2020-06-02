window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // function resizeCanvas() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
  // resizeCanvas();

  const game = new Game (ctx)
  game.start()

//   ctx.fillStyle = "green";
//   ctx.fillRect(10, 10, 100, 100);
};
