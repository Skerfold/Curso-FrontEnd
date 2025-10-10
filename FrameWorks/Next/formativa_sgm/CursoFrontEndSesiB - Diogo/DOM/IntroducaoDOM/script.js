function alterarTexto() {
    document.getElementById("titulo").innerText = "Texto Alterado!";
}

//getElementById -seleção do elemento pelo ID
let titulo = document.getElementById("titulo");
//variavel comum
titulo.style.color = "blue";

//getElementsByClassName - Vetor
let descricao = document.getElementsByClassName("descricao");
descricao[1].style.fontWeight = "bold";
descricao[2].style.color = "green";

// getElementsByTagName -> vetor
let todosParagrafos = document.getElementsByTagName("p");
console.log(todosParagrafos.length);

//querySelector ->Primeiro elemento -> comum
let primeiroDescricao = document.querySelector(".descricao");
primeiroDescricao.style.color = "red";

//querySelectorAll -> Todos Elementos -> Vetor
let ps = document.querySelectorAll("p");
ps.forEach(p => p.style.fontSize = "18px");