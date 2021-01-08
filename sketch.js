var survivalTime = 0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg")
}



function setup() 
{
  createCanvas(800,400)

//create monkey
monkey = createSprite(80,315,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1 

//create ground
ground = createSprite(400,350,900,10)
ground.velocityX = -4
console.log(ground.x)
ground.visible = false
  
//create invisible ground so that monkey wont go out of canvas
invisibleGround = createSprite(200,370,400,10);
invisibleGround.visible = false;

//jungle
jungle=createSprite(0,0,800,10)
jungle.addImage(jungleImage)
jungle.scale=1.5;
jungle.x=jungle.width/2;
jungle.velocityX=-4;


//make monkey come infront of jungle 
jungle.depth=monkey.depth
monkey.depth =monkey.depth + 1
  
bananaGroup=new Group()
obstaclesGroup=new Group()
  
score=0
  
}


function draw() {
background("lightblue")
  
//making monkey jump and giving it gravity
  if(keyDown("space")&& monkey.y >= 150)
  {
    monkey.velocityY = -13
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround)
  
//infinite ground
if(ground.x<0)
  {
    ground.x=ground.width/2;
  }
  if(jungle.x<100)
  {
    jungle.x=jungle.width/2;
  }
  
   //adding point systems
   if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  drawSprites() 

   if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
      //score=score-2;
    }
  
  obstacles()
  bananas()
   
  //showing the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

//bananas spawn
function bananas(){
 if (frameCount % 80 === 0){
  var banana = createSprite(600,200,10,40);
  banana.y = random(120,200);
  banana.addImage(bananaImage)
  banana.velocityX = -4
  banana.scale = 0.1;
  
  //assigning lifetime to the banana to avoid leak
   banana.lifetime = 300;
   
   bananaGroup.add(banana)
 
 }
}

//giant rock
function obstacles(){
 if (frameCount % 300 === 0){
  var rock = createSprite(600,305,10,40);
  rock.addImage(obstacleImage)
  rock.velocityX = -4
  rock.scale = 0.24;
  
   //adding lifetime to rock to avoid memory leak
   rock.lifetime = 300;
   
   obstaclesGroup.add(rock)
 }
}
