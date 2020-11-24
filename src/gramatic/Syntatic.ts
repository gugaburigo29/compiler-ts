import Gramatic from "./Gramatic";

class Syntatic {
    stackX: Array<number>;
    stackA: Array<string>;
    Gramatic: Gramatic;

    constructor() {this.stackX = new Array();
        this.stackA = new Array();
        this.Gramatic = new Gramatic();
        
        this.initializeStackX();
    }

    initializeStackX() {
        this.stackX.push(52); // Add 52(PROGRAM) on the top of stack
    }

    analyse() {
        var me = this;
        while (!this.stackA && !this.stackX) {
            let topX: number = me.stackX[me.getLengthStackX()];
            let topA: string = me.stackA[me.getLengthStackA()];

            let code: number;
        }
    }

    getLengthStackX() {
        let length = this.stackX.length;
        return length ? length - 1 : 0;
    }
    
    getLengthStackA() {
        let length = this.stackA.length;
        return length ? length - 1 : 0;
    }
}

export default Syntatic;