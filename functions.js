let buttonCalcular = document.querySelector("#btnC") // botão "Calcular" como variavel


buttonCalcular.onclick = function principal(){
    let nomeVariavel = document.querySelector("#nomeVar").value
    let listaDados = document.querySelector("#textoDados").value.split(" ") // valores das variaveis tranformados em lista
    let verifica_1 // recebe o valor dos radios 1
    let verifica_2 // recebe o valor dos radios 2

    // verifica qual radio da variavel 1 foi selecionado
    var radios_1 = document.getElementsByName("tipoVariavel");
    for (var i = 0; i < radios_1.length; i++) {
        if (radios_1[i].checked) {
            verifica_1 = radios_1[i].value
        }
    }

    // verifica qual radio da variavel 2 foi selecionado
    var radios_2 = document.getElementsByName("tipoVariavel2");
    for (var i = 0; i < radios_2.length; i++) {
        if (radios_2[i].checked) {
            verifica_2 = radios_2[i].value
        }
    }

    console.log(verifica_1, " ", verifica_2)
}