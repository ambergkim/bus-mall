var clicks = 0;
var image1El = document.getElementById('image1');
var image2El = document.getElementById('image2');
var image3El = document.getElementById('image3');

var allImages = [];

function Image(name, source){
  this.name = name;
  this.source = source;
  this.views = 0;
  this.clicks = 0;
  this.clicksPerView = this.clicks / this.views;
  this.clicksPerOverall = this.clicks / 25;
  this.canBeShown = 3;
  allImages.push(this);
}

new Image('bag', 'img/bag.jpg');
new Image('banana', 'img/banana.jpg');
new Image('bathroom', 'img/bathroom.jpg');
new Image('boots', 'img/boots.jpg');
new Image('breakfast', 'img/breakfast.jpg');
new Image('bubblegum', 'img/bubblegum.jpg');
new Image('chair', 'img/chair.jpg');
new Image('cthulhu', 'img/cthulhu.jpg');
new Image('dog duck', 'img/dog-duck.jpg');
new Image('dragon', 'img/dragon.jpg');
new Image('pen', 'img/pen.jpg');
new Image('pet sweep', 'img/pet-sweep.jpg');
new Image('scissors', 'img/scissors.jpg');
new Image('shark', 'img/shark.jpg');
new Image('sweep', 'img/sweep.png');
new Image('tauntaun', 'img/tauntaun.jpg');
new Image('unicorn', 'img/unicorn.jpg');
new Image('usb', 'img/usb.gif');
new Image('water can', 'img/water-can.jpg');
new Image('wine glass', 'img/wine-glass.jpg');

function generateRandomNumber(){
  return Math.floor(Math.random() * allImages.length);
}

var queue = [];
for (var i = 0; i < 6; i++) {
  queue.push(generateRandomNumber());
}

console.log('queue ' + queue);

function findAMatch(number) {
  return queue.indexOf(number);
  console.log('index of match ' + queue.indexOf(number));
}

function showNewImages() {
  var random1 = generateRandomNumber();
  var random2 = generateRandomNumber();
  var random3 = generateRandomNumber();
  var is1Matching = findAMatch(random1);
  while (findAMatch(random1) >= 0) {
    random1 = generateRandomNumber();
  };
  queue.push(random1);
  queue.shift();
  console.log('queue with new number 1 ' + queue);
  while (findAMatch(random2) >= 0) {
    random2 = generateRandomNumber();
  };
  queue.push(random2);
  queue.shift();
  console.log('queue with new number 2 ' + queue);
  while (findAMatch(random3) >= 0) {
    random3 = generateRandomNumber();
  };
  queue.push(random3);
  queue.shift();
  console.log('queue with new number 3 ' + queue);
}

for (var i = 0; i < 25; i++) {
  showNewImages();
  console.log('queue ' + queue);
}
