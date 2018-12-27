const assert = require("assert");

const ob1 = {
    a: {
        b: 1
    }
};
const ob2 = {
    a: {
        b: 1
    }
};

const ob3 = Object.create(ob1);

assert.deepEqual(ob1,ob2);
// assert.deepStrictEqual(ob1 , ob2)
// assert.ok(true, "YOOO ERROR--------");


assert.throws(
    () => {
      throw new Error('Wrong value');
    } ,
    function(err) {
    //     console.log(" ---> ", err);
    //   if ((err instanceof Error) && /value/.test(err)) {
    //       console.log("in-------", err  );
    //     return true;
    //   }
    },
    'unexpected error'
  );

  console.log("this does get printed")