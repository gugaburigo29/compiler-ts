import { TokenInterface } from "../store/table/actions";
import Gramatic from "./Gramatic";

class Syntatic {
    stackX: Array<number>;
    stackA: Array<TokenInterface>;
    Gramatic: Gramatic;

    constructor() {
        this.stackX = [];
        this.stackA = [];
        this.Gramatic = new Gramatic();
    }

    initializeStacks(tokens: TokenInterface[]) {
        this.stackX.push(52); // Add 52(PROGRAM) on the top of stack
        this.stackA = [...tokens];
        this.stackA.reverse();
    }

    analyse(tokens: TokenInterface[]) {
        debugger;
        var me = this;
        this.initializeStacks(tokens);

        while (this.stackA.length && this.stackX.length) {
            let topX: number = this.stackX[this.getLengthStackX()];
            let topA: TokenInterface = this.stackA[this.getLengthStackA()];

            let code: number = topA.code;
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
                    if(join) {
                        me.stackX.pop();

                        const crossingData = this.Gramatic.gerenateCrossingTabParsingToken(join);

                        crossingData?.reverse().forEach((value) => {
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
