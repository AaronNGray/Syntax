
abstract class R {
    abstract print(): void;
};

class A extends R {
    print(): void { console.log("A"); }
};
class B extends R {
    print(): void { console.log("B"); }
};

const classes:Record<string, any> = { "A": A, "B": B };

function test(type:string): R {
    if (classes[type])
        return new (classes[type])();
    else 
        throw Error("Invalid class");
}

function main() {
    test("A").print();
}

main();


