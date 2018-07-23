'use strict';

var allStores =[];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];

function Store(avgCookie, minCust, maxCust, name){
    this.avgCookie = avgCookie;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.name = name;

    this.custPerHour = [];
    this.cookiePerHour =[];
    this.totalCookies = 0;

// Avoid defining instance methods inside the constructor
  // this.bark = function() {
  //   console.log(this.name);
  // }
  allStores. push(this);
}

Store.prototype.calcCustPerHour = function(){
    for (var i=0; i<hours.length; i++){
        var randomCustPerHour = Math.random(this.minCust, this.maxCust);
        this.custPerHour.push(randomCustPerHour);
    }
};

Store.prototype.calcCookiePerHour = function (){
    this.calcCustPerHour();
    for (var i in hours){
        this.cookiePerHour.push(this.custPerHour[i]*this.avgCookie)
        console.log(this.cookiePerHour);
        
        this.totalCookies += this.cookiePerHour[i]
        console.log(this.totalCookies);
        
    //    It can be written like: this.totalCookies = this.totalCookies + this.CookiePerHour[i]
    }
};

var Ross = new Store (20, 5, 30, 'Ross');

// new keyword does a few things... most importantly
// 1. {} (creates a new object literal)
// 2. assigns context to `this`

// console.log(demi) => Dog {
//   name: 'Demi',
//   color: 'black and white',
//   breed: 'border collie',
//   nick: undefined,
// }



 