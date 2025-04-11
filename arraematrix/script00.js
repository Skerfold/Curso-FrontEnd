// Arrays e matrizes

//map
numerosNovos = numeros.map(x => x>25 );
console.log(numerosNovos);

// Declaração de um array
let dados = []; // uso do colchetes permite a declaração de um array

let numeros = [1,2,3,4,5,6,7,8,9];
let palavras = ["Bola", "Casa", "XD"]; 

console.log(numeros.length); // Quantidade de elementos do array

// indicees do array

// imprimir o 5º elemento de um array 

console.log(numeros[4]) // 5

// adicionar elementos em um array 

palavras.push("Cachorro"); // no final do array
console.log(palavras);

palavras.unshift("Prédio")
console.log(palavras);

// Remover elementos
palavras.pop(); // remove o ultimo elemento do array
console.log(palavras);

palavras.shift(); // removee o primeiro elemento do array
console.log(palavras);

// forEach ( repetição em um vetor)
palavras.forEach(palavra => {
    console.log(palavra);
});

// Splice 

palavras.splice(1,1);

// Manipulção de arrays
let numerosDobro = numeros.map(x => x*10);
console.log(numerosDobro);

// Percorrer um array ( loop ) - for

/*

...
...
. . .

How could i ever trust in someone like you...
I hate you.
I HATE YOU.
Burn, burn, burnn,burn , burn.
I hope you will b u r n  i n   h e l l

*/