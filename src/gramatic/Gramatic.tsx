const Gramatic = class {
    Gramatics = new Map<string, number>();
    Delimitres = [" ", "\n"];

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
        this.Gramatics.set("OF", 1);
        this.Gramatics.set("CALL", 1);
        this.Gramatics.set("GOTO", 1);
        this.Gramatics.set("IF", 1);
        this.Gramatics.set("THEN", 1);
        this.Gramatics.set("ELSE", 1);
        this.Gramatics.set("WHILE", 1);
        this.Gramatics.set("DO", 1);
        this.Gramatics.set("REPEAT", 1);
        this.Gramatics.set("UNTIL", 1);
        this.Gramatics.set("READLN", 2);
        this.Gramatics.set("WRITELN", 2);
        this.Gramatics.set("OR", 2);
        this.Gramatics.set("AND", 2);
        this.Gramatics.set("NOT", 2);
        this.Gramatics.set("IDENTIFICADOR", 2);
        this.Gramatics.set("INTEIRO", 2);
        this.Gramatics.set("FOR", 2);
        this.Gramatics.set("TO", 2);
        this.Gramatics.set("CASE", 2);
        this.Gramatics.set("+", 3);
        this.Gramatics.set("-", 3);
        this.Gramatics.set("*", 3);
        this.Gramatics.set("/", 3);
        this.Gramatics.set("[", 3);
        this.Gramatics.set("]", 3);
        this.Gramatics.set("(", 3);
        this.Gramatics.set(")", 3);
        this.Gramatics.set(":=", 3);
        this.Gramatics.set(":", 3);
        this.Gramatics.set("=", 4);
        this.Gramatics.set(">", 4);
        this.Gramatics.set(">=", 4);
        this.Gramatics.set("<", 4);
        this.Gramatics.set("<=", 4);
        this.Gramatics.set("< >", 4);
        this.Gramatics.set(",", 4);
        this.Gramatics.set(";", 4);
        this.Gramatics.set("LITERAL", 4);
        this.Gramatics.set(".", 4);
        this.Gramatics.set("..", 5);
        this.Gramatics.set("$", 5);
    }

    getGramatic(){
        return this.Gramatics;
    }

    getTokenIdentificationCode(token: string) : number{
        return this.Gramatics.get(token.toUpperCase()) || 0;
    }

}

export default Gramatic;