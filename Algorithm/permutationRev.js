/* program
 https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/practice-problems/algorithm/t1-1-6064aa64/description/
*/

const input = [7, '2 4 3 1 7 6 5']
const ele = input[1].split(' ').map(Number);;

var unprocessed = [...ele].map((v, i) => i);
var processed = [];
let totBranch = 0;



let traverse = (ind) => {

  if (processed.includes(ind))
    return 0;
  

  let rep = unprocessed.splice(unprocessed.indexOf(ind), 1)
  processed.push( ind );
  return 1 + traverse( ele[ind] - 1 ) 

}

for (var eachNode=0 ; eachNode<unprocessed.length ; eachNode++ ) {
  totBranch += ( traverse( parseInt( unprocessed[eachNode] ) ) - 1 ) ;
}

console.log(totBranch  );

