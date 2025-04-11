// Funções Matemáticas

//Sqrt // Pow
//Raiz quadrada de 25

console.log(Math.sqrt(25)); // Resultado 5

//Potência

console.log(Math.pow(2, 3)); // Resultado 8
console.log(Math.pow(27, 1 / 3)); // Raiz cúbica

// Arredondamento
//Math.round (Arredonda para o mais próximo)

console.log(Math.round(4.4)); // Resultado será 4
console.log(Math.round(4.7)); // Resultado será 5

//Math.floor ( arredonda pra baixo )
console.log(Math.floor(4.9)); // Resultado será 4

// Math.ceil ( arredonda pra cima )
console.log(Math.ceil(4.4)); // Resultado será 5

// Números aleatórios
console.log(Math.random()); // 0 --> 1

// 0 --> 100 ( Inteiros )
console.log(Math.ceil(Math.random() * 100)); //

// 0 --> 99
console.log(Math.floor(Math.random() * 100)); //

// 0 --> 10000

console.log(Math.floor(Math.random() * 10000)); //

// 0 --> 9999

console.log(Math.floor(Math.random() * 9999)); //

// 0 --> 50
console.log(Math.round(Math.random()* 50));

// 50 --> 100
console.log(Math.round(Math.random()* 50 + 50));


//Maximo, minimo e absoluto
var numeros = [0,1,2,3,4,5,6,7,8,9]; //array 
console.log(Math.max(numeros)); // Maior número da sequência
console.log(Math.min(numeros)); // Menor número da sequência 
var absoluto = -10;
console.log(Math.abs(numeros)); // Módulo

