
/*
 GRAPH TRAVESAL
 https://www.hackerearth.com/practice/algorithms/graphs/graph-representation/practice-problems/algorithm/optimal-connectivity-c6ae79ca/
*/

// var fs = require("fs");
// var filename = "./input1.txt";
// var str = fs.readFileSync(filename, "utf8");

let str = "5\n1 2 2\n1 3 3\n3 4 5\n3 5 4\n2\n1 4 4\n4 5 6"
let input = str.split('\n');

let totComp = parseInt(input[0]);
let totQuery = parseInt(input[totComp]);
let computers = {};

for (let computerLink = 0; computerLink < totComp - 1; computerLink++) {
    let info = input[1 + computerLink].split(' ');

    if (!computers[info[0]])
        computers[info[0]] = [info[2]]
    else
        computers[info[0]].push(info[2])

    if (!computers[info[1]])
        computers[info[1]] = [info[2]]
    else
        computers[info[1]].push(info[2])

}

for (let query = 0; query < totQuery; query++) {
    // console.log("-> ", input[totComp + query + 1] );
    let info = input[totComp + query + 1].split(' ');
    // console.log("--> ", computers[info[0]], computers[info[1]] )
    var descLag = false;

    computers[info[1]].map(val => {
        // console.log("check ", info[2], val  )
        if (parseInt(info[2]) < parseInt(val)) {
            descLag = true;
            return;
        }
    })

    !descLag && computers[info[0]].map(val => {
        // console.log("check ", info[2], val  )
        if (parseInt(info[2]) < parseInt(val)) {
            descLag = true;
            return;
        }
    })

    console.log((descLag) ? "YES" : "NO");
}



// console.log("=> ", computers, totQuery )