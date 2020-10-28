var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var rand1;
var survivalTime = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  
  createCanvas(600, 400);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(100, 330);
  monkey.addAnimation("monkeyRunning", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(300, 390, 600, 10);
  ground.velocityX = -3;
  ground.shapeColor = "green";
  
}

function draw() {
  
  // console.log(monkey.y);
  
  background("cyan");
  monkey.collide(ground);
  
  // Displaying the survival time
  textFont("Algerian");
  textSize(15);
  text("Survival Time:  " +survivalTime, 450, 25);
  
  if (gameState === PLAY){
    
  // Updating the survival time
  survivalTime = Math.ceil(frameCount / frameRate());
    
    if (keyDown("space") && monkey.y > 320){
    
      monkey.velocityY = -16;
    }
    
    food();
    obstacles();
    
    // if monkey touches the banana group
    if (monkey.isTouching(foodGroup)){
    
      foodGroup.destroyEach();
      survivalTime += 1;
      
    }
    
    // If monkey touches the obstacle group
    if (monkey.isTouching(obstacleGroup)){
      
      gameState = END;
    
    }
  }
  
  if (gameState === END){
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    ground.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    survivalTime = survivalTime;
    
    textSize(40);
    textFont("Algerian");
    text("Game Over!!", 200, 200);
    
  }
  
  monkey.velocityY += 0.8;
  
  
  // For making an infinite ground
  ground.x = ground.width / 2;
  
  
  
  drawSprites();
}

function food(){
  
  if (frameCount % 80 === 0){
    
    banana = createSprite(500, 50);
    banana.addImage(bananaImage);
    
    // Creating a random number for the y axis of the banana
    rand3 = Math.round(120, 200);
    banana.y = rand3;
    
    banana.lifetime= 200;
    banana.scale = 0.1;
    banana.velocityX = -5;
    
    
    
    foodGroup.add(banana);
  }
  
}

function obstacles(){
  
  if (frameCount % 300 === 0){
    
    obstacle = createSprite(550, 350);
    obstacle.addImage(obstacleImage);
    
    obstacle.lifetime = 125;
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    
    obstacleGroup.add(obstacle);
  }
  
}



