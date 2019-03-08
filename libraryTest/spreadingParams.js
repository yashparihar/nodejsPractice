

class ClassDemo {

    constructor(id, name , age, size){
        this.id = id;
        this.name = name;
        this.age = age;
        this.size = size;
    }
    display() {
        console.log("=> ", this.id , this.name, this.age, this.size );
    }
    setSize(size) {
        this.size = size;
    }

}


let obj = {
    id:"12",
    name:"yas",
    age: 12
    // size:3
}


let demo = Object.assign( new ClassDemo, obj , { id:"1111" } );



demo.display();

demo.setSize(66);
demo.display();