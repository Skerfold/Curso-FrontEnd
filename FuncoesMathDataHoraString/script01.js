// Funções de data e hora

let agora = new Date();
console.log(agora);
console.log(agora.toLocaleString()); 


// Definição de um objeto de classe Date();
// Para a váriavel agora

// Calculo com datas
let date1 = new Date("2025-01-23");
let date2 = new Date("2025-06-18");

let diferença = date2 - date1;

console.log(diferença/(1000*60*60*24)); // Em dias

// Funções de String (texto)

var texto = "Aula de JavaScript!";
console.log(texto.length); // Contar o nº de caracteres 

console.log(texto.toUpperCase()); // TUDO MAISCULO

console.log(texto.toLowerCase()); // tudo minusculo

// Manipulção de texto 

console.log(texto.substring(0,4)); // Aula

console.log(texto.slice(-10));// JavaScript

console.log(texto.replace("JavaScript", "TypeScript"));

// Split ( usar um caractere em comum para separa em um vetor)

let linguagens = "JavaScript, C++, Python, Java, PHP"; 
let arrayLinguagens = linguagens.split(",");
console.log(arrayLinguagens);

// Trim ( tesoura )
let tesoura = "   JavaScript";
console.log(tesoura.trim());
