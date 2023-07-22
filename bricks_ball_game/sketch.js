

var ball_x, ball_y, ball_dx, ball_dy, ball_radius;

var paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;

var brickRows = 4, brickColumns = 4, brickWidth = 75, brickHeight = 20, brickPadding = 20, brickOffsetLeft = 15, brickOffsetTop = 10;

var score;

var lives=3;
 

var bricks = [];

 

for (var c = 0; c < brickColumns; c++) {

  bricks[c] = [];

  for (var r = 0; r < brickRows; r++) {

    bricks[c][r] = { x: 0, y: 0, hidden: 0 };

  }

}

 

function setup() {

  createCanvas(400, 400);

  ball_x = width / 2;

  ball_y = height / 2;

  ball_radius = 12.5;

  ball_dx = 3;

  ball_dy = 3;

 

  paddle_width = 90;

  paddle_height = 15;

  paddle_x = (width / 2) - (paddle_width / 2);

  paddle_y = height - 30;

  paddle_dx = 3;

  fill("black");

 

  score = 0;

}

 

function createBricks() {

  for (var c = 0; c < brickColumns; c++) {

    for (var r = 0; r < brickRows; r++) {

      if (bricks[c][r].hidden === 0) {

        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;

        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

 

        bricks[c][r].x = brickX;

        bricks[c][r].y = brickY;

 

        fill("black");

        rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);

      }

    }

  }

}

 

function draw() {

  clear();

  background(220);

  createBricks();

 

  circle(ball_x, ball_y, ball_radius * 2);

  rect(paddle_x, paddle_y, paddle_width, paddle_height);

 

  ball_x += ball_dx;

  ball_y += ball_dy;

 

  if (ball_x >= width - ball_radius) {

    ball_dx = -ball_dx;

  }

 

  if (ball_y >= height - ball_radius) {

    ball_dy = -ball_dy;

  }

 

  if (keyIsDown(LEFT_ARROW)) {

    paddle_x -= paddle_dx;

  }

 

  if (keyIsDown(RIGHT_ARROW)) {

    paddle_x += paddle_dx;

  }

 

  if (ball_x <= ball_radius) {

    ball_dx = -ball_dx;

  }

 

  if (ball_y <= ball_radius) {

    ball_dy = -ball_dy;

  }

 

  if (

    ball_y + ball_radius >= paddle_y &&

    ball_x >= paddle_x &&

    ball_x <= paddle_x + paddle_width

  ) {

    ball_dy = -ball_dy;

  }

 

  for (var c = 0; c < brickColumns; c++) {

    for (var r = 0; r < brickRows; r++) {

      if (

        bricks[c][r].hidden === 0 &&

        ball_x + ball_radius >= bricks[c][r].x &&

        ball_x - ball_radius <= brickWidth + bricks[c][r].x &&

        ball_y + ball_radius >= bricks[c][r].y - brickHeight &&

        ball_y - ball_radius <= bricks[c][r].y

      ) {

        bricks[c][r].hidden = 1;

        score += 1; // Increment score by 1

      }

    }
    if(ball_y+ball_radius>=400)
      {
        lives--;
        ball_x=100;
        ball_y=200;
        ball_dx=-3;
      }


  if(lives<=0||score==16)
    
   

    draw.stop();


  }

 

  textSize(18);

  fill(0);

  text("Score: " + score, 10, 200);

  text("Lives:" + lives,10,300);

}