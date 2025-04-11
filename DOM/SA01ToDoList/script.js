const btnAdicionar = document.getElementById("btnAdicionar");
document.getElementById("btnAdicionar").addEventListener("click", adicionarTarefa).addEventListener(
    "mouseenter",
    (event) => {
      // Faz o botão brilhar
      button.target.style.color = "purple";
    
      setTimeout(() => {
        button.target.style.color = "";
      }, 500);
    },
    false,
  );

function adicionarTarefa() {
  let input = document.getElementById("tarefa");
  let texto = input.value.trim();

  if (texto==="") {
    return; // interrompe a function
  }

  // Continua o código sem necessidade de else - se texto não for vazio
  let li = document.createElement("li");
  li.innerHTML = texto+'<button onclick="removerTarefa(this)">Remover</button>'; // Criei o conteúdo do item do LI

  let ul = document.getElementById("lista");
  ul.appendChild(li); // Adicionar o item a lista

  input.value = "";

}

function removerTarefa(botao){ // Função do boatão para remover o elemento pai ( parent ) (li); 
    botao.parentElement.remove(); 
}

