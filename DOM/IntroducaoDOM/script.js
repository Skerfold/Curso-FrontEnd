function alterarCorFundo(){
    document.ge
}


function alterarTexto() {
    document.getElementById("titulo").innerText = "Texto Alterado!";
};


// getElementById - seleção de elemento pelo ID

let titulo = document.getElementById("titulo");
titulo.style.color = "blue";


// getElementByClassName - seleção de elemento pela classe

let paragrafos = document.getElementsByClassName("descricao");
paragrafos[0].style.fontWeight = "bold";
paragrafos[1].style.fontWeight = "white";

let todosParagrafos = document.getElementsByTagName("p")
console.log(todosParagrafos.length);


// querrySelector -> Primeiro elemento -> Comum

let primeiroDescricao = document.querrySelector(".descricao");
primeiroDescricao.style.color = "red";


// querrySelectorAll -> Todos os elementos -> Transforma em Vetor

let ps = document.querySelectorAll("p");
ps.forEach(p => p.style.fontsize = "10px");
