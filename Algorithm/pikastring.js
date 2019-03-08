
/* program
https://www.hackerearth.com/practice/algorithms/greedy/basics-of-greedy-algorithms/practice-problems/algorithm/pikachu-and-the-game-of-strings-1-8c22a8ce/

Greedy program
 */

 let strLength = 4;
let string_a = "ABCT";
let string_b = "PBDI";
let totMoves = 0;

var cnt = -1;
while (cnt++ < strLength - 1) {
    let c_from = parseInt(string_a.charCodeAt(cnt));
    let c_to = parseInt(string_b.charCodeAt(cnt));

    c_to += (c_to < c_from) ? 26 : 0;

    let diff = c_to - c_from;
    totMoves += (diff > 0) ?  Math.floor(diff / 13) + ((c_to - c_from) % 13) : 0
    // console.log("diff: "+diff+" , totmovves: "+totMoves);
}

console.log(totMoves);
