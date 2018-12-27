
let i=0;
let d = false;

let lop = () => { 
    console.log('yep.. ');
    for (i=0;i<100; i++){
        if (i==100) d=true;
       }

}

let ans = () => {
    console.log('after loop: ', d)
}

function* generator(i) {
    yield i;
    yield i + 10;
}

//   var gen = generator(10);

//   console.log(gen.next().value);
//   console.log(gen.next().value); 

function* checkinge(){
    yield lop();
    
    console.log('done');

    yield ans();
}

let cc = checkinge();//.next();

cc.next();
if (i==99){
    cc.next();
}






    
