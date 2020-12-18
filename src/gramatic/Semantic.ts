import {IToken, IVariable, VariableType} from "../store/table/actions";

type MapVariables = { [value: string]: IVariable[] };

class Semantic {
    private tokens: IToken[];
    private parameterFunction: MapVariables;
    private variables: IVariable[];

    constructor(tokens: IToken[]) {
        this.tokens = tokens;
        this.parameterFunction = {};
        this.variables = [];
    }

    validate() {
        const memo: IVariable[] = [];

        let category: VariableType = VariableType.NULL;
        let isProcedure = false;
        let isStart = false;

        for (let i = 0; i < this.tokens.length; i++) {
            let token = this.tokens[i];

            switch (token.code) {
                case 2:
                    category = VariableType.LABEL
                    break;
                case 3:
                    category = VariableType.CONSTANT
                    break;
                case 4:
                    category = VariableType.VARIABLE
                    break;
                case 5:
                    category = VariableType.PROCEDURE
                    break;
                case 6:
                    isStart = true;
                    if (!memo.length) console.log('Error')
                    break;
                case 7:
                    if (isProcedure) {
                        isProcedure = false;
                        this.deleteVariable(1);
                    }
                    break;
                case 8:
                case 9:
                case 26:
                case 48:
                    let varType : VariableType = VariableType.INTEGER; // 8 and 26

                    switch(token.code){
                        case 9:
                            varType = VariableType.ARRAY;
                            break;
                        case 48:
                            varType = VariableType.LITERAL;
                            break;
                    }
                    
                    while(memo.length) {
                        let variable = memo.pop()!;
                        variable.type = varType;
                        this.insertVariable(variable, token);
                    }
                    break;
                case 11:
                    let procedureVars: IVariable[] = [];
                    let isFirst = false;
                    let procedure = "";
                    let counter = 0;

                    while (token.code !== 37) {
                        i++;
                        token = this.tokens[i];

                        if (token.code === 25) {
                            if (!isFirst) {
                                procedure = token.word;
                                procedureVars = this.parameterFunction[procedure];
                                isFirst = true;
                            } else {
                                debugger
                                if (counter === procedureVars.length && counter !== 0) {
                                    throw new Error(`Semantic: Line ${token.line} It was expected ${counter} arguments, but received more.`);
                                }

                                const parametroEsperado = procedureVars[counter];
                                const parametroPassado = this.getVariable(token);

                                if (parametroPassado.type !== parametroEsperado.type) {
                                    throw new Error(`Semantic: Line ${token.line}. It was expected variable type: ${parametroEsperado.type}, but got ${parametroPassado.type}.`);
                                }
                            }
                        } else if (token.code === 26) {
                            const parametroEsperado = procedureVars[counter];

                            if (parametroEsperado.type !== VariableType.INTEGER) {
                                throw new Error(`Semantic: Line ${token.line}. It was expected variable type: ${parametroEsperado.type}, but got INTEGER.`);
                            }
                        } else if (token.code === 48) {
                            const parametroEsperado = procedureVars[counter];
                            if (parametroEsperado.type !== VariableType.LITERAL) {
                                throw new Error(`Semantic: Line ${token.line}. It was expected variable type: ${parametroEsperado.type}, but got LITERAL.`);
                            }
                        } else if (token.code === 46) {
                            counter++;
                        }
                    }
                    counter++;
                    if (counter !== procedureVars.length) {
                        throw new Error(`Semantic: Line ${token.line}. It was expected ${procedureVars.length} arguments but got ${counter}.`);
                    }
                    break;
                case 25:
                    if (isStart) {
                        this.getVariable(token);
                    } else {
                        let position: number;

                        if (isProcedure) {
                            position = 1;
                        } else {
                            position = 0;

                            if (category === VariableType.PROCEDURE) {
                                const auxVar : IVariable = {
                                    pos: 0,
                                    category,
                                    type: VariableType.PROCEDURE,
                                    name: token.word
                                };

                                isProcedure = true;
                                this.insertVariable(auxVar, token);
                                category = VariableType.PARAMETER;
                                
                                break;
                            } else if (category === VariableType.LABEL) {
                                const auxVar : IVariable = {
                                    pos: 0,
                                    category,
                                    type: VariableType.LABEL,
                                    name: token.word
                                };

                                this.insertVariable(auxVar, token);
                                
                                break;
                            }
                        }

                        memo.push({
                            pos: position,
                            name: token.word,
                            type: VariableType.NULL,
                            category
                        });
                    }
                    break;
            }
        }
    }

    private getVariable(token: IToken): IVariable {
        const variable = this.variables.find(value => value.name.toUpperCase() === token.word.toUpperCase());

        if (!variable) {
            throw new Error(`Semantic: Line ${token.line}. The identifier '${token.word}' was not declared!!`);
        }

        return variable;
    }

    private insertVariable(variable: IVariable, token: IToken) {

        const duplicateVariable = this.variables.find(v => v.name.toUpperCase() === variable.name.toUpperCase() && v.pos === variable.pos) || null;

        if(duplicateVariable){
            throw new Error(`Semantic: Line ${token.line}. The identifier '${variable.name}' was already been declared!!`);
        }

        this.variables.push(variable);
    }

    private deleteVariable(position: number) {
        const parameters = this.variables.filter(value => {
            const isSamePosition = value.pos === position;
            const isSameCategory = value.category === "PARAMETER";

            return isSamePosition && isSameCategory;
        });

        this.variables = this.variables.filter(value => value.pos !== position);
        const variable = this.variables[this.variables.length - 1];

        if (variable.category === "PROCEDURE") {
            this.parameterFunction[variable.name] = parameters;
        } else if (parameters.length !== 0) throw new Error('Semantic: Internal error when creating the function parameters!');
    }
}

export default Semantic;