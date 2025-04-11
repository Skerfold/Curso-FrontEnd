var prompt = require("prompt-sync")();

//Calculadora Simples

// Funções
//Soma 
function soma(a,b){
    return(a+b);
}

// Subtração
function subtracao(a,b){
    return(a-b);
}

// Multiplicação
function multiplicacao(a,b){
    return(a*b);
}

// Divisão
function divisao(a,b){
    return(a/b);
}

function menu(){
    console.log("Escolha a Operação Desejada")
    console.log("1. Soma")
    console.log("2. Subtração")
    console.log("3. Multiplicação")
    console.log("4. Divisão")

    let operacao = Number(prompt());
    switch (operacao){
        case 1:
            var a = Number(prompt("Informe o 1º número"));
            var b = Number(prompt("Informe o 2º número"));
            console.log(soma(a,b))
            break;

        case 2:
            var a = Number(prompt("Informe o 1º número"));
            var b = Number(prompt("Informe o 2º número"));
            console.log(sub(a,b))
            break;

        case 3:
            var a = Number(prompt("Informe o 1º número"));
            var b = Number(prompt("Informe o 2º número"));
            console.log(multi(a,b))
            break;

        case 4:
            var a = Number(prompt("Informe o 1º número"));
            var b = Number(prompt("Informe o 2º número"));
            if (b==0) {
                console.log("Não dividirás por 0")
            } else {
                div(a,b);
            }
            break;
        default:
            console.log("Apenas Operações Válidas")
            break;
    }
}
menu();
