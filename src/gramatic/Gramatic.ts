class Gramatic {
    Gramatics = new Map<string, number>();
    Parsing = new Map<string, string>();

    LineDelimiters = [";"];
    WordDelimiters = ["", ","];
    SpecialTokens = ["*", "/", "[", "]", "(", ")", ":=", ":", "=", ">", ">=", "<", "<=", "< >", ",", ";", ".", "$", ".."];
    DuplicateTokens = [":", ">", "<", "."];
    IntegerMaxValue = {
        negative: -32767,
        positive: 32767
    };
    ParsingDivider = "|";

    CommentCharacterStart = "(*";
    CommentCharacterEnd = "*)";

    constructor() {
        this.initialize();
    }

    initialize() {
        this.setGramatic();
        this.setParsing();
    }

    setGramatic() {
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

    getGramatic() {
        return this.Gramatics;
    }

    getTokenIdentificationCode(token: string): number {
        let code = this.Gramatics.get(token.toUpperCase()) || 0;

        if (!code) {
            if (isNaN(parseInt(token))) {
                code = this.Gramatics.get('IDENTIFICADOR')!;
            } else {
                code = this.Gramatics.get('INTEIRO')!;
            }
        }

        return code;
    }

    // inverse 
    setParsing() {
        this.Parsing.set("PROGRAM|IDENTIFICADOR|;|BLOCO|." ,"52,1");
        this.Parsing.set("DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO" ,"53,2");
        this.Parsing.set("DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO" ,"53,3");
        this.Parsing.set("DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO" ,"53,4");
        this.Parsing.set("DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO" ,"53,5");
        this.Parsing.set("DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO" ,"53,6");
        this.Parsing.set("LABEL|LID|;" ,"54,2");
        this.Parsing.set("NULL" ,"54,3");
        this.Parsing.set("NULL" ,"54,4");
        this.Parsing.set("NULL" ,"54,5");
        this.Parsing.set("NULL" ,"54,6");
        this.Parsing.set("IDENTIFICADOR|REPIDENT" ,"55,25");
        this.Parsing.set("NULL" ,"56,39");
        this.Parsing.set(",|IDENTIFICADOR|REPIDENT" ,"56,46");
        this.Parsing.set("NULL" ,"56,47");
        this.Parsing.set("CONST|IDENTIFICADOR|=|INTEIRO|;|LDCONST" ,"57,3");
        this.Parsing.set("NULL" ,"57,4");
        this.Parsing.set("NULL" ,"57,5");
        this.Parsing.set("NULL" ,"57,6");
        this.Parsing.set("NULL" ,"58,4");
        this.Parsing.set("NULL" ,"58,5");
        this.Parsing.set("NULL" ,"58,6");
        this.Parsing.set("IDENTIFICADOR|=|INTEIRO|;|LDCONST" ,"58,25");
        this.Parsing.set("VAR|LID|:|TIPO|;|LDVAR" ,"59,4");
        this.Parsing.set("NULL" ,"59,5");
        this.Parsing.set("NULL" ,"59,6");
        this.Parsing.set("NULL" ,"60,5");
        this.Parsing.set("NULL" ,"60,6");
        this.Parsing.set("LID|:|TIPO|;|LDVAR" ,"60,25");
        this.Parsing.set("INTEGER" ,"61,8");
        this.Parsing.set("ARRAY|[|INTEIRO|..|INTEIRO|]|OF|INTEGER" ,"61,9");
        this.Parsing.set("PROCEDURE|IDENTIFICADOR|DEFPAR|;|BLOCO|;|DCLPROC" ,"62,5");
        this.Parsing.set("NULL" ,"62,6");
        this.Parsing.set("(|LID|:|INTEGER|)" ,"63,36");
        this.Parsing.set("NULL" ,"63,39");
        this.Parsing.set("BEGIN|COMANDO|REPCOMANDO|END" ,"64,6");
        this.Parsing.set("NULL" ,"65,7");
        this.Parsing.set(";|COMANDO|REPCOMANDO" ,"65,47");
        this.Parsing.set("CORPO" ,"66,6");
        this.Parsing.set("NULL" ,"66,7");
        this.Parsing.set("CALL|IDENTIFICADOR|PARAMETROS" ,"66,11");
        this.Parsing.set("GOTO|IDENTIFICADOR" ,"66,12");
        this.Parsing.set("IF|EXPRESSAO|THEN|COMANDO|ELSEPARTE" ,"66,13");
        this.Parsing.set("NULL" ,"66,15");
        this.Parsing.set("WHILE|EXPRESSAO|DO|COMANDO" ,"66,16");
        this.Parsing.set("REPEAT|COMANDO|UNTIL|EXPRESSAO" ,"66,18");
        this.Parsing.set("NULL" ,"66,19");
        this.Parsing.set("READLN|(|VARIAVEL|REPVARIAVEL|)" ,"66,20");
        this.Parsing.set("WRITELN|(|ITEMSAIDA|REPITEM|)" ,"66,21");
        this.Parsing.set("IDENTIFICADOR|RCOMID" ,"66,25");
        this.Parsing.set("FOR|IDENTIFICADOR|:=|EXPRESSAO|TO|EXPRESSAO|DO|COMANDO" ,"66,27");
        this.Parsing.set("CASE|EXPRESSAO|OF|CONDCASE|END" ,"66,29");
        this.Parsing.set("NULL" ,"66,47");
        this.Parsing.set("RVAR|:=|EXPRESSAO" ,"67,34");
        this.Parsing.set("RVAR|:=|EXPRESSAO" ,"67,38");
        this.Parsing.set(":|COMANDO" ,"67,39");
        this.Parsing.set("[|EXPRESSAO|]" ,"68,34");
        this.Parsing.set("NULL" ,"68,38");
        this.Parsing.set("NULL" ,"69,7");
        this.Parsing.set("NULL" ,"69,15");
        this.Parsing.set("NULL" ,"69,19");
        this.Parsing.set("(|EXPRESSAO|REPPAR|)" ,"69,36");
        this.Parsing.set("NULL" ,"69,47");
        this.Parsing.set("NULL" ,"70,37");
        this.Parsing.set(",|EXPRESSAO|REPPAR" ,"70,46");
        this.Parsing.set("NULL" ,"71,7");
        this.Parsing.set("ELSE|COMANDO" ,"71,15");
        this.Parsing.set("NULL" ,"71,19");
        this.Parsing.set("NULL" ,"71,47");
        this.Parsing.set("IDENTIFICADOR|VARIAVEL1" ,"72,25");
        this.Parsing.set("NULL" ,"73,7");
        this.Parsing.set("NULL" ,"73,10");
        this.Parsing.set("NULL" ,"73,14");
        this.Parsing.set("NULL" ,"73,15");
        this.Parsing.set("NULL" ,"73,17");
        this.Parsing.set("NULL" ,"73,19");
        this.Parsing.set("NULL" ,"73,22");
        this.Parsing.set("NULL" ,"73,23");
        this.Parsing.set("NULL" ,"73,28");
        this.Parsing.set("NULL" ,"73,30");
        this.Parsing.set("NULL" ,"73,31");
        this.Parsing.set("NULL" ,"73,32");
        this.Parsing.set("NULL" ,"73,33");
        this.Parsing.set("[|EXPRESSAO|]" ,"73,34");
        this.Parsing.set("NULL" ,"73,35");
        this.Parsing.set("NULL" ,"73,37");
        this.Parsing.set("NULL" ,"73,40");
        this.Parsing.set("NULL" ,"73,41");
        this.Parsing.set("NULL" ,"73,42");
        this.Parsing.set("NULL" ,"73,43");
        this.Parsing.set("NULL" ,"73,44");
        this.Parsing.set("NULL" ,"73,45");
        this.Parsing.set("NULL" ,"73,46");
        this.Parsing.set("NULL" ,"73,47");
        this.Parsing.set("NULL" ,"74,37");
        this.Parsing.set(",|VARIAVEL|REPVARIAVEL" ,"74,46");
        this.Parsing.set("EXPRESSAO" ,"75,24");
        this.Parsing.set("EXPRESSAO" ,"75,25");
        this.Parsing.set("EXPRESSAO" ,"75,26");
        this.Parsing.set("EXPRESSAO" ,"75,30");
        this.Parsing.set("EXPRESSAO" ,"75,31");
        this.Parsing.set("EXPRESSAO" ,"75,36");
        this.Parsing.set("LITERAL" ,"75,48");
        this.Parsing.set("NULL" ,"76,37");
        this.Parsing.set(",|ITEMSAIDA|REPITEM" ,"76,46");
        this.Parsing.set("EXPSIMP|REPEXPSIMP" ,"77,24");
        this.Parsing.set("EXPSIMP|REPEXPSIMP" ,"77,25");
        this.Parsing.set("EXPSIMP|REPEXPSIMP" ,"77,26");
        this.Parsing.set("EXPSIMP|REPEXPSIMP" ,"77,30");
        this.Parsing.set("EXPSIMP|REPEXPSIMP" ,"77,31");
        this.Parsing.set("EXPSIMP|REPEXPSIMP" ,"77,36");
        this.Parsing.set("NULL" ,"78,7");
        this.Parsing.set("NULL" ,"78,10");
        this.Parsing.set("NULL" ,"78,14");
        this.Parsing.set("NULL" ,"78,15");
        this.Parsing.set("NULL" ,"78,17");
        this.Parsing.set("NULL" ,"78,19");
        this.Parsing.set("NULL" ,"78,28");
        this.Parsing.set("NULL" ,"78,35");
        this.Parsing.set("NULL" ,"78,37");
        this.Parsing.set("=|EXPSIMP" ,"78,40");
        this.Parsing.set(">|EXPSIMP" ,"78,41");
        this.Parsing.set(">=|EXPSIMP" ,"78,42");
        this.Parsing.set("<|EXPSIMP" ,"78,43");
        this.Parsing.set("<=|EXPSIMP" ,"78,44");
        this.Parsing.set("<>|EXPSIMP" ,"78,45");
        this.Parsing.set("NULL" ,"78,46");
        this.Parsing.set("NULL" ,"78,47");
        this.Parsing.set("TERMO|REPEXP" ,"79,24");
        this.Parsing.set("TERMO|REPEXP" ,"79,25");
        this.Parsing.set("TERMO|REPEXP" ,"79,26");
        this.Parsing.set("+|TERMO|REPEXP" ,"79,30");
        this.Parsing.set("-|TERMO|REPEXP" ,"79,31");
        this.Parsing.set("TERMO|REPEXP" ,"79,36");
        this.Parsing.set("NULL" ,"80,7");
        this.Parsing.set("NULL" ,"80,10");
        this.Parsing.set("NULL" ,"80,14");
        this.Parsing.set("NULL" ,"80,15");
        this.Parsing.set("NULL" ,"80,17");
        this.Parsing.set("NULL" ,"80,19");
        this.Parsing.set("OR|TERMO|REPEXP" ,"80,22");
        this.Parsing.set("NULL" ,"80,28");
        this.Parsing.set("+|TERMO|REPEXP" ,"80,30");
        this.Parsing.set("-|TERMO|REPEXP" ,"80,31");
        this.Parsing.set("NULL" ,"80,35");
        this.Parsing.set("NULL" ,"80,37");
        this.Parsing.set("NULL" ,"80,40");
        this.Parsing.set("NULL" ,"80,41");
        this.Parsing.set("NULL" ,"80,42");
        this.Parsing.set("NULL" ,"80,43");
        this.Parsing.set("NULL" ,"80,44");
        this.Parsing.set("NULL" ,"80,45");
        this.Parsing.set("NULL" ,"80,46");
        this.Parsing.set("NULL" ,"80,47");
        this.Parsing.set("FATOR|REPTERMO" ,"81,24");
        this.Parsing.set("FATOR|REPTERMO" ,"81,25");
        this.Parsing.set("FATOR|REPTERMO" ,"81,26");
        this.Parsing.set("FATOR|REPTERMO" ,"81,36");
        this.Parsing.set("NULL" ,"82,7");
        this.Parsing.set("NULL" ,"82,10");
        this.Parsing.set("NULL" ,"82,14");
        this.Parsing.set("NULL" ,"82,15");
        this.Parsing.set("NULL" ,"82,17");
        this.Parsing.set("NULL" ,"82,19");
        this.Parsing.set("NULL" ,"82,22");
        this.Parsing.set("AND|FATOR|REPTERMO" ,"82,23");
        this.Parsing.set("NULL" ,"82,28");
        this.Parsing.set("NULL" ,"82,30");
        this.Parsing.set("NULL" ,"82,31");
        this.Parsing.set("*|FATOR|REPTERMO" ,"82,32");
        this.Parsing.set("/|FATOR|REPTERMO" ,"82,33");
        this.Parsing.set("NULL" ,"82,35");
        this.Parsing.set("NULL" ,"82,37");
        this.Parsing.set("NULL" ,"82,40");
        this.Parsing.set("NULL" ,"82,41");
        this.Parsing.set("NULL" ,"82,42");
        this.Parsing.set("NULL" ,"82,43");
        this.Parsing.set("NULL" ,"82,44");
        this.Parsing.set("NULL" ,"82,45");
        this.Parsing.set("NULL" ,"82,46");
        this.Parsing.set("NULL" ,"82,47");
        this.Parsing.set("NOT|FATOR" ,"83,24");
        this.Parsing.set("VARIAVEL" ,"83,25");
        this.Parsing.set("INTEIRO" ,"83,26");
        this.Parsing.set("(|EXPRESSAO|)" ,"83,36");
        this.Parsing.set("INTEIRO|RPINTEIRO|:|COMANDO|CONTCASE" ,"84,26");
        this.Parsing.set("NULL" ,"85,7");
        this.Parsing.set(";|CONDCASE" ,"85,47");
        this.Parsing.set("NULL" ,"86,39");
        this.Parsing.set(",|INTEIRO|RPINTEIRO" ,"86,46");
    }

    getParsing(parsing: string) {
        return this.Parsing.get(parsing);
    }

    gerenateCrossingTabParsingToken(parsing: string) {
        if (!parsing) {
            const tokens: string[] = parsing.split(this.ParsingDivider);
            const data = tokens.map((value) => (this.getTokenIdentificationCode(value)));

            return data;
        }
        return null;
    }
}

export default Gramatic;