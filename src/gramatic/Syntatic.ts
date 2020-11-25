import Gramatic from "./Gramatic";

class Syntatic {
    stackX: Array<number>;
    stackA: Array<string>;
    Gramatic: Gramatic;

    constructor() {
        this.stackX = [];
        this.stackA = [];
        this.Gramatic = new Gramatic();
        
        this.initializeStackX();
    }

    initializeStackX() {
        this.stackX.push(52); // Add 52(PROGRAM) on the top of stack
    }

    analyse() {
        var me = this;

        while (!this.stackA && !this.stackX) {
            let topX: number = this.stackX[this.getLengthStackX()];
            let topA: string = this.stackA[this.getLengthStackA()];

            let code: number = this.Gramatic.getTokenIdentificationCode(topA);
            console.log("Inteiro ou id: [" + topX + "," + code + "]");

            if(topX && topX < 52) {
                if (topX === code) {
                    console.log("Equals");
                    me.stackA.pop();
                    me.stackX.pop();
                } else {
                    throw new Error("Syntatic error!!");
                }
            } else {
                const join = this.Gramatic.getParsing(topX + "," + code);

                if(join == undefined) {
                    me.stackX.pop();
                } else {
                    if(!join) {
                        me.stackX.pop();

                        const crossingData = this.Gramatic.gerenateCrossingTabParsingToken(join);

                        crossingData?.forEach((value) => {
                            this.stackX.push(value);
                        });
                    }
                }
            }
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