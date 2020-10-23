const Gramatic = class {
    Gramatics = new Map();
    Delimitres = [" ", "\n"];

    constructor(){
        this.inicializa();
    }

    inicializa() {
        this.setGramatic();
    }

    setGramatic(){
        this.Gramatics.set(1, "Program ");
        this.Gramatics.set(2, "Label ");
        this.Gramatics.set(3, "Const ");
        this.Gramatics.set(4, "Var");
        this.Gramatics.set(5, "Procedure ");
        this.Gramatics.set(6, "Begin ");
        this.Gramatics.set(7, "End ");
        this.Gramatics.set(8, "Integer");
        this.Gramatics.set(9, "Array ");
        this.Gramatics.set(10, "Of ");
        this.Gramatics.set(11, "Call ");
        this.Gramatics.set(12, "Goto ");
        this.Gramatics.set(13, "If ");
        this.Gramatics.set(14, "Then ");
        this.Gramatics.set(15, "Else");
        this.Gramatics.set(16, "While ");
        this.Gramatics.set(17, "Do ");
        this.Gramatics.set(18, "Repeat ");
        this.Gramatics.set(19, "Until ");
        this.Gramatics.set(20, "Readln ");
        this.Gramatics.set(21, "Writeln ");
        this.Gramatics.set(22, "Or ");
        this.Gramatics.set(23, "And ");
        this.Gramatics.set(24, "Not");
        this.Gramatics.set(25, "Identificador");
        this.Gramatics.set(26, "Inteiro ");
        this.Gramatics.set(27, "For");
        this.Gramatics.set(28, "To ");
        this.Gramatics.set(29, "Case ");
        this.Gramatics.set(30, "+ ");
        this.Gramatics.set(31, "- ");
        this.Gramatics.set(32, "* ");
        this.Gramatics.set(33, "/ ");
        this.Gramatics.set(34, "[ ");
        this.Gramatics.set(35, "] ");
        this.Gramatics.set(36, "( ");
        this.Gramatics.set(37, ") ");
        this.Gramatics.set(38, ":= ");
        this.Gramatics.set(39, ": ");
        this.Gramatics.set(40, "= ");
        this.Gramatics.set(41, ">");
        this.Gramatics.set(42, ">=");
        this.Gramatics.set(43, "<");
        this.Gramatics.set(44, "<=");
        this.Gramatics.set(45, "< >");
        this.Gramatics.set(46, ",");
        this.Gramatics.set(47, ";");
        this.Gramatics.set(48, "literal");
        this.Gramatics.set(49, ".");
        this.Gramatics.set(50, ".. ");
        this.Gramatics.set(51, "$");
    }

    getGramatic(){
        return this.Gramatics;
    }

}

export default Gramatic;