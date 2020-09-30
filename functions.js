let buttonCalcular = document.querySelector("#btnC") // botão "Calcular" como variavel


buttonCalcular.onclick = function principal(){
    let nome = document.querySelector("#nome").value
    let dados = document.querySelector("#dados").value.split(" ") // valores das variaveis tranformados em lista
    let listaQnt = []
    let tipo1 // recebe o valor dos radios 1
    let tipo2 // recebe o valor dos radios 2

    // verifica qual radio da variavel 1 foi selecionado
    var Tipo1 = document.getElementsByName("tipoVariavel"); // Qualitativa ou quantitativa
    for (var i = 0; i < Tipo1.length; i++) {
        if (Tipo1[i].checked) {
            Tipo1 = Tipo1[i].value
        }
    }

    // verifica qual radio da variavel 2 foi selecionado
    var Tipo2 = document.getElementsByName("tipoVariavel2"); // Amostra ou população
    for (var i = 0; i < Tipo2.length; i++) {
        if (Tipo2[i].checked) {
            Tipo2 = Tipo2[i].value
        }
    }

    //conta os elementos iguais no vetor e exclui os repetidos
    for (var i = 0; i < dados.length; i++){
        listaQnt[i] = 1
    }
    for (var i = 0; i < dados.length; i++){
        for (var j = i + 1; j < dados.length; j++){
            if (dados[i] == dados[j]){
                listaQnt[i] += 1
                dados.splice(j, 1)
                listaQnt.splice(j, 1)
            }
        }
    }

    console.log(tipo1, " ", tipo2)
    console.log(dados)
    console.log(listaQnt)

    // MEDIA

    if (tipo1 !== "Nominal", "Ordinal"){
     let media = (dados[i] + [i])/listaQnt[j]
     document.write(getElementById("media"))
    console.log(media).innerHTML(media)  
    }

 // TABELA 

    function criarTag(elemento){   
        return document.createElement(elemento)

    let tabela = getElementById("tabela");
    let thead = criarTag("thead");
    let tbody = criarTag("tbody");

    let indiceTabela = ["Dados","Frequencia Absoluta","Frequencia Relativa", "Percentual Relativo"];
    let linhaHead = criarTag("tr")

    function coluna(tag, text){

        tag = criarTag(tag);
        tag.textContent = text;
        return tag;
    }

    for (let j= 0; j < indiceTabela.length; j++){
        let th = coluna("th", indiceTabela[j]);
        linhaHead.appendChild(th);
    }  
    thead.appendChild(linhaHead);

    for (let j = 0; j < linhas.length; j++){
        //console.log(lista[j])
        let linhaBody = criarTag("tr");
        for (let i = 0; i < linhas[j].length; i++){
            console.log(linhas[j][i]);

        }
    tbody.appendChild(linhaBody);
    }

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

  }}

