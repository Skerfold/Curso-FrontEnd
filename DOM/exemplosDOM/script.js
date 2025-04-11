// Exemplo de Script para manipulção DOM 

function clickBTN(){

    //manipulação pelo ID

    let titulo = document.getElementById("titulo");
    console.log(titulo);
    titulo.innerText = "Meu título modificado";
    let li = document.createElement("li");
    let texto = "Modificado o texto do titulo"; 
    li.innerHTML = 'Modificado texto do titulo<button onclick="btnConfere(this)">Confere</button>';

    // querrySelector() -> Váriavel Simples

    document.querySelector(".lista").appendChild(li);
     
    // getElementByClassName() -> vetor .descricao

    let descricao = document.querySelectorAll(".descricao");
    console.log(descricao);
    descricao.array.forEach(element => element.style.color = "red");
    texto = "Modificada Cor da classe Descricao para vermelho";
    li.innerHTML = texto+'Modificado texto do titulo<button onclick="btnConfere(this)">Confere</button>';
    document.querySelector(".lista").appendChild(li);
        
    };
 