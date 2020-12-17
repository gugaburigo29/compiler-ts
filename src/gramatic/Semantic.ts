import {IToken, IVariable, VariableType} from "../store/table/actions";

type MapVariables = { [value: string]: IVariable[] };

class Semantic {
    private tokens: IToken[];
    /* Renomear */
    private funcaoParam: MapVariables;
    private variables: IVariable[];

    constructor(tokens: IToken[]) {
        this.tokens = tokens;
        this.funcaoParam = {};
        this.variables = [];
    }

    validate() {
        const memo: IVariable[] = [];

        let category = "";
        let isProcedure = false;
        let isStart = false;

        for (let i = 0; i < this.tokens.length; i++) {
            let token = this.tokens[i];

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
                    category = "Procedure"
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
                        this.deleteVariable(1);
                    }
                    break;
                case 8:
                    for (const iVariable of memo) {
                        iVariable.tipo = VariableType.INTEGER;
                        this.insertVariable(iVariable, token);
                    }
                    break;
                case 9:
                    for (const iVariable of memo) {
                        iVariable.tipo = VariableType.INTEGER;
                        this.insertVariable(iVariable, token);
                    }
                    break;
                case 11:
                    let procedureVars: IVariable[] = [];
                    let isFirst = false;
                    let procedure = "";
                    let counter = 0;

                    while (token.code != 37) {
                        i++;
                        token = this.tokens[i];

                        if (token.code === 25) {
                            if (!isFirst) {
                                procedure = token.word;
                                procedureVars = this.funcaoParam[procedure];
                                isFirst = true;
                            } else {
                                if (counter === procedureVars.length && counter != 0) {
                                    throw new Error(`Semantico ${token.line} Era esperado ${counter} argumentos e foram passados mais.`)
                                }

                                const parametroEsperado = procedureVars[counter];
                                const parametroPassado = this.getVariable(token);

                                if (parametroPassado.tipo !== parametroEsperado.tipo) {
                                    throw new Error("Semantico" + token.line + "Era esperado variável do tipo" + parametroEsperado.tipo + ", porém foi recebido o tipo" + parametroPassado.tipo);
                                }
                            }
                        } else if (token.code == 26) {
                            const parametroEsperado = procedureVars[counter];

                            if (parametroEsperado.tipo !== VariableType.INTEGER) {
                                throw new Error("Semantico" + token.line + "Era esperado variável do tipo" + parametroEsperado.tipo + ", porém foi recebido o tipo Integer");
                            }
                        } else if (token.code == 48) {
                            const parametroEsperado = procedureVars[counter];

                            if (parametroEsperado.tipo !== VariableType.LITERAL) {
                                throw new Error("Semantico" + token.line + "Era esperado variável do tipo" + parametroEsperado.tipo + ", porém foi recebido o tipo Literal");
                            }
                        } else if (token.code == 46) {
                            counter++;
                        }
                    }

                    counter++;

                    if (counter != procedureVars.length) {
                        throw new Error("Semantico" + token.line + "Era esperado " + procedureVars.length + " argumentos e foram passados " + counter);
                    }
                    break;
                case 25:
                    if (isStart) {
                        this.getVariable(token);
                    } else if (!isStart) {
                        let position: number;

                        if (isProcedure) {
                            position = 1;
                        } else {
                            position = 0;

                            if (category == "Procedure") {
                                const auxVar = {} as IVariable;
                                isProcedure = true;
                                auxVar.tipo = VariableType.PROCEDURE;
                                this.insertVariable(auxVar, token);
                                category = "Parameter";
                                break;
                            } else if (category == "Label") {
                                const auxVar = {} as IVariable;
                                auxVar.tipo = VariableType.LABEL;
                                this.insertVariable(auxVar, token);
                                break;
                            }
                        }

                        memo.push({
                            pos: position,
                            name: token.word,
                            tipo: undefined,
                            category
                        });
                    }
                    break;
                case 26:
                    for (let iVariable of memo) {
                        const auxVariable: IVariable = {...iVariable, tipo: VariableType.INTEGER};
                        this.insertVariable(auxVariable, token);
                    }
                    break;
                case 48:
                    for (let iVariable of memo) {
                        const auxVariable: IVariable = {...iVariable, tipo: VariableType.LITERAL};
                        this.insertVariable(auxVariable, token);
                    }
                    break;
            }
        }
    }

    private getVariable(token: IToken): IVariable {
        const variable = this.variables.find(value => value.name.toUpperCase() == token.word.toUpperCase());

        if (!variable) {
            throw new Error("Semantico " + token.line + "O identificador '" + token.word + "' não foi declarado.");
        }

        return variable;
    }

    private insertVariable(variable: IVariable, token: IToken) {
        for (const _variable of this.variables) {
            const isSameName = _variable.name.toUpperCase() === variable.name.toUpperCase();
            const isSamePosition = _variable.pos === variable.pos;

            if (isSameName && isSamePosition) {
                throw new Error("Semantico" + token.line + "O identificador '" + token.word + "' já foi declarado");
            }
        }

        this.variables.push(variable);
    }

    private deleteVariable(position: number) {
        const parameters = this.variables.filter(value => {
            const isSamePosition = value.pos == position;
            const isSameCategory = value.category = "Parameter";
            return isSamePosition && isSameCategory;
        });

        const variable = this.variables[this.variables.length - 1];

        if (variable.category == "Procedure") {
            this.funcaoParam[variable.name] = parameters;
        } else if (parameters.length != 0) {
            throw new Error("Semantico " + -1 + " Erro interno ao criar paramentros da fun��o");
        }
    }
}

export default Semantic;
