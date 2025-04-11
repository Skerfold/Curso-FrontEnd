// - 1 Pegar o elemento

let titulo = document.querySelector("#titulo");
console.log("titulo");

let paragrafo = document.querySelector(".paragrafo");
console.log("paragrafo");

let button = document.querySelector("button");
console.log("button");

<script src="script.js"></script>

// - 2 Alterar Texto

function alterarTexto(){
    titulo.innerText= "Novo Título";
    paragrafo.innerText= "Novo Parágrafo";
}

// - 3 Alterar cor de fundo
function alterarCorFundo(){
    let body= document.querySelector("body");
    body.style.backgroundColor = "blue";
}

// - 4 Adicionar classes 
function adicionarClasses(){
    titulo.classList.add("descricao")
    let descricao = document.querrySelector("descricao");
    descricao.style.color = "red";
}

// - 5 