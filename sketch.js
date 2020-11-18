var aprochingMosquitos,fearedMosquitos,can,aprochingMosquitosImg,fearedMosquitosImg,canImg;
var spray,sprayImg;
var count=0;
var sprayGroup;
var aprochingMosquitosGroup;
var edges;
var visibility=255;
var cityImg,city;
var life=10;
var strongMosquito,strongMosquitoImg;
var strongMosquitoGroup;
var scientist,scientistImg;
var speechBubble,speechBubbleImg;
var heart,heartImg;
var cheer,cheerImg;
var sad,sadImg;
var spraySound;
var defetCount=0;
var reset;
var PLAY=1,END=0,gameState=PLAY;



function preload(){
 aprochingMosquitosImg=loadImage('aproching mosquito.png');
 fearedMosquitosImg=loadImage('fearing mosquitoes.png');
 sprayImg=loadImage('spray1.png');
 canImg=loadImage('canimg.png');
 cityImg=loadImage('cityImg.jpg');
 strongMosquitoImg=loadImage('strong mosquitoes.png');
 scientistImg=loadImage('scientistImg.png');
 speechBubbleImg=loadImage('speech bubble.png');
 heartImg=loadImage('heart.png');
 cheerImg=loadImage('ceeringIMg.png');
sadImg=loadImage('sad.png');
spraySound=loadSound('sound1.mp3');

}
function setup() {
  createCanvas(displayWidth,displayHeight-120);
  
  can=createSprite(200,200);
 can.addImage('c',canImg);
 can.scale=0.4;
 can.velocityY=0;
 can.visible=false;
 sprayGroup=new Group();
 aprochingMosquitosGroup=new Group();
 strongMosquitoGroup= new Group();
 scientist=createSprite(200,500);
 scientist.addImage('scientist',scientistImg);

 speechBubble=createSprite(scientist.x+250,scientist.y-150);
 speechBubble.addImage('speech',speechBubbleImg);
 heart=createSprite(85,90);
 heart.addImage('heart',heartImg);
 heart.scale=0.6;
 heart.visible=false;

 cheer=createSprite(displayWidth-300,300);
cheer.addImage('cheer',cheerImg);
cheer.visible=false;
cheer.scale=2;

 sad=createSprite(200,500);
sad.addImage('sad',sadImg);
sad.visible=false;

reset=createSprite(500,400);
reset.visible=false;

}

function draw() {
  background(cityImg); 
  drawSprites();
  edges= createEdgeSprites();
 can.collide(edges);
  if(gameState===PLAY){
   
    can.velocityY=0;
    if(keyWentDown('space')){
      var spray=createSprite(can.x+13,can.y-68);
      spray.x=can.x+13;
      spray.y=can.y-68;
     spray.addImage('s',sprayImg);
     spray.scale=0.7;
     heart.visible=true;
    
    sprayGroup.add(spray);
     }
     if(keyWentUp('space')){
      sprayGroup.destroyEach();
      spraySound.play();
    }
   if(keyDown(UP_ARROW)){
    can.velocityY=-7;
    
  }
  if(keyDown(DOWN_ARROW)){
    can.velocityY=7;  
  }
  for(var i=0;i<aprochingMosquitosGroup.length;i++){
    
    if(aprochingMosquitosGroup.get(i)!==null && sprayGroup.isTouching(aprochingMosquitosGroup)){
     count=count+5;
     aprochingMosquitosGroup.get(i).destroy();
    }
 } 
    for(var o=0;o<strongMosquitoGroup.length;o++){
      if(strongMosquitoGroup.get(o)!==null&& sprayGroup.isTouching(strongMosquitoGroup)){
         count=count+20;
         strongMosquitoGroup.get(o).destroy();
      }
    }
   for( var h=0;h<aprochingMosquitosGroup.length;h++){
     if(aprochingMosquitosGroup.get(h)!==null&&aprochingMosquitosGroup.isTouching(edges[0])){
       life=life-1;
       aprochingMosquitosGroup.get(h).destroy();
     }
   }
   for( var k=0;k<strongMosquitoGroup.length;k++){
    if(strongMosquitoGroup.get(k)!==null&&strongMosquitoGroup.isTouching(edges[0])){
      life=life-2;
      strongMosquitoGroup.get(k).destroy();
    }
  }drawSprites();
  if(frameCount<125){
    textSize(20);
    text('city has been infected by mosquitoes',speechBubble.x-130,speechBubble.y-140);
  }else if(frameCount>125&&frameCount<220){
    textSize(20);
    text('use the spray to kill mosquitoes',speechBubble.x-130,speechBubble.y-110);
  }else if(frameCount>220&&frameCount<355){
    textSize(20);
    text('use up and down arrow to move and space to spray',speechBubble.x-190,speechBubble.y-80);
  }else if(frameCount>355){
    scientist.visible=false;
    speechBubble.visible=false;
    can.visible=true;
    spawnMosquitos();
  }
  if(count>=20){
    can.destroy();
    sprayGroup.destroyEach();
    aprochingMosquitosGroup.destroyEach();
    strongMosquitoGroup.destroyEach();
    scientist.visible=true;
    speechBubble.visible=true;
    cheer.visible=true;
    textSize(32);
    fill('red');
    text('THE CITY HAS BEEN SAVED!!!',speechBubble.x-200,speechBubble.y-80);
    if(defetCount>200){
      clear();
      background(0);
      text('in whole',200,300);
      reset.visible=true;
      if(mousePressedOver(reset)){
          restart();
      }

  }
  textSize(36);
  fill('red');
  text('score:'+count,770,100);


  textSize(36);
  text(':'+life,120,100);
  if(life<=0){
    gameState=END;}
 
  }else if (gameState===END){
    drawSprites()
      can.destroy();
      sprayGroup.destroyEach();
      aprochingMosquitosGroup.destroyEach();
      strongMosquitoGroup.destroyEach();
     sad.visible=true;
      speechBubble.visible=true;
       defetCount=defetCount+1;
    
     text('DEFEAT',speechBubble.x-150,speechBubble.y-80);
      if(defetCount>200){
        clear();
        background(0);
        text('in whole',200,300);
        reset.visible=true;
        if(mousePressedOver(reset)){
            restart();
        }
    
      }
    }
}

function spawnMosquitos(){
  if(frameCount%100===0){
  var aprochingMosquitos=createSprite(displayWidth,random(1,520));
  aprochingMosquitos.velocityX=- (6 + 3*count/200);
  aprochingMosquitos.addImage('m',aprochingMosquitosImg);
  aprochingMosquitos.addImage('a',fearedMosquitosImg);
  aprochingMosquitos.scale=0.3;
  aprochingMosquitos.lifetime=800;
  aprochingMosquitos.depth=can.depth;
  can.depth = can.depth+1;
  aprochingMosquitosGroup.add(aprochingMosquitos);
  }
  if(frameCount%250===0){
    var strongMosquito=createSprite(displayWidth,random(1,520));
    strongMosquito.addImage('s',strongMosquitoImg);
    strongMosquito.velocityX=- (6 + 3*count/150);
    strongMosquito.scale=0.6;
    strongMosquito.lifetime=800;
    strongMosquito.depth=can.depth;
    strongMosquito.depth=strongMosquito.depth+1;
    strongMosquitoGroup.add(strongMosquito);
  }
}
function restart(){
  gameState=PLAY;
}
}