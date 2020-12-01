class Gramatic {
    Gramatics = new Map<string, number>();
    Parsing = new Map<string, string>();

    LineDelimiters = [";"];
    WordDelimiters = ["", ","];
    SpecialTokens = ["*", "/", "[", "]", "(", ")", ":=", ":", "=", ">", ">=", "<", "<=", "<>", ",", ";", ".", "$", ".."];
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
        this.Gramatics.set("<>", 45);
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

    setParsing() {
        this.Parsing.set("52,1", "PROGRAM|IDENTIFICADOR|;|BLOCO|.");
        this.Parsing.set("53,2", "DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO");
        this.Parsing.set("53,3", "DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO");
        this.Parsing.set("53,4", "DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO");
        this.Parsing.set("53,5", "DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO");
        this.Parsing.set("53,6", "DCLROT|DCLCONST|DCLVAR|DCLPROC|CORPO");
        this.Parsing.set("54,2", "LABEL|LID|;");
        this.Parsing.set("54,3", "NULL");
        this.Parsing.set("54,4", "NULL");
        this.Parsing.set("54,5", "NULL");
        this.Parsing.set("54,6", "NULL");
        this.Parsing.set("55,25", "IDENTIFICADOR|REPIDENT");
        this.Parsing.set("56,39", "NULL");
        this.Parsing.set("56,46", ",|IDENTIFICADOR|REPIDENT");
        this.Parsing.set("56,47", "NULL");
        this.Parsing.set("57,3", "CONST|IDENTIFICADOR|=|INTEIRO|;|LDCONST");
        this.Parsing.set("57,4", "NULL");
        this.Parsing.set("57,5", "NULL");
        this.Parsing.set("57,6", "NULL");
        this.Parsing.set("58,4", "NULL");
        this.Parsing.set("58,5", "NULL");
        this.Parsing.set("58,6", "NULL");
        this.Parsing.set("58,25", "IDENTIFICADOR|=|INTEIRO|;|LDCONST");
        this.Parsing.set("59,4", "VAR|LID|:|TIPO|;|LDVAR");
        this.Parsing.set("59,5", "NULL");
        this.Parsing.set("59,6", "NULL");
        this.Parsing.set("60,5", "NULL");
        this.Parsing.set("60,6", "NULL");
        this.Parsing.set("60,25", "LID|:|TIPO|;|LDVAR");
        this.Parsing.set("61,8", "INTEGER");
        this.Parsing.set("61,9", "ARRAY|[|INTEIRO|..|INTEIRO|]|OF|INTEGER");
        this.Parsing.set("62,5", "PROCEDURE|IDENTIFICADOR|DEFPAR|;|BLOCO|;|DCLPROC");
        this.Parsing.set("62,6", "NULL");
        this.Parsing.set("63,36", "(|LID|:|INTEGER|)");
        this.Parsing.set("63,39", "NULL");
        this.Parsing.set("64,6", "BEGIN|COMANDO|REPCOMANDO|END");
        this.Parsing.set("65,7", "NULL");
        this.Parsing.set("65,47", ";|COMANDO|REPCOMANDO");
        this.Parsing.set("66,6", "CORPO");
        this.Parsing.set("66,7", "NULL");
        this.Parsing.set("66,11", "CALL|IDENTIFICADOR|PARAMETROS");
        this.Parsing.set("66,12", "GOTO|IDENTIFICADOR");
        this.Parsing.set("66,13", "IF|EXPRESSAO|THEN|COMANDO|ELSEPARTE");
        this.Parsing.set("66,15", "NULL");
        this.Parsing.set("66,16", "WHILE|EXPRESSAO|DO|COMANDO");
        this.Parsing.set("66,18", "REPEAT|COMANDO|UNTIL|EXPRESSAO");
        this.Parsing.set("66,19", "NULL");
        this.Parsing.set("66,20", "READLN|(|VARIAVEL|REPVARIAVEL|)");
        this.Parsing.set("66,21", "WRITELN|(|ITEMSAIDA|REPITEM|)");
        this.Parsing.set("66,25", "IDENTIFICADOR|RCOMID");
        this.Parsing.set("66,27", "FOR|IDENTIFICADOR|:=|EXPRESSAO|TO|EXPRESSAO|DO|COMANDO");
        this.Parsing.set("66,29", "CASE|EXPRESSAO|OF|CONDCASE|END");
        this.Parsing.set("66,47", "NULL");
        this.Parsing.set("67,34", "RVAR|:=|EXPRESSAO");
        this.Parsing.set("67,38", "RVAR|:=|EXPRESSAO");
        this.Parsing.set("67,39", ":|COMANDO");
        this.Parsing.set("68,34", "[|EXPRESSAO|]");
        this.Parsing.set("68,38", "NULL");
        this.Parsing.set("69,7", "NULL");
        this.Parsing.set("69,15", "NULL");
        this.Parsing.set("69,19", "NULL");
        this.Parsing.set("69,36", "(|EXPRESSAO|REPPAR|)");
        this.Parsing.set("69,47", "NULL");
        this.Parsing.set("70,37", "NULL");
        this.Parsing.set("70,46", ",|EXPRESSAO|REPPAR");
        this.Parsing.set("71,7", "NULL");
        this.Parsing.set("71,15", "ELSE|COMANDO");
        this.Parsing.set("71,19", "NULL");
        this.Parsing.set("71,47", "NULL");
        this.Parsing.set("72,25", "IDENTIFICADOR|VARIAVEL1");
        this.Parsing.set("73,7", "NULL");
        this.Parsing.set("73,10", "NULL");
        this.Parsing.set("73,14", "NULL");
        this.Parsing.set("73,15", "NULL");
        this.Parsing.set("73,17", "NULL");
        this.Parsing.set("73,19", "NULL");
        this.Parsing.set("73,22", "NULL");
        this.Parsing.set("73,23", "NULL");
        this.Parsing.set("73,28", "NULL");
        this.Parsing.set("73,30", "NULL");
        this.Parsing.set("73,31", "NULL");
        this.Parsing.set("73,32", "NULL");
        this.Parsing.set("73,33", "NULL");
        this.Parsing.set("73,34", "[|EXPRESSAO|]");
        this.Parsing.set("73,35", "NULL");
        this.Parsing.set("73,37", "NULL");
        this.Parsing.set("73,40", "NULL");
        this.Parsing.set("73,41", "NULL");
        this.Parsing.set("73,42", "NULL");
        this.Parsing.set("73,43", "NULL");
        this.Parsing.set("73,44", "NULL");
        this.Parsing.set("73,45", "NULL");
        this.Parsing.set("73,46", "NULL");
        this.Parsing.set("73,47", "NULL");
        this.Parsing.set("74,37", "NULL");
        this.Parsing.set("74,46", ",|VARIAVEL|REPVARIAVEL");
        this.Parsing.set("75,24", "EXPRESSAO");
        this.Parsing.set("75,25", "EXPRESSAO");
        this.Parsing.set("75,26", "EXPRESSAO");
        this.Parsing.set("75,30", "EXPRESSAO");
        this.Parsing.set("75,31", "EXPRESSAO");
        this.Parsing.set("75,36", "EXPRESSAO");
        this.Parsing.set("75,48", "LITERAL");
        this.Parsing.set("76,37", "NULL");
        this.Parsing.set("76,46", ",|ITEMSAIDA|REPITEM");
        this.Parsing.set("77,24", "EXPSIMP|REPEXPSIMP");
        this.Parsing.set("77,25", "EXPSIMP|REPEXPSIMP");
        this.Parsing.set("77,26", "EXPSIMP|REPEXPSIMP");
        this.Parsing.set("77,30", "EXPSIMP|REPEXPSIMP");
        this.Parsing.set("77,31", "EXPSIMP|REPEXPSIMP");
        this.Parsing.set("77,36", "EXPSIMP|REPEXPSIMP");
        this.Parsing.set("78,7", "NULL");
        this.Parsing.set("78,10", "NULL");
        this.Parsing.set("78,14", "NULL");
        this.Parsing.set("78,15", "NULL");
        this.Parsing.set("78,17", "NULL");
        this.Parsing.set("78,19", "NULL");
        this.Parsing.set("78,28", "NULL");
        this.Parsing.set("78,35", "NULL");
        this.Parsing.set("78,37", "NULL");
        this.Parsing.set("78,40", "=|EXPSIMP");
        this.Parsing.set("78,41", ">|EXPSIMP");
        this.Parsing.set("78,42", ">=|EXPSIMP");
        this.Parsing.set("78,43", "<|EXPSIMP");
        this.Parsing.set("78,44", "<=|EXPSIMP");
        this.Parsing.set("78,45", "<>|EXPSIMP");
        this.Parsing.set("78,46", "NULL");
        this.Parsing.set("78,47", "NULL");
        this.Parsing.set("79,24", "TERMO|REPEXP");
        this.Parsing.set("79,25", "TERMO|REPEXP");
        this.Parsing.set("79,26", "TERMO|REPEXP");
        this.Parsing.set("79,30", "+|TERMO|REPEXP");
        this.Parsing.set("79,31", "-|TERMO|REPEXP");
        this.Parsing.set("79,36", "TERMO|REPEXP");
        this.Parsing.set("80,7", "NULL");
        this.Parsing.set("80,10", "NULL");
        this.Parsing.set("80,14", "NULL");
        this.Parsing.set("80,15", "NULL");
        this.Parsing.set("80,17", "NULL");
        this.Parsing.set("80,19", "NULL");
        this.Parsing.set("80,22", "OR|TERMO|REPEXP");
        this.Parsing.set("80,28", "NULL");
        this.Parsing.set("80,30", "+|TERMO|REPEXP");
        this.Parsing.set("80,31", "-|TERMO|REPEXP");
        this.Parsing.set("80,35", "NULL");
        this.Parsing.set("80,37", "NULL");
        this.Parsing.set("80,40", "NULL");
        this.Parsing.set("80,41", "NULL");
        this.Parsing.set("80,42", "NULL");
        this.Parsing.set("80,43", "NULL");
        this.Parsing.set("80,44", "NULL");
        this.Parsing.set("80,45", "NULL");
        this.Parsing.set("80,46", "NULL");
        this.Parsing.set("80,47", "NULL");
        this.Parsing.set("81,24", "FATOR|REPTERMO");
        this.Parsing.set("81,25", "FATOR|REPTERMO");
        this.Parsing.set("81,26", "FATOR|REPTERMO");
        this.Parsing.set("81,36", "FATOR|REPTERMO");
        this.Parsing.set("82,7", "NULL");
        this.Parsing.set("82,10", "NULL");
        this.Parsing.set("82,14", "NULL");
        this.Parsing.set("82,15", "NULL");
        this.Parsing.set("82,17", "NULL");
        this.Parsing.set("82,19", "NULL");
        this.Parsing.set("82,22", "NULL");
        this.Parsing.set("82,23", "AND|FATOR|REPTERMO");
        this.Parsing.set("82,28", "NULL");
        this.Parsing.set("82,30", "NULL");
        this.Parsing.set("82,31", "NULL");
        this.Parsing.set("82,32", "*|FATOR|REPTERMO");
        this.Parsing.set("82,33", "/|FATOR|REPTERMO");
        this.Parsing.set("82,35", "NULL");
        this.Parsing.set("82,37", "NULL");
        this.Parsing.set("82,40", "NULL");
        this.Parsing.set("82,41", "NULL");
        this.Parsing.set("82,42", "NULL");
        this.Parsing.set("82,43", "NULL");
        this.Parsing.set("82,44", "NULL");
        this.Parsing.set("82,45", "NULL");
        this.Parsing.set("82,46", "NULL");
        this.Parsing.set("82,47", "NULL");
        this.Parsing.set("83,24", "NOT|FATOR");
        this.Parsing.set("83,25", "VARIAVEL");
        this.Parsing.set("83,26", "INTEIRO");
        this.Parsing.set("83,36", "(|EXPRESSAO|)");
        this.Parsing.set("84,26", "INTEIRO|RPINTEIRO|:|COMANDO|CONTCASE");
        this.Parsing.set("85,7", "NULL");
        this.Parsing.set("85,47", ";|CONDCASE");
        this.Parsing.set("86,39", "NULL");
        this.Parsing.set("86,46", ",|INTEIRO|RPINTEIRO");
    }

    getParsing(parsing: string) {
        return this.Parsing.get(parsing);
    }

    gerenateCrossingTabParsingToken(parsing: string) {
        if (parsing) {
            const tokens: string[] = parsing.split(this.ParsingDivider);
            const data = tokens.map((value) => (this.getTokenIdentificationCode(value)));

            return data;
        }
        return null;
    }
}

export default Gramatic;
