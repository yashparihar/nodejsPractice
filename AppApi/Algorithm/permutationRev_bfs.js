/* program
 https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/practice-problems/algorithm/t1-1-6064aa64/description/

BFS way
 */

const input = [4, '4 3 1 2']
const elements = input[1].split(' ').map(Number);

let ACHIEVE_RESULT = elements.sort().join("");

// var ACHIEVE_RESULT = [...elements].map((v, i) => i+1 ).join("") ;

var pattern = [];
var done = null;

let traverse = (elem , ind, level) => {

    for (var i=2; i<=elem.length ; i++){
        if (ind===i) continue;
        
        let arr = [...elem] ;
        let res = arr.splice(0, i ).reverse();
        
        let resultarr = [...res, ...arr];
        console.log(" => ", arr, res, resultarr );
        
        if (resultarr.join("") == ACHIEVE_RESULT ) {
            console.log("SAME");
            done = true;
            return;
        }

        pattern.push({
            str : resultarr,
            ind : ind,
            lvl : level + 1
        })  
    } 

}


traverse(elements , 0, 0);

while(true) {
    if (pattern.length==0 || done ){
        return;
    }
    for (pat in pattern){
        let currEle = pattern.shift();
        console.log("viewing ", currEle);
        traverse( currEle.str , currEle.ind , currEle.lvl  );
    }

    console.log("ovjs:  ", pattern ) ; 
}




