let buttonCalcular = document.querySelector("#btnC") // botão "Calcular" como variavel


buttonCalcular.onclick = function principal(){
    let nome = document.querySelector("#nome").value
    let intervalo 
    let dados = document.querySelector("#dados").value.split("; ") // valores das variaveis tranformados em lista
    let listaQnt = []
    let tipo1 // recebe o valor dos radios 1
    let tipo2 // recebe o valor dos radios 2
    let qnt_total=0 

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
        intervalo = dados[dados.length] - dados[0]
        let k = Math.sqrt(dados.length)
        intervalo = intervalo / k
        let cont = 0
        let cont2 
        do{
            cont2 = 0
            cont++
            for(var i = cont; i <= dados.length; i++){
                if(parseFloat(dados[i]) <  intervalo * cont + parseFloat(dados[0])  ){
                    listaQnt[i - 1] = listaQnt[i - 1] + listaQnt[i]
                    dados.splice(i, 1)
                    listaQnt.splice(i, 1)
                    i = i - 1
                    cont2++
                }
            }
            
            console.log(cont, cont2, i)
        }while(cont2 > 0)
    }

    //CALCULOS TABELA
    //quantidade total inserida
    for(var i = 0; i < listaQnt.length; i++){
        qnt_total += listaQnt[i]
    }

    //frequencia relativa
    let fRelativa = []
    for(var i = 0; i < listaQnt.length; i++){
        fRelativa[i] = (listaQnt[i] / qnt_total).toFixed(3)
    }
console.log(qnt_total)
console.log(fRelativa)

    //frequencia acumulada
    fAcumulada = []
    fAcumulada[0] = fRelativa[0]
    for(var i = 1; i < listaQnt.length; i++){
        fAcumulada[i] = (parseFloat(fAcumulada[i - 1]) + parseFloat(fRelativa[i])).toFixed(3) 
    }
console.log(fAcumulada)    

 // TABELA 

    let tabela = document.getElementById("tabela")

    let tabela_str = [
        '<table>',
  '<thead>',
  '<tr>',
    '<th>' + nome + '</th>',
  '<th>Quantidade</th>',
  '<th>frequencia Relativa </th>',
  '<th>freuqencia em porcentagem</th>',
  '<th>acumulo</th>',
  '<th>acumulo em porcentagem</th>',
  '</tr>',
  '</thead>',
  '<tbody>']


  for(var i = 0; i < dados.length; i++){
    tabela_str.push('<tr>',
    '<td>' + dados[i] + '</td>',
    '<td>' + listaQnt[i] + '</td>',
    '<td>' + fRelativa[i] + '</td>',
    '<td>' + ' %' + (fRelativa[i] * 100).toFixed(3) + '</td>',
    '<td>' + fAcumulada[i] + '</td>',
    '<td>' + ' %' + (fAcumulada[i] * 100).toFixed(3) + '</td>',
    '</tr>'
)
  }
  
  tabela_str[tabela_str.length ] = '</tbody>';
  tabela_str[tabela_str.length ] = '</table>';

    tabela.innerHTML = tabela_str.join("\n");
    console.log(tabela_str)
    }