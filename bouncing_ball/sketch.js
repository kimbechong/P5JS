// based on p5.js YouTube tutorial
// https://www.youtube.com/watch?v=wRHAitGzBrg&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=20

var ball = {
    x: 300, 
    y: 200, 
    xspeed: 3, 
    yspeed: 3,
  }
  
  function setup() {
    createCanvas(600, 400);
  }
  
  function draw() {
    background(50);
    move();
    bounce();
    display();
    console.log('x-coordinates: ' + ball.x + '\ny-coordinates: ' + ball.y);
    
  }
  
  function bounce() {
    
    if (ball.x > width || ball.x < 0) {
      ball.xspeed = ball.xspeed * -1;
      console.log('x bounce');
    } 
    
    if (ball.y > height || ball.y < 0) {
      ball.yspeed = ball.yspeed * -1;
      console.log('y bounce');
    }
  }
  
  function display() {
    noStroke();
    strokeWeight(4);
    fill(255, 100, 255);
    ellipse(ball.x, ball.y, 30, 30);
  }
  
  function move() {
    ball.x = ball.x + ball.xspeed;
    ball.y = ball.y + ball.yspeed;
    
  }