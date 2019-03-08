

let doing = () => {
    var a = [];
    var n = 10000000
    while (n-- > 0) {
        a.push(n);
    }
}



var start = new Date().getTime();

doing();

var end = new Date().getTime();

var time = end - start;
console.log('Execution time: ' + time);