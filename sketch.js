//made by elvin
//made by elvin
//made by elvin
//made by elvin
//made by elvin

var player, playerImg, playerDead;
var oB, obGroup, obImg;
var pT, ptGroup, ptImg;
var bg, backgroundImg;
var gameOver, gameOverImg;
var iB
var points;
var gameOver, gameOverImg;
var distance;
var restart, restartImg;
//sounds
var theme, orb, death, jump, again;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  backgroundImg = loadImage("background.jpg");
  playerImg = loadAnimation("jett.png");
  ptImg = loadImage("pt.png");
  obImg = loadImage("valknife.png");
  playerDead = loadAnimation("jettDead.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  theme=loadSound("valorant.mp3");
  orb=loadSound("xp.mp3");
  death=loadSound("death.mp3");
  jump=loadSound("jettupdraft.mp3");
  again=loadSound("zaid.mp3");
}

function setup() {
  theme.play();
  theme.loop=true;

  createCanvas(900,360);

  bg=createSprite(320,180);
  bg.addImage(backgroundImg);
  bg.velocityX = -4;
  bg.scale=0.6;
  
  player=createSprite(100,250,20,20);
  player.addAnimation("jett running",playerImg);
  player.addAnimation("dead" , playerDead)
  player.scale=0.3;
  player.setCollider("rectangle", 0, 0, 120, 440, 0);

  iB=createSprite(320, 320, 600,5)
  iB.visible=false;
  
  points = 0;
  distance= 0;

  ptGroup=new Group();
  obGroup=new Group();

  gameOver=createSprite(450,180);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.08
  gameOver.visible=false;

  restart=createSprite(450,230);
  restart.addImage(restartImg);
  restart.scale=0.2
  restart.visible=false;
}

function draw() {
    background(0);

    text("Points: "+ points, 450,180);

    if(bg.x < 70){
        bg.x = bg.width/8;
    }
    if(gameState===PLAY){

        player.collide(iB);
        distance += Math.round(frameCount/60);

        if(frameCount % 10 === 0){
          bg.velocityX-=0.02;
          ptGroup.velocityXEach-=2;
          obGroup.velocityXEach-=2;
        }

        if(keyWentDown("space")&& player.y >= 180) {
          player.velocityY=-11;
          jump.play();
        }

        if (ptGroup.isTouching(player)) {
          pT.destroy();
          orb.play();
          points+=50;
        }

        player.velocityY+=0.8

        spawnPoints();
        spawnObstacles();
        if(obGroup.isTouching(player)){
          death.play();
          gameState = END;
      }
    }
     else if (gameState === END) {
        player.changeAnimation("dead", playerDead);
        obGroup.setLifetimeEach(-1);
        ptGroup.setLifetimeEach(-1);
        bg.velocityX = 0;
        player.velocityY = 0
       obGroup.setVelocityXEach(0);
       ptGroup.setVelocityXEach(0);
       gameOver.visible=true;
       restart.visible=true;
       if(mousePressedOver(restart)){
        again.play();
        reset();
       }
    }
 
     drawSprites();
     fill(8);
     textFont("cursive");
     text("Score: "+ points, 800,50);
     text("Distance: "+ distance, 800,75);
 
}

function spawnPoints() {
  if (frameCount % 200 === 0) {
    pT = createSprite(600,300,10,40);
    pT.addImage(ptImg);
    pT.scale=0.2;
    pT.x = Math.round(random(800,860))
    pT.velocityX=-4;
    pT.setCollider("rectangle", 0, 0, 160, 225, 0);
    pT.lifetime=200;
    ptGroup.add(pT);
  }
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {
    oB = createSprite(600,300,10,40);
    oB.addImage(obImg);
    oB.scale=0.2;
    oB.x = Math.round(random(600,700));
    oB.velocityX=-4;
    oB.lifetime=200;
    obGroup.add(oB);
  }
}

function reset(){
  gameState = PLAY;

  bg.velocityX=-4;

  gameOver.visible=false;
  restart.visible=false;

  player.changeAnimation("jett running", playerImg);

  obGroup.destroyEach();
  ptGroup.destroyEach();

  points=0;
  distance=0;
}

//made by elvin
//made by elvin
//made by elvin
//made by elvin
//made by elvin
