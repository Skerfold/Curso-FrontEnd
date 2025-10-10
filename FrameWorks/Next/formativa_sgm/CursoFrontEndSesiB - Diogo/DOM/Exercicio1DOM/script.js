//1 - Pegar o elemento
let titulo = document.querySelector("#titulo");//select by id
console.log(titulo);

let paragrafo = document.querySelector(".paragrafo");//select by class
console.log(paragrafo);

let button = document.querySelector("button");//select by tag
console.log(button);

// 2 - Alterar texto
function alterarTexto(){
    titulo.innerText= "Novo Título";
    paragrafo.innerText = "Novo Parágrafo";
}

// 3 - Altera Cor de Fundo
function alterarCorFundo(){
    let body = document.querySelector("body");
    body.style.backgroundColor = "blue";
}

//4 - adicionar class
function adicionarClasse(){
    titulo.classList.add("descricao");
    let descricao = document.querySelector(".descricao");
    descricao.style.color = "red";
}