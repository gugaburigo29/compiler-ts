import {IToken, IVariable, VariableType} from "../store/table/actions";

type MapVariables = {[value: string]: IVariable[]};

class Semantic {
    private tokens: IToken[];
    /* Renomear */
    private funcaoParam: MapVariables;
    private variables: IVariable[];

    constructor(tokens: IToken[]){
        this.tokens = tokens;
        this.funcaoParam = {};
        this.variables = [];
    }

    validate(){
        const memo: IVariable[] = [];

        let category = "";
        let isProcedure = false;
        let isStart = false;

        for (let i = 0; i < this.tokens.length; i++) {
            let token =  this.tokens[i];

            switch (token.code) {
                case 2:
                    category = "Label"
                    break;
                case 3:
                    category = "Constante"
                    break;
                case 4:
                    category = "Variavel"
                    break;
                case 5:
                    category = "Procedura"
                    break;
                case 6:
                    isStart = true;
                    if (!memo.length) {
                        console.log('Erro')
                    }
                    break;
                case 7:
                    if (isProcedure) {
                        isProcedure = false;
                        // delete var
                    }
                    break;
                case 8:
                    for (const iVariable of memo) {
                        iVariable.tipo = VariableType.INTEGER;
                        // insert var
                    }
                    break;
                case 9:
                    for (const iVariable of memo) {
                        iVariable.tipo = VariableType.INTEGER;
                        // insert var
                    }
                    break;
                case 11:
                    let procedureVars: IVariable[] = [];
                    let isFirst = false;
                    let procedure = "";
                    let counter = 0;

                    // @ts-ignore
                    while(token.code != 37){
                        i++;
                        token = this.tokens[i];

                        if (token.code === 25) {
                            if(!isFirst) {
                                procedure = token.word;
                                procedureVars = this.funcaoParam[procedure];
                                isFirst = true;
                            } else {
                                if (counter === procedureVars.length && counter != 0) {
                                    throw new Error(`Semantico ${token.line} Era esperado ${counter} argumentos e foram passados mais.`)
                                }
                                // AQUI
                            }
                        }
                    }
                    break;
            }
        }
    }
}

export default Semantic;
