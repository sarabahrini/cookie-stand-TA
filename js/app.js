'use strict';

var allStores = [];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];

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
        var randomCustPerHour = Math.random(this.minCust, this.maxCust);
        this.custPerHour.push(randomCustPerHour);
    }
};

Store.prototype.calcCookiePerHour = function () {
    this.calcCustPerHour();
    for (var i in hours) {
        this.cookiePerHour.push(this.custPerHour[i] * this.avgCookie)
        console.log(this.cookiePerHour);

        this.totalCookies += this.cookiePerHour[i]
        console.log(this.totalCookies);

        //    It can be written like: this.totalCookies = this.totalCookies + this.CookiePerHour[i]
    }
};

//using render is convection for rendering table 
Store.prototype.render = function () {
    this.calcCookiePerHour();
    var tableSheet = document.getElementById('storeTable');
    var newTableRowEl = document.createElement('tr');
    var newTableDataEl = document.createElement('td');

    newTableDataEl.textContent = this.name;
    newTableRowEl.appendChild(newTableDataEl);

    for (var i in hours);
    var newTableDataEl = document.createElement('td');
    newTableDataEl.textContent = this.cookiePerHour[i];

    newTableRowEl.appendChild(newTableDataEl);

};
// var Ross = new Store(20, 5, 30, 'Ross');

function renderAllStores() {
    //set up references
    var tableSheet = document.getElementById('storeTable');
    var newTableRowEl = document.createElement('tr');

    //========== Build header row ==========
    // Build location column name

    var storeLocationTableDataEl = document.createElement('td');
    storeLocationTableDataEl.textContent = 'Store Location';
    newTableRowEl.appendChild(storeLocationTableDataEl);

    for (var j in hours) {
        var newTableDataEl = document.createElement('td');
        newTableRowEl.textContent = hours[j];
        newTableRowEl.appendChild(newTableDataEl);
    }

    var storeTotalTdEl = document.createElement('td');
    storeTotalTdEl.textContent = 'Total';
    newTableRowEl.appendChild(storeTotalTdEl);

    tableSheet.appendChild(newTableRowEl);

    //========== END Build table header ========
    for (var i in allStores) {
        allStores.render();
    }
}
// console.log(pike);

// New Stores
var pike = new Store(7, 30, 70, 'Pike Market');
var tac = new Store(7, 30, 70, 'SeaTac Airport');
var center = new Store(7, 30, 70, 'Seattle Center');
var capitol = new Store(7, 30, 70, 'Capitol Hill');
var alki = new Store(7, 30, 70, 'Alki');
// pike.render();

// renderAllStores();
// console.log(renderAllStores);
console.log(allStores);


// inside the render function this === pike
//========================================
// global functions

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//========================================
// Global variables for DOM access and such
var salesForm = document.getElementById('userInput');
var allInputs = [];

// add event listener to salesForm
salesForm.addEventListener('submit',handleData);

// This function is the event handler for the submission of comments
function handleData(event) {
    event.preventDefault();
    // console.log(event.target.Store.value);
    var store = event.target.Store.value;
    var numberMin = event.target.numberMin.value;
    var numberMax = event.target.numberMax.value;
    var numberAvg = event.target.numberAvg.value;


    // gotta have it for this purpose. prevents page reload on a 'submit' event
    // Validation to prevent empty form fields
  if (!store || !numberMin|| !numberMax || !numberAvg) {
    return alert('Fields cannot be empty!');
  }

  
  // This empties the form fields after the data has been grabbed
//   event.target.who.value = null;
//   event.target.says.value = null;

  new Store(store,numberMin,numberMax,numberAvg);

 document.getElementById("storeTable").innerHTML= '';
//   console.log('You just cleared the chat list!');
    
  renderAllStores();
//   console.log(allStores);
  }




