var skeleton, skeletonImg;
var human,humanImg,humanImg2;
var bgImg;
var ground;
var bullet;
var humanGrp, bulletGrp, rockGrp, lifeGrp;
var rock,rockImg;
var rand1,rand2;
var life,lifeImg;
var visibility;
var skeletonImg2;
var fc;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImg;
var restart,restartImg;


function preload(){
 skeletonImg = loadAnimation("Sprites/SkeliWR1.png","Sprites/SkeliWR2.png");
  bgImg = loadImage("Sprites/BackGround.png");
  humanImg = loadAnimation("Sprites/Human.png", "Sprites/HumanA.png");
  humanImg2 = loadAnimation("Sprites/Human2.png", "Sprites/Human2A.png");
  rockImg = loadImage("Sprites/Rock.png");
  lifeImg = loadImage("Sprites/LIFE.png");
  skeletonImg2= loadImage("Sprites/SkeliWR1.png");
  gameOverImg = loadImage("Sprites/gameOver.png");
  restartImg = loadImage("Sprites/restart.png");


}

function setup() {
  createCanvas(800,400);

  //creating skeleton sprite
  skeleton = createSprite(100,350,30,30);
  skeleton.addAnimation("walkRight",skeletonImg);
  skeleton.scale = 2.75;

  //creating ground sprite
  ground= createSprite(400,400,800,20);
  ground.shapeColor = "black";

  visibility = 255;
  gameOver = createSprite(400,200,200,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  //fc = frameCount*10;

  humanGrp = new Group();
  bulletGrp = new Group();
  rockGrp = new Group();
  lifeGrp = new Group();

  for(var i = 20; i<90; i=i+30){
    life= createSprite(i,20,20,20);
    life.scale = 1.5;
    life.addImage(lifeImg);
    lifeGrp.add(life);
  }
 
}

function draw() {
  background(bgImg);
  if(gameState === PLAY){
    spawnHumans();
    spawnRocks();
    rockHit();
    if(bulletGrp.isTouching(humanGrp)){
     // gameState = END;
      humanGrp.get(0).destroy();
      bulletGrp.destroyEach();
    }
  
  }
  else if(gameState === END){
      bulletGrp.destroyEach();
      humanGrp.destroyEach();
      gameOver.visible = true;
      fill("red");
      textSize(20);
      text("Click 'R' to Restart the Game",300,250);
      if(keyDown("r")){
        restartGame();
        console.log("yes");
        
      }
  }

  
  drawSprites();
}


function spawnHumans(){
  if(frameCount%250 === 0){
    human = createSprite(770,350,30,30)
    rand1 = Math.round(random(1,2));
    if(rand1 === 1){
      human.addAnimation("humanWalk",humanImg);
    }
    else{
      human.addAnimation("human2Walk",humanImg2);
    }
    human.scale = 2.75;
    human.velocityX = -1;
    humanGrp.add(human);
    
  }

}

function shoot(){
  bullet = createSprite(130,350,5,2);
  bullet.shapeColor = "yellow";
  bullet.velocityX = 5;
  bulletGrp.add(bullet);
}

function mouseClicked(){
  shoot();
}


function spawnRocks(){
  if(frameCount%270 === 0){
    rock = createSprite(700,340,10,10);
    rock.addImage(rockImg);
    rock.velocityX = -3;
    rockGrp.add(rock);
  }
}

function rockHit(){
  rand2 = Math.round(random(1,1000));
  if(rand2 === 7 && rockGrp.isTouching(skeleton) ){
    skeleton.destroy();
    lifeGrp.destroyEach();
    gameState = END;
  }
}

function restartGame(){
  gameState = PLAY;
  gameOver.visible = false;
  console.log("work");
  skeleton = createSprite(100,350,30,30);
  skeleton.addAnimation("walkRight",skeletonImg);
  skeleton.scale = 2.75;
}