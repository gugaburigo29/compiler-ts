import { debug } from "console";
import { TokenInterface } from "../store/table/actions";
import Gramatic from "./Gramatic";

class Syntatic {
    stackX: Array<number>;
    stackA: Array<TokenInterface>;
    Gramatic: Gramatic;
    join: string;
    lastJoin: string;

    constructor() {
        this.stackX = [];
        this.stackA = [];
        this.Gramatic = new Gramatic();
        this.join = "";
        this.lastJoin = "";
    }

    initializeStacks(tokens: TokenInterface[]) {
        this.stackX.push(52); // Add 52(PROGRAM) on the top of stack
        this.stackA = [...tokens];
        this.stackA.reverse();
    }

    analyse(tokens: TokenInterface[]) {
        var me = this;
        this.initializeStacks(tokens);

        while (this.stackA.length && this.stackX.length) {
            let topX: number = this.stackX[this.getLengthStackX()];
            let topA: TokenInterface = this.stackA[this.getLengthStackA()];

            let code: number = topA.code;

            if(topX && topX < 52) {
                if (topX === code) {
                    me.stackA.pop();
                    me.stackX.pop();
                } else {
                    debugger
                    throw new Error(`Syntatic error!! It was expected: ${this.setParsingError()} but we got '${topA.word}' on line ${topA.line} .`);
                }
            } else {
                this.join = this.Gramatic.getParsing(topX + "," + code) || "";
                this.lastJoin = this.join || this.lastJoin;
                me.stackX.pop();
                
                const crossingData = this.Gramatic.gerenateCrossingTabParsingToken(this.join);
                
                crossingData?.reverse().forEach((value) => {
                    this.stackX.push(value as number);
                });
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
    
    setParsingError(){
        const parsings = this.lastJoin.split(this.Gramatic.ParsingDivider);
        let message = "";
        parsings.map((value, index) => {
            if(index > 0) message += ' or '
            message += `'${value}'`
        });

        return message;
    }
}

export default Syntatic;
