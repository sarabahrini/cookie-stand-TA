'use strict';

var allStores = [];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];

// Global variables for DOM access and such
//access form
var salesForm = document.getElementById('userInput');


function Store(avgCookie, minCust, maxCust, name) {
    this.avgCookie = avgCookie;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.name = name;

    this.custPerHour = [];
    this.cookiePerHour = [];
    this.totalCookies = 0;

    // Avoid defining instance methods inside the constructor
    // this.bark = function() {
    //   console.log(this.name);
    // }
    allStores.push(this);
}

Store.prototype.calcCustPerHour = function () {
    for (var i = 0; i < hours.length; i++) {
        var randomCustPerHour = random(this.minCust, this.maxCust);
        this.custPerHour.push(randomCustPerHour);
    }
};

Store.prototype.calcCookiePerHour = function () {
    this.calcCustPerHour();
    for (var i in hours) {
        this.cookiePerHour.push(this.custPerHour[i] * this.avgCookie)
        // console.log(this.cookiePerHour);

        this.totalCookies += this.cookiePerHour[i] // It can be written like: this.totalCookies = this.totalCookies + this.CookiePerHour[i]
        // console.log(this.totalCookies);
    }
};

//using render is convection for rendering table 

//Whenever working with table 
//First step: Create element 
//Second step: give it a text content
//Third step: append to the parent

Store.prototype.render = function () {
    this.calcCookiePerHour();
    var tableSheet = document.getElementById('storeTable');
    var newTr = document.createElement('tr');
    var newTd = document.createElement('td');

    newTd.textContent = this.name;

    newTr.append(newTd);

    for (var i in hours) {
        var newTd = document.createElement('td');
        newTd.textContent = this.cookiePerHour[i];
        newTr.append(newTd);
    }


    newTd = document.createElement('td');
    newTd.textContent = this.totalCookies;
    newTr.append(newTd);
    tableSheet.append(newTr);
};


// var Ross = new Store(20, 5, 30, 'Ross');

function renderAllStores() {
    //set up references
    var tableSheet = document.getElementById('storeTable');
    var newTr = document.createElement('tr');

    //========== Build header row ==========
    // Build location column name

    var storeLocationTd = document.createElement('td');
    storeLocationTd.textContent = 'Store Location';
    newTr.append(storeLocationTd);


    for (var j in hours) {
        var newTd = document.createElement('td');
        newTd.textContent = hours[j];
        newTr.append(newTd);
    }


    var storeTotalTd = document.createElement('td');
    storeTotalTd.textContent = 'Total';
    newTr.append(storeTotalTd);
    tableSheet.append(newTr);


    //========== END Build table header ========
    for (var i in allStores) {
        allStores[i].render();
    }
}

// New Stores
var pike = new Store(7, 30, 70, 'Pike Market');
var tac = new Store(7, 30, 70, 'SeaTac Airport');
var center = new Store(7, 30, 70, 'Seattle Center');
var capitol = new Store(7, 30, 70, 'Capitol Hill');
var alki = new Store(7, 30, 70, 'Alki');
// pike.render();

// renderAllStores();

// inside the render function this === pike
//========================================
// global functions

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ========================================
var allInputs = [];

// add event listener to salesForm
// salesForm.addEventListener('submit', handleData);

// This function is the event handler for the submission of comments
function handleData(event) {
    console.log('here');
    event.preventDefault();
    var numberAvg = event.target.numberAvg.value;
    var numberMin = event.target.numberMin.value;
    var numberMax = event.target.numberMax.value;
    var store = event.target.store.value;


// gotta have it for this purpose. prevents page reload on a 'submit' event
// Validation to prevent empty form fields
if (!numberAvg || !numberMin || !numberMax || !store) {
    return alert('Fields cannot be empty!');
}


// This empties the form fields after the data has been grabbed
//   event.target.who.value = null;
//   event.target.says.value = null;

document.getElementById("storeTable").innerHTML = '';

new Store(numberAvg, numberMin, numberMax, store);
console.log('allStores', allStores);
renderAllStores();

}

// newStore.render();



salesForm.addEventListener('submit', handleData);
renderAllStores();





