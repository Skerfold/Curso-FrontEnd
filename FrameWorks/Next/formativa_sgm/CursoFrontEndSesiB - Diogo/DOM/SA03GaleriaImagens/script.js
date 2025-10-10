//Galeria de Imagens -> DOM

let uploadInput = document.getElementById("upload");
let addButton = document.getElementById("addImage");
let galeria = document.getElementById("galeria");
let carrossel = document.getElementById("carrossel");

//upload das Imagens
let imagens = [];

addButton.addEventListener(
    "click", ()=>{
        //para pegar imagens do computador(local)
        // let file = uploadInput.file[0];
        // if(file){
        //     let reader = new FileReader();
        //     reader.onload = function (e){
        //         let imageUrl = e.target.result;
        //         imagens.push(imageUrl);
        //     }
        // }
        imagemUrl = uploadInput.value.trim();
        if(imagemUrl==="") return ;
        imagens.push(imagemUrl);
        atualizarGaleria();
        atualizarCarrossel();
        uploadInput.value = "";
    });

//atualizarGaleria
function atualizarGaleria(){
    galeria.innerHTML = "";
    imagens.forEach(
        (imagem,index)=>{
            const container = document.createElement("div");
            container.classList.add("imagem-container");

            const img = document.createElement("img");
            img.src = imagem;
            //criar botão para remover imagem
            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "X";
            removeBtn.classList.add("remove");
            removeBtn.addEventListener("click", ()=>{
                imagens.splice(index,1);
                atualizarGaleria();//recursão
                atualizarCarrossel();
            });
            container.appendChild(img);
            container.appendChild(removeBtn);
            galeria.appendChild(container);
        }
    );
}

//atualizar Carrossel
function atualizarCarrossel() {
    carrossel.innerHTML = ""; // Limpa o carrossel antes de atualizar

    imagens.forEach(imagem => {
        let img = document.createElement("img");
        img.src = imagem;
        img.style.width = "100%"; // Garante que a imagem ocupe o espaço correto
        carrossel.appendChild(img);
    });

    carrossel.style.width = `${imagens.length * 100}%`; // Ajusta a largura do carrossel dinamicamente
    iniciarCarrossel();
}

function iniciarCarrossel() {
    let index = 0;

    setInterval(() => {
        index = (index + 1) % imagens.length;
        carrossel.style.transition = `transform ${imagens.length*0.5}s ease-in-out`;
        carrossel.style.transform = `translateX(-${index * (100 / imagens.length)}%)`; // Move corretamente
    }, 2000);
}