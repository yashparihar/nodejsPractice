/*
 A DFS Problem 
https://www.hackerearth.com/practice/algorithms/graphs/depth-first-search/practice-problems/algorithm/aryas-stunt-63b3da17/
*/

// let str = "6 4\n3 4 3 2 4 5\n1 3\n3 5\n5 2\n4 6";
let str = "10 5\n42 68 35 1 70 25 79 59 63 65\n1 7\n7 5\n10 6\n9 6\n1 2"
let input = str.split('\n');

// LOOPING THRU ALL NODE TENT
let tot = input[0].split(' ');

let totNode = parseInt(tot[0])
let totConnected = parseInt(tot[1])

let notVisited = Array.from(new Array(totNode), (val, index) => parseInt(index));

let tentDetail = [];

// SETTING TENTS FROM DETAILS
for (let army of input[1].split(' ')) {
    tentDetail.push({
        armySize: parseInt(army),
    })
}



// SETTING TENT CONNECTED TO OTHER TENTS
for (let eno = 0; eno < totConnected; eno++) {
    let edge = input[2 + eno].split(' ');

    // console.log("=> ", tentDetail[parseInt(edge[0]) - 1]);

    let connectedTent = (tentDetail[parseInt(edge[0]) - 1]["connectedTent"]) ? (tentDetail[parseInt(edge[0]) - 1]["connectedTent"]) : [];
    connectedTent.push(parseInt(edge[1] - 1))

    tentDetail[parseInt(edge[0]) - 1]["connectedTent"] = connectedTent;

    connectedTent = (tentDetail[parseInt(edge[1]) - 1]["connectedTent"]) ? (tentDetail[parseInt(edge[1]) - 1].connectedTent) : [];
    connectedTent.push(parseInt(edge[0]) - 1)

    tentDetail[parseInt(edge[1]) - 1].connectedTent = connectedTent;

}


let allInjured = 0;
let allKilled = 0;

var totInjured = 0;
var maxArmyTent = -1;

let burnedTent = [];

traverseTent = (tentNo) => {

    // DONT VISIT IF TENT IS VISITED
    if (!notVisited.includes(tentNo)) return;

    // MAKING THIS TENT VISITED
    notVisited.splice(notVisited.indexOf(tentNo), 1);

    totInjured += tentDetail[tentNo].armySize;

    // (INITIIAL or TENT ARMY SIZE GREATEER THAN RECORDED TENT ArmySize or BOTH TENT ArmySize equal Remain Smaller TENTNO)
    if (maxArmyTent == -1 || tentDetail[maxArmyTent].armySize < tentDetail[tentNo].armySize ||
        (tentDetail[maxArmyTent].armySize == tentDetail[tentNo].armySize && tentNo < maxArmyTent)) {

        maxArmyTent = tentNo
    }

    // CHECK IF ITS HAS CONNECTED TENT
    if (tentDetail[tentNo].connectedTent) {

        // TRAVERSING THRU ALL LINKED TENT
        for (linkTent of tentDetail[tentNo].connectedTent) {
            traverseTent(parseInt(linkTent));
        }
    }

}


while (notVisited.length != 0) {
    totInjured = 0;
    maxArmyTent = -1;

    traverseTent(parseInt(notVisited[0]));

    burnedTent.push(maxArmyTent + 1);

    // console.log("After traversing:- ", totInjured, maxArmyTent, notVisited);

    allInjured += totInjured - tentDetail[maxArmyTent].armySize;
    allKilled += tentDetail[maxArmyTent].armySize;


}

burnedTent.sort(sortNumber = (a, b) => {
    return a - b;
});


// PRINTING RESULTS
console.log(allKilled + " " + allInjured)
for (bt of burnedTent) {
    process.stdout.write(bt.toString() + " ")
}
