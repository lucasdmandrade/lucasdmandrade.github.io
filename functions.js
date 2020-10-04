let buttonCalcular = document.querySelector("#btnC") // botão "Calcular" como variavel


buttonCalcular.onclick = function principal(){
    let nome = document.querySelector("#nome").value
    let intervalo = 0
    let dados = document.querySelector("#dados").value.split(";") // valores das variaveis tranformados em lista
    let listaQnt = []
    let tipo1 // recebe o valor dos radios 1
    let tipo2 // recebe o valor dos radios 2
    let qnt_total=0 
    let moda = 0
    let moda_posicao = []
    let media = 0.0
    let separatriz = 0 
    let mediana = 0
    let mediana_posicao = 0
    let mediana_posicao2 = 0
    let mediana_valor = 0
    let mediana2 = 0
    let mediana_continua = 0

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


    let flecha = ""
    //se for quantitativa ordinal precisa juntar em "intervalos"
    if(tipo1 == "continua"){

        flecha = "|-- "


        intervalo = parseFloat(dados[dados.length - 1]) - parseFloat(dados[0]) + 1
        console.log(intervalo)
        let k = Math.round(Math.sqrt(dados.length))
        intervalo = Math.round(parseFloat(intervalo) / k)
        let cont = 0
        let cont2 
        do{
            cont2 = 0
            cont++
            for(var i = cont; i <= dados.length; i++){
                if(parseFloat(dados[i]) <  parseFloat(intervalo) * cont + parseFloat(dados[0])  ){
                    listaQnt[i - 1] = listaQnt[i - 1] + listaQnt[i]
                    dados.splice(i, 1)
                    listaQnt.splice(i, 1)
                    i = i - 1
                    cont2++
                }
            }
            
            console.log(cont, cont2, i, k)
        }while(cont2 > 0)
    }
    console.log(intervalo)

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
    fAcumulada[0] = listaQnt[0]
    for(var i = 1; i < listaQnt.length; i++){
        fAcumulada[i] = (parseFloat(fAcumulada[i - 1]) + parseFloat(listaQnt[i])).toFixed(3) 
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
  '<th>Frequencia Relativa </th>',
  '<th>Frequencia em porcentagem</th>',
  '<th>Acúmulo</th>',
  '<th>Acúmulo em porcentagem</th>',
  '</tr>',
  '</thead>',
  '<tbody>']


  if(flecha == "|-- "){
    for(var i = 0; i < dados.length; i++){
        tabela_str.push('<tr>',
        '<td>' + dados[i] + "  " + flecha + (parseFloat(dados[0]) + intervalo * (i + 1)).toFixed(3) + '</td>',
        '<td>' + listaQnt[i] + '</td>',
        '<td>' + fRelativa[i] + '</td>',
        '<td>' + ' %' + (fRelativa[i] * 100).toFixed(3) + '</td>',
        '<td>' + fAcumulada[i] + '</td>',
        '<td>' + ' %' + (100 / qnt_total * fAcumulada[i]).toFixed(3) + '</td>',
        '</tr>')
      }
  }
  else{
    for(var i = 0; i < dados.length; i++){
        tabela_str.push('<tr>',
        '<td>' + dados[i] + '</td>',
        '<td>' + listaQnt[i] + '</td>',
        '<td>' + fRelativa[i] + '</td>',
        '<td>' + ' %' + (fRelativa[i] * 100).toFixed(3) + '</td>',
        '<td>' + fAcumulada[i] + '</td>',
        '<td>' + ' %' + (100 / qnt_total * fAcumulada[i]).toFixed(3) + '</td>',
        '</tr>')
      }
  }

  
  
  tabela_str[tabela_str.length ] = '</tbody>';
  tabela_str[tabela_str.length ] = '</table>';

    tabela.innerHTML = tabela_str.join("\n");
    console.log(tabela_str)

    //Moda
    moda = listaQnt[0]
    for(var i = 0; i < listaQnt.length; i++){
        if(listaQnt[i] > moda){
            moda = listaQnt[i]
        }
    }
    for(var i = 0; i < listaQnt.length; i++){
        if(listaQnt[i] == moda){
            moda_posicao.push(dados[i])
        }
    }console.log(moda, moda_posicao)

    //MEDIA
    if(tipo1 == "continua"){
        for(var i = 0; i < dados.length; i++){
            media = media + parseFloat((dados[i] + intervalo / 2) * listaQnt[i])
        }
        media = media / qnt_total
        console.log(media)
    }else{
        
    for(var i = 0; i < dados.length; i++){
        media = media + parseFloat(dados[i] * listaQnt[i])
    }
    media = media / qnt_total
    console.log(media)
    }

    //MEDIANA
    mediana_valor = fAcumulada[fAcumulada.length - 1] / 2
    if(fAcumulada[fAcumulada.length - 1] % 2 == 0){
        mediana = mediana_valor 
        mediana2 = mediana + 1
    }else{
        mediana = Math.round(mediana_valor)
    }console.log(mediana, mediana2, mediana_valor)

    if(mediana2 == 0){
        for(var i = 0; i < dados.length; i++){
            if(mediana <= fAcumulada[i] && mediana > fAcumulada[i - 1]){
                mediana_posicao = i 
            }
        }
    }else{
        for(var i = 0; i < dados.length; i++){console.log(i)
            if(mediana <= fAcumulada[i] && mediana > fAcumulada[i - 1]){
                mediana_posicao = i 
            }if(mediana <= fAcumulada[i] && mediana > fAcumulada[i - 1]){
                mediana_posicao2 = i 
                console.log(i, fAcumulada[i], mediana)
            }
        }
    }console.log(mediana_posicao, mediana_posicao2)

    if(tipo1 == "continua"){
        mediana_continua = ((mediana - fAcumulada[mediana_posicao - 1]) / listaQnt[mediana_posicao] * intervalo) + parseFloat(dados[mediana_posicao])
    }
console.log(mediana_continua)

//valores FINAIS para amostragem
//mediana(continua) = mediana_continua
//mediana(com todas as outras variaveis) = dados[mediana_posicao]

//media = media

//moda = dados[moda_posicao]
//moda(continua) = dados[moda_posicao] + (intervalo / 2)
}