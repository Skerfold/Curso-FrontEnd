document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede envio sem validação

    let isValid = true;
    let inputs = document.querySelectorAll(".input-group input");
    
    inputs.forEach(input => {
        let errorMessage = input.nextElementSibling;
        if (input.value.trim() === "") {
            errorMessage.textContent = "Este campo é obrigatório.";
            isValid = false;
        } else {
            errorMessage.textContent = "";
        }
    });

    if (isValid) {
        alert("Formulário enviado com sucesso!");
    }
});
