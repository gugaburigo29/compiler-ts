const Gramatic = class {
    Gramatics = new Map<string, number>();
    LineDelimiters = ["\n", ";"];
    WordDelimiters = [" ", ","];

    constructor(){
        this.inicializa();
    }

    inicializa() {
        this.setGramatic();
    }

    setGramatic(){
        this.Gramatics.set("PROGRAM", 1);
        this.Gramatics.set("LABEL", 2);
        this.Gramatics.set("CONST", 3);
        this.Gramatics.set("VAR", 4);
        this.Gramatics.set("PROCEDURE", 5);
        this.Gramatics.set("BEGIN", 6);
        this.Gramatics.set("END", 7);
        this.Gramatics.set("INTEGER", 8);
        this.Gramatics.set("ARRAY", 9);
        this.Gramatics.set("OF", 10);
        this.Gramatics.set("CALL", 11);
        this.Gramatics.set("GOTO", 12);
        this.Gramatics.set("IF", 13);
        this.Gramatics.set("THEN", 14);
        this.Gramatics.set("ELSE", 15);
        this.Gramatics.set("WHILE", 16);
        this.Gramatics.set("DO", 17);
        this.Gramatics.set("REPEAT", 18);
        this.Gramatics.set("UNTIL", 19);
        this.Gramatics.set("READLN", 20);
        this.Gramatics.set("WRITELN", 21);
        this.Gramatics.set("OR", 22);
        this.Gramatics.set("AND", 23);
        this.Gramatics.set("NOT", 24);
        this.Gramatics.set("IDENTIFICADOR", 25);
        this.Gramatics.set("INTEIRO", 26);
        this.Gramatics.set("FOR", 27);
        this.Gramatics.set("TO", 28);
        this.Gramatics.set("CASE", 29);
        this.Gramatics.set("+", 30);
        this.Gramatics.set("-", 31);
        this.Gramatics.set("*", 32);
        this.Gramatics.set("/", 33);
        this.Gramatics.set("[", 34);
        this.Gramatics.set("]", 35);
        this.Gramatics.set("(", 36);
        this.Gramatics.set(")", 37);
        this.Gramatics.set(":=", 38);
        this.Gramatics.set(":", 39);
        this.Gramatics.set("=", 40);
        this.Gramatics.set(">", 41);
        this.Gramatics.set(">=", 42);
        this.Gramatics.set("<", 43);
        this.Gramatics.set("<=", 44);
        this.Gramatics.set("< >", 45);
        this.Gramatics.set(",", 46);
        this.Gramatics.set(";", 47);
        this.Gramatics.set("LITERAL", 48);
        this.Gramatics.set(".", 49);
        this.Gramatics.set("..", 50);
        this.Gramatics.set("$", 51);
    }

    getGramatic(){
        return this.Gramatics;
    }

    getTokenIdentificationCode(token: string) : number{
        return this.Gramatics.get(token.toUpperCase()) || 0;
    }

}

export default Gramatic;