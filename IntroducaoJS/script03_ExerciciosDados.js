var prompt = require("prompt-sync")();
// Exercício 1 - Par Impar

var numero = Number(prompt("Informe um número: "));

if ((numero%2)==0) {
    console.log("O número digitado é par")
} else {
    console.log("O número é ímpar")
}

// Exercício 2 - Laço For

for (let i = 1; i <= 100; i++) {
    console.log(i);    
}