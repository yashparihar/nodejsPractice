// For customer event emitter
// var Emitter = require('./emitterCustom');

//FOR BUILD IN EVENT EMITTER
var Emitter = require('events');

/* EXAMPLE 1 
var emtr = new Emitter();

emtr.on('greet', function() {
    console.log("somewhere , someone said hello");
});

emtr.on('greet', function() {
    console.log("again said");
});

emtr.emit("greet");
*/


// INHERITANCE USING UTIL LIB
var util = require('util');

function Greetr() {
    Emitter.call(this);   // super constructor called
    this.greeting = "hello world!";
}

//PROVIDING INHERITANCE
util.inherits(Greetr, Emitter);

Greetr.prototype.greet = function(data) {
    console.log(this.greeting);
    this.emit('greet', data);
}

Greetr.prototype.sayhi = function(str="nothing", stra="n2") {
    console.log("hi to ", this.greeting, str,stra)
}

var greeter1 = new Greetr();

greeter1.on('greet', function(data) {
    console.log("someone greeted! " + data);
})

greeter1.greet('yashu');

// BIND FUNCTION CALL 
let sayhi_b = greeter1.sayhi.bind(greeter1 )
sayhi_b();

// CALL FUNCTION CALL
greeter1.sayhi.call( {greeting: "bye world"} , "extrastring" )
 
// CALL FUNCTION APPLY
greeter1.sayhi.apply( {greeting: "bye world"} , ["extrastring", "hello"] )








/*
// INHERTANCE ES6 WAY

class Greetr_B extends Emitter {
    constructor(){
        super();
        this.greeting = "hello world!";
    }
    
    greet(data) {
        console.log(this.greeting);
        this.emit('greet', data);
    }
}

var greeter2 = new Greetr_B();

greeter2.on('greet', function(data) {
    console.log("someone greeted! "+data);
})

greeter2.greet('yashu');
*/

