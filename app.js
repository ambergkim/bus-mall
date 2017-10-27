var overAllClicks = 0;
var introSection = document.getElementById('intro');
var startButton = document.getElementById('startButton');
var image1El = document.getElementById('image1');
var image2El = document.getElementById('image2');
var image3El = document.getElementById('image3');
var testSection = document.getElementById('test');
var votesList = document.getElementById('votes');
var resultSection = document.getElementById('results');
var allImages = [];
var resultsHeaderRow = document.getElementById('resultsHeaderRow');
var resultsTableBody = document.getElementById('resultsTableBody');
var resultHeaderArray = ['Image', 'Views', 'Clicks', '% Clicks/View', '% Clicks Overall'];

function Image(name, source){
  this.name = name;
  this.source = source;
  this.views = 0;
  this.clicks = 0;
  this.clicksPerView = function () {
    if (this.views === 0) {
      return 0;
    } else {
      return ((this.clicks / this.views) * 100).toFixed(2);
    }
  };
  this.clicksPerOverall = function() {
    return (this.clicks / 25) * 100;
  };
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
for (var i = 0; i < 6; i++) {//populate queue with six numbers as placeholders
  queue.push(generateRandomNumber());
}

function findAMatch(number) {
  return queue.indexOf(number);
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
  while (findAMatch(random2) >= 0) {
    random2 = generateRandomNumber();
  };
  queue.push(random2);
  queue.shift();
  while (findAMatch(random3) >= 0) {
    random3 = generateRandomNumber();
  };
  queue.push(random3);
  queue.shift();
  var image1Source = allImages[queue[3]].source;
  var image2Source = allImages[queue[4]].source;
  var image3Source = allImages[queue[5]].source;
  var image1Tag = document.createElement('img');
  var image2Tag = document.createElement('img');
  var image3Tag = document.createElement('img');
  image1Tag.setAttribute('src', image1Source);
  image2Tag.setAttribute('src', image2Source);
  image3Tag.setAttribute('src', image3Source);
  image1Tag.setAttribute('class', 'productImages');
  image2Tag.setAttribute('class', 'productImages');
  image3Tag.setAttribute('class', 'productImages');
  image1Tag.setAttribute('id', allImages[queue[3]].name);
  image2Tag.setAttribute('id', allImages[queue[4]].name);
  image3Tag.setAttribute('id', allImages[queue[5]].name);
  image1El.appendChild(image1Tag);
  image2El.appendChild(image2Tag);
  image3El.appendChild(image3Tag);
  allImages[queue[3]].views++;
  allImages[queue[4]].views++;
  allImages[queue[5]].views++;
  overAllClicks++;
}

function clearDivs() {
  image1El.removeChild(image1El.lastChild);
  image2El.removeChild(image2El.lastChild);
  image3El.removeChild(image3El.lastChild);
}

showNewImages();

function showResults(){
  resultSection.classList.remove('hideSection');
  for (var h = 0; h < allImages.length; h++) {
    currentListImage = allImages[h];
    if (currentListImage.clicks > 0) {
      var li = document.createElement('li');
      var liText = document.createTextNode(currentListImage.clicks + ' votes for: ' + currentListImage.name + '.');
      li.appendChild(liText);
      votesList.appendChild(li);
    }
  }
  for (var i = 0; i < resultHeaderArray.length; i++) {
    var text = resultHeaderArray[i];
    var td = document.createElement('td');
    var textNode = document.createTextNode(text);
    td.appendChild(textNode);
    resultsHeaderRow.appendChild(td);
  }
  for (var j = 0; j < allImages.length; j++) {
    var currentImage = allImages[j];
    //image name
    var imageTr = document.createElement('tr');
    var imageNameTd = document.createElement('td');
    var imageNameText = document.createTextNode(currentImage.name);
    imageNameTd.appendChild(imageNameText);
    imageTr.appendChild(imageNameTd);
    //image views
    var imageViewsTd = document.createElement('td');
    var imageViewsText = document.createTextNode(currentImage.views);
    imageViewsTd.appendChild(imageViewsText);
    imageTr.appendChild(imageViewsTd);
    //image clicks
    var imageClicksTd = document.createElement('td');
    var imageClicksText = document.createTextNode(currentImage.clicks);
    imageClicksTd.appendChild(imageClicksText);
    imageTr.appendChild(imageClicksTd);
    //clicks per view
    var imageClicksPerViewTd = document.createElement('td');
    var imageClicksPerViewText = document.createTextNode(currentImage.clicksPerView());
    imageClicksPerViewTd.appendChild(imageClicksPerViewText);
    imageTr.appendChild(imageClicksPerViewTd);
    //clicks per overall
    var imageClicksPerOverallTd = document.createElement('td');
    var imageClicksPerOverallText = document.createTextNode(currentImage.clicksPerOverall());
    imageClicksPerOverallTd.appendChild(imageClicksPerOverallText);
    imageTr.appendChild(imageClicksPerOverallTd);
    //append last
    resultsTableBody.appendChild(imageTr);
  }
}

image1El.addEventListener('click', function(){
  allImages[queue[3]].clicks++;
  if (overAllClicks < 25) {
    clearDivs();
    showNewImages();
  } else {
    testSection.setAttribute('class', 'hideSection');
    showResults();
  }
});
image2El.addEventListener('click', function(){
  allImages[queue[4]].clicks++;
  if (overAllClicks < 25) {
    clearDivs();
    showNewImages();
  } else {
    testSection.setAttribute('class', 'hideSection');
    showResults();
  }
});
image3El.addEventListener('click', function(){
  allImages[queue[5]].clicks++;
  if (overAllClicks < 25) {
    clearDivs();
    showNewImages();
  } else {
    testSection.setAttribute('class', 'hideSection');
    showResults();
  }
});

startButton.addEventListener('click', function(event){
  event.preventDefault();
  introSection.setAttribute('class', 'hideSection');
  testSection.classList.remove('hideSection');
});
