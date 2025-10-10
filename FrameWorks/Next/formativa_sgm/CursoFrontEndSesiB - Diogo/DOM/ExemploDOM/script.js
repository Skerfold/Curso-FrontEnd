//Exemplo de Script para Manipulação DOM

function clickBtn(){
    //manipulação pelo ID -> Variável Simples
    let titulo = document.getElementById("titulo");
    console.log(titulo);
    titulo.innerText = "Meu Título Modificado";
    let li = document.createElement("li");
    let texto = "Modificado Texto do Título";
    li.innerHTML = texto+'<button onclick="btnConfere(this)">Confere</button>';
    //querySelector -> Variável Simples
    document.querySelector(".lista").append(li);
    //getElementsByClassName -> vetor .descricao
    let descricao = document.querySelectorAll(".descricao");
    console.log(descricao);
    descricao.forEach(element => element.style.color = "red");
    texto = "Modificado Cor da Classe descricao para Vermelho";
    li.innerHTML = texto+'<button onclick="btnConfere(this)">Confere</button>';
    document.querySelector(".lista").append(li);

}