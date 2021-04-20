var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path, pathImg;

var boy, boyImg;

var cash, diamonds, jwellery;
var cashImg, diamondsImg, jwelleryImg;
var cashGroup, diamondsGroup, jwelleryGroup;

var sword, swordImg, swordGroup;

var treasureCollection = 0;

var gameOver, gameOverImg;

var edges;

function preload() {
  // loading path image
  pathImg = loadImage("Road.png");
  
  // loading boy image
  boyImg = loadAnimation("runner1.png", "runner2.png");
  
  // loading cash image
  cashImg = loadImage("cash.png");
  // loading diamonds' image
  diamondsImg = loadImage("diamonds.png");
  // loading jwellery image
  jwelleryImg = loadImage("jwell.png");
  
  // loading sword image
  swordImg = loadImage("sword.png");
  
  // loading gameOver image
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  // creating canvas
  createCanvas(windowWidth, windowHeight);

  // creating and moving background
  path = createSprite(width/2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  // creating the boy
  boy = createSprite(width/2, height-20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  boy.debug = false;
  boy.setCollider("rectangle", 0, 0, 1200, 1400);
  
  // creating edgeSprites
  edges = createEdgeSprites();
  
  // creating gameOver
  gameOver = createSprite(windowWidth/2, windowHeight/2, 20, 20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.9;
  gameOver.visible = false;
  
  // creating new Group(cashGroup)
  cashGroup = new Group();
  // creating new Group(diamondsGroup)
  diamondsGroup = new Group();
  // creating new Group(jwelleryGroup)
  jwelleryGroup = new Group();
  
  // creating new Group(swordGroup)
  swordGroup = new Group();
}

function draw() {
  // setting background
  background(0);
  
  // doing setup in the PLAY gameState
  if (gameState === PLAY) {
    // moving the boy up and down with the help of the mouse
    boy.x = mouseX;
    
    // colliding the boy with edges
    boy.collide(edges);
    // colliding the boy with left and right edge
    boy.collide(edges[0]);
    boy.collide(edges[2]);
    
    // making the path infinite
    if (path.y > height) {
      path.y = height / 2;
    }
    
    // create cash function
    createCash();
    // create diamonds function
    createDiamonds();
    // create jwellery function
    createJwellery();
    
    // create sword function
    createSword();
    
    /* destroying cash, diamonds and jwellery when boy is touching them and increasing the 
    treasureCollection */ 
    if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection = treasureCollection + 100;
    } else if (jwelleryGroup.isTouching(boy)) {
      jwelleryGroup.destroyEach();
      treasureCollection = treasureCollection + 150;
    }
    
    // destroying sword when the boy is touching it and changing the gameState from PLAY to END
    if (swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      gameState = END;
    }
    
    console.info("The game has started");
  }
  // doing setup in the END gameState
  else if (gameState === END) {
    // destroying the boy
    boy.destroy();
    
    // destroying cash
    cashGroup.destroyEach();
    // destroying diamonds
    diamondsGroup.destroyEach();
    // destroying jwellery
    jwelleryGroup.destroyEach();
    
    // setting the velocityY of path as 0
    path.velocityY = 0;
    
    // displaying gameOver
    gameOver.visible = true;
    
    console.warn("Game Over!");
    
    // clling reset function when gameOver is pressed or touched
    if (mousePressedOver(gameOver) || keyDown("space") || touches.length > 0) {
      // reset function(function call)
      reset();
      touches = [];
      console.info("The game is played once again.");
    }
  }
  
  // draw sprites function to draw sprites
  drawSprites();
  
  // displaying score
  textSize(20);
  fill(25);
  text("Treasure: " + treasureCollection, windowWidth/2, 30);
  
  // Logging gameState in the console
  //console.log("The gameState is " + gameState);
}

function createCash() {
  // creating cash
  if (World.frameCount % 90 === 0) {
    cash = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = windowHeight / 3;
    cashGroup.add(cash);
    cash.debug = false;
  }
}

function createDiamonds() {
  // creating diamonds
  if (World.frameCount % 220 === 0) {
    diamonds = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = windowHeight / 3;
    diamondsGroup.add(diamonds);
    diamonds.debug = false;
  }
}

function createJwellery() {
  // creating jwellery
  if (World.frameCount % 260 === 0) {
    jwellery = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = windowHeight / 3;
    jwelleryGroup.add(jwellery);
    jwellery.debug = false;
  }
}

function createSword() {
  // creating sword
  if (World.frameCount % 300 === 0) {
    sword = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = windowHeight / 3;
    swordGroup.add(sword);
    sword.debug = false;
  }
}

// reset function(function definition)

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  cashGroup.destroyEach();
  diamondsGroup.destroyEach();
  jwelleryGroup.destroyEach();
  swordGroup.destroyEach();
  boy = createSprite(width/2, height-20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  boy.debug = false;
  boy.setCollider("rectangle", 0, 0, 1200, 1400);
  boy.x = mouseX;
  treasureCollection = 0;
  path.velocityY = 4;
  if (path.y > height) {
      path.y = height / 2;
  }
  
  // Logging the count of reset frame called in the console
  console.count("Reset frame is called");
}

// ******************************************************** \\
                          // Done \\
// ******************************************************** \\
