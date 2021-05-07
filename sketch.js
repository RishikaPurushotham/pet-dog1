var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var lastFed,feed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

feedFood=createButton("Feed Dog");
feedFood.position(250,95);
feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime')
  fedTime.on("value",()=>{
    lastFed=data.val()
  })
  if(lastFed>=12){
    text("LastFed: "+lastFed%12,350,30)
  }else if(lastFed===0){
text("LastFed:12AM",350,30)
  } else {
    text("LastFed: "+lastFed,350,30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var foodStockValue=foodObj.getfoodStock();
if(foodStockValue<=0){
  foodObj.updateFoodStock(foodStockValue*0)
}
else{
 foodObj.updateFoodStock(foodStockValue-1)
}

database.ref('/').update({
  Food:foodObj.getfoodStock(),
  FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
