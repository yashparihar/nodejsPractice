// /* program
//  https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/practice-problems/algorithm/t1-1-6064aa64/description/
// */

const readline = require('readline');

// // const rl = readline.createInterface({
//   // input: process.stdin,
//   // output: process.stdout
// // });

// // let tot = 0;
// // let ele = [];


// // rl.once('data', (ins) => {
// //   tot = ins;
// //   console.log("=> ", ins);
// //   rl.close(); 
// // });


// // goOn = () => {
// //   console.log("tot: ", tot, " eles: ", ele)
// // }


// process.stdin.resume();
// // process.stdin.setEncoding("utf-8");
// var stdin_input = "";

// process.stdin.on("data", function (input) {
//   stdin_input += input;                               // Reading input from STDIN
//   checkInput(input);
// });

// checkInput = (input) => { console.log("checking");
//   if (input == "end" ){
//     process.stdout.write(" ===>  sdas");
//     console.log("close::: ");
//     process.stdin.close();
//   }
// }


// process.stdin.on("close", function () {
//   console.log("ended:-- ") ;
//   main(stdin_input);
// });

// function main(input) {
//   process.stdout.write("Hi, " + input + ".\n");       // Writing output to STDOUT
// }


// process.stdin.resume(); 

// process.stdin.on('data', function (chunk) { 
//   process.stdout.write('data: ' + chunk); });


// 'strict'

function obj(){
     // console.log("sdfsf");
}

obj.prototype.id = 12;
obj.prototype.getid =(e) => {
     console.log(this, obj , obj.id);
     return this.id;
}

var ob1 = new obj();


// console.log(ob1.id);

ob1.getid.call()


