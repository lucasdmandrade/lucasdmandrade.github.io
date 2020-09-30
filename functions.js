let buttonCalcular = document.querySelector("#btnC") // botão "Calcular" como variavel


buttonCalcular.onclick = function principal(){
    let nome = document.querySelector("#nome").value
    let intervalo = document.querySelector("#intervalo").value
    let dados = document.querySelector("#dados").value.split(" ") // valores das variaveis tranformados em lista
    let listaQnt = []
    let tipo1 // recebe o valor dos radios 1
    let tipo2 // recebe o valor dos radios 2

    // verifica qual radio da variavel 1 foi selecionado
    var Tipo1 = document.getElementsByName("tipoVariavel"); // Qualitativa ou quantitativa
    for (var i = 0; i < Tipo1.length; i++) {
        if (Tipo1[i].checked) {
            tipo1 = Tipo1[i].value
        }
    }

    // verifica qual radio da variavel 2 foi selecionado
    var Tipo2 = document.getElementsByName("tipoVariavel2"); // Amostra ou população
    for (var i = 0; i < Tipo2.length; i++) {
        if (Tipo2[i].checked) {
            tipo2 = Tipo2[i].value
        }
    }

    //conta os elementos iguais no vetor e exclui os repetidos
    for (var i = 0; i < dados.length; i++){
        listaQnt[i] = 1
    }
    for (var i = 0; i < dados.length; i++){
        for (var j = i + 1; j <= dados.length; j++){
            if (dados[i] == dados[j]){
                listaQnt[i] += 1
                dados.splice(j, 1)
                listaQnt.splice(j, 1)
                j = j - 1
            }
        }
    }

    console.log(tipo1, " ", tipo2, " ", intervalo)
    console.log(dados)
    console.log(listaQnt)

    //se for tipo quantitativa precisa colocar em ordenar os dados
    if(tipo1 == "continua" || tipo1 == "discreta"){
        let trocas 
        do {
            trocas = 0
    
            // Percurso do vetor do início até a PENÚLTIMA (length - 2)
            for(let i = 0; i <= dados.length - 2; i++) {
                if(parseInt(dados[i]) > parseFloat(dados[i + 1])) {
                    // Fazer a troca entre os elementos usando DESESTRUTURAÇÃO (destructuring)
                    [dados[i], dados[i + 1]] = [dados[i + 1], dados[i]]
                    trocas++
                    [listaQnt[i], listaQnt[i + 1]] = [listaQnt[i + 1], listaQnt[i]]
                }
            }
        } while(trocas > 0)
    }
    console.log(dados)

    //se for quantitativa ordinal precisa juntar em "intervalos"
    if(tipo1 == "continua"){
        for(var i = 0; i < dados.length; i++){
            for(var j = i + 1; j <= dados.length; j++){
                for(var i_intervalo = 0; i_intervalo < intervalo; i_intervalo++){
                    if(parseFloat(dados[i]) + parseFloat(i_intervalo) == parseFloat(dados[j])){
                        listaQnt[i] = listaQnt[i] + 1
                        listaQnt.splice(j, 1)
                        dados.splice(j, 1)
                        j = j - 1
                    }
                }
            }
        }
    }

 // TABELA 

    let tabela = document.getElementById("tabela")

    let tabela_str = [
        '<table>',
  '<thead>',
  '<tr>']

    tabela_str.push(['<th>' + nome + '</th>',
  '<th>Quantidade</th>',
  '<th>frequencia simples</th>',
  '<th>freuqencia em porcentagem</th>',
  '<th>acumulo</th>',
  '<th>acumulo em porcentagem</th>'
])

  tabela_str.push(['</tr>',
  '</thead>',
  '<tbody>'])

  for(var i = 0; i < dados.length; i++){
    tabela_str.push(['<tr>',
    '<td>' + dados[i] + '</td>',
    '<td>' + listaQnt[i] + '</td>',
    '</tr>'
])
  }
  
  tabela_str.push([
  '</tbody>',
  '</table>'
    ])

    tabela.innerHTML = tabela_str.join("\n");
    }