


let notas = []; // Delcarado o vetor em notas

function InserirNotas() {
    let nota = Number(prompt("Digite a nota: "))
    notas.push(nota);
}

function calcularmedia() {
    let media = notas.reduce((media, nota) => media + nota) / notas.length;
    console.log("A média é " + media);
}

function menu() {
    let continuar = true;
    while (continuar) {
        console.log("===Sistema de notas / média===");
        console.log("| 1. Inserir notas |");
        console.log("| 2. Calcular médai |");
        console.log("| 3. Sair |");
        console.log("===============");
        operador = prompt("Informe a opção: ");

        switch (operador) {
            case "1":
                InserirNotas();

                break;
            case "2":
                calcularmedia();

                break;

            case "3":
                continuar = false;
                console.log("Saindo... ")
                break;

            default:
                console.log("Digite uma opção válida :P");
                break;
        } // Fim do switch 
    } // Fim do while
} // Fim da function ( menu )

menu();

