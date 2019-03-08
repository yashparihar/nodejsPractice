


let a = 22;
let b = 33;

let sum = (val1, val2) => {
    return val1+val2
}

a = sum(a,b);

console.log(sum(4,5));


function abc() {
    console.log("a = "+a+" ;b="+b);
    console.log("=> sum ", sum(a,b))
}

abc();

module.exports = {
    abc
}


