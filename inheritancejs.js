'use strict';


var util = require('util');

function person(fname){
    this.firstname = fname;
}

function employee(name , pos){
    person.call(this, name) //ACTS AS A CONSTRUCTOR
    this.pos = pos
}

employee.prototype.info = function() {
    console.log(`person ${this.firstname} has pos ${this.pos}`)
}


util.inherits(employee, person);

let emp = new employee("yash", "pilot")

emp.info()