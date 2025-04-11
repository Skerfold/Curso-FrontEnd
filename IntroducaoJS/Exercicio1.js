var prompt = require("prompt-sync")();

//Exercício 1 - Verificação de Idade
// Crie um código que peça a idade do usuário e diga se ele é menor de idade, adulto ou idoso.

var idade = Number(prompt("Informe um número: "));
 
if (idade<18) {
    console.log("Você é de menor!")
} else if (idade > 18 && idade < 60){
    console.log("Você é adulto!")
} else {
    console.log("Você é idoso!")
}
