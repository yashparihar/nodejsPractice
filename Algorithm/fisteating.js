
/**  CATCHING FIST PROBLEM USING BFS
 *  */

/** INPUT : INFECTED FISH AND OTHER FISH SIZE */

//let infec = 2; let normal = [1, 50, 4, 9, 10];
//let infec = 1;  let normal = [ 9 , 11, 12, 100];
// let infec = 10; let normal = [9, 20, 25, 100];
let infec = 3;  let normal = [ 25,20,100,400,500 ];
// let infec = 50; let normal = [25,20,9,100] ;

// INITIAL NODE
let initialQue = [{
    move: 0, normal: normal, infec: infec
}]


// FUNCTION CHECKING NEXT LEVEL OF POSSIBLITY
function checkFistTank(possiblemove) {
    // console.log("checking: ", possiblemove);

    /* 2 QUEUES WE HAVE HERE : 
        possiblemove : CONSTAINS ALL NODE IN THE LEVEL
        inherit : PUSH ALL POSSIBILITIES GETTING FROM "possiblemove" AND LATER CALLING THAT LEVEL 
    */

    let inheritMove = [];
    while (possiblemove.length > 0) {
        let curr = possiblemove.shift();

        // TYPE = 0 MEANS ADDING A NORMAL FISH
        // TYPE = 1 MEANS REMOVING A NORMAL FISH

        if (curr.type == 0) {
            curr.infec += (curr.infec - 1);
            curr.move++;
        } else if (curr.type == 1) {
            curr.normal.shift();
            curr.move++;
        }

        // IT CONSUME TILL IT COULD CONSUMES THEN IT GET NEXT POSSIBLITIES AND PASS IT TO ITS NEW POSSIBLITIESQUEUE
        while (true) {
            if (curr.normal.length == 0) {
                return curr.move;
            } else if (curr.infec > curr.normal[0]) {
                curr.infec += curr.normal.shift();
                // console.log("consumin " + curr + " infec:" + curr.infec);
                continue;
            } else {

                inheritMove.push(
                    Object.assign({}, JSON.parse(JSON.stringify(curr)), { type: 0 })
                    , Object.assign({}, JSON.parse(JSON.stringify(curr)), { type: 1 }))

                // console.log("pushin moves ", curr, inheritMove);
                break;
            }
        }
    }


    return checkFistTank(inheritMove);
}


console.log("moves:  ", checkFistTank(initialQue));