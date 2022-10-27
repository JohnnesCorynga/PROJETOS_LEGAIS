    let salario = window.document.getElementById('salarioM')
    let horaMes = window.document.getElementById('horaMes')
    let prim = window.document.querySelector('.primeiro_valor')
    let res = window.document.getElementById('resto')
    let salario2 = Number(salario.value)

function calcular() {
    let salario2 = Number(salario.value)
    let horaMes2 = Number(horaMes.value) 
    let dados = []
    dados.push(salario2)
    dados[1] = horaMes2 
    let divi = dados[0]/dados[1]
        if(salario2 <= 0 || horaMes2 <= 0){
            window.alert('Impossível calcular, revise os dados!!!')
        } else{
            prim.innerHTML = ''
            res.innerHTML = `O valor da sua hora de trabalho Normal é R$ ${divi.toFixed(2).replace('.',',')}.` 
            document.querySelector('div#segundo_valor').style.display = 'block';//ultimo comando para para mostrar a div oculta.
        }
}
    let horaExtra = window.document.querySelector('input#horaextra')
    let porcento = window.document.querySelector('input#porcentagem')

        

function adicionar(){
    let salario2 = Number(salario.value)
    let horaMes2 = Number(horaMes.value)
    let horaExtra2 = Number(horaExtra.value)
    let porcento2 = Number(porcento.value)
    let dados2 = []
    dados2.push(horaExtra2)
    dados2.push(porcento2)
    let horaNormal = salario2/horaMes2
    let horaSobrePorcentagem = horaNormal+(horaNormal* (dados2[1]/100))
    let valorSobreHoras = horaSobrePorcentagem*dados2[0]
        if(horaExtra2 <= 0 || porcento2 <= 0 ){
        window.alert('Impossível calcular, revise os dados!!!')
        }

        else{
            const select = document.querySelector('#resultado')/*Cria uma constante SELECT e pega o valor de um id,no caso id="resultado" */
            select.options[select.options.length] = new Option(`-O valor da sua hora trabalhada à ${dados2[1]}% é R$ ${horaSobrePorcentagem.toFixed(2)}`) 
            select.options[select.options.length] = new Option(`Você trabalhou ${dados2[0]}hrs À ${dados2[1]}% que dá R$ ${valorSobreHoras.toFixed(2)}`);
            select.options[select.options.length] = new Option(`Seu salário fica R$ ${(valorSobreHoras+salario2).toFixed(2).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})} `)
            //Cria uma OPTION e adiciona o valor das variasveis a elas. 
        }
        horaExtra.value = ''
        horaExtra.focus()
        porcento.value = ''
        porcento.focus()  
}
    let resFinalLista = window.document.querySelector('div#resultadoFinal')
   
function gerar(){
    resFinalLista.innerHTML = `Você adicionou ${dados2.length} valores.`

}


/*let horaMes2 = Number(horaMes.value)
    let horaExtra2 = Number(horaExtra.value)
    let porcento2 = Number(porcento.value) 
    let dados2 = []
    dados2.push(horaExtra2)
    dados2.push(porcento2)
    let horaNormal = salario2/horaMes2
    let horaSobrePorcentagem = horaNormal+(horaNormal* (dados2[1]/100))
    let valorSobreHoras = horaSobrePorcentagem*dados2[0]
    let lista = []
    lista.push(salario2)
    lista.push(valorSobreHoras)


    */