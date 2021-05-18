//Create variables here
var dog;
var database;
var happyDogImg, dogImg;
var food, foodStock, foodS;
var feedDog, feedDog;
var fedTime, lastFed;
var foodObj


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	
  createCanvas(1000, 500);
  database = firebase.database();

  foodObj = new Food();


  dog = createSprite(250, 300);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('foods')
  foodStock.on("value" ,readStock)

  feed = createButton("Feed the Dog");
  feed.position(100, 30)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(200, 30)
  addFood.mousePressed(addFoods);
  
}


function draw() {  

  background(46, 139, 87)

  
  textSize(15);
  fill(255, 255, 254);
  
  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  
  if (lastFed>=12) {
    text("Last Fed: " + lastFed%12 + " PM", 350, 30);
  } else if(lastFed==0){
    text("Last Fed: 12 AM", 350, 30 );
  } else{
    text("Last Fed: " + lastFed + "AM", 350, 30)
  }
  
  foodObj.display();

  drawSprites();
  //add styles here
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
if (x<= 0) {
  x = 0;
} else {
  x = x - 1
}
database.ref('/').update({
  foods:x
})

}

function feedDog(){
  dog.addImage(happyDogImg)

  if (foodObj.getFoodStock()<=0) {
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  } else {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }

  database.ref('/').update({
    foods:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    foods:foodS
  })
}


