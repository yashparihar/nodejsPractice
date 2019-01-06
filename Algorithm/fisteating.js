let infec = 2;
let normal = [1,50,4,9,10];

let initialQue = [{
    move:0, normal :normal , infec: infec
}]

function checkFistTank(possiblemove  ){

    console.log("checking: ", possiblemove );

    let inheritMove = [];
    while(possiblemove.length > 0){
        let curr = possiblemove.shift();

        if (curr.type==0 ){
            curr.infec += (curr.infec - 1);
            curr.move++; 
        } else if (curr.type==1){
            curr.normal.shift();
            curr.move++;
        }

        while(true){
            if (curr.normal.length==0){
                return curr.move;
            } else if (curr.infec > curr.normal[0]){
                
                curr.infec += curr.normal.shift();
                console.log("consumin "+ curr.normal[0] + " infec:"+curr.infec )
                continue;
            } else {

                inheritMove.push( {
                    ...curr,
                    type : 0
                }, {
                    ...curr,
                    type : 1
                } )
                console.log("pushin moves ", curr, inheritMove)
                break;
            }
        }
    }

    
    return checkFistTank( inheritMove ) ;
}


console.log("movesL ", checkFistTank(initialQue) );