function exibir(){// Exibindo  o valor digidado no input #cpf, dentro do paragráfo #resultado2 Ao Vivo
    var cpf1 = document.querySelector("#cpf").value;
    var res = document.querySelector("#resultado2");
    res.innerHTML = cpf1
}
var cpfApagar = document.querySelector("#cpf")
function verificar(){
    var cpf = document.querySelector("#cpf").value;
    var resValidando = document.querySelector("#validando");
    var multi1 = 0;
    var multiResto = 0;
    var multi12 = 0;
    var multiResto2 = 0;
    var segundoDigito =0
    var primeiroDigito=0
    if(cpf.length==11&&cpf.length!=''&& // Elimina CPFs invalidos conhecidos
        cpf != "00000000000" && 
        cpf != "11111111111" && 
        cpf != "22222222222" && 
        cpf != "33333333333" && 
        cpf != "44444444444" && 
        cpf != "55555555555" && 
        cpf != "66666666666" && 
        cpf != "77777777777" && 
        cpf != "88888888888" && 
        cpf != "99999999999"){
        for(let i=0; i<9;i++){ //Validando o 1º digito 
            multi1 += parseInt(cpf.charAt(i)) * (10-i);
        multiResto = 11 - (multi1 % 11);
        };
        if (multiResto == 10 || multiResto== 11){
            multiResto = 0;	
        }
        primeiroDigito = String(multiResto);
        for(let i=0; i<10;i++){ //Validando o 2º digito
            multi12 += parseInt(cpf.charAt(i)) * (11-i);
        multiResto2 = 11 - (multi12 % 11);
        }
        if (multiResto2 == 10 || multiResto2== 11){
            multiResto2 = 0;	
        }
        segundoDigito = String(multiResto2);
                
        if(cpf.length==11&&multiResto==parseInt(cpf.charAt(9))&&multiResto2==parseInt(cpf.charAt(10))){
            resValidando.style.color = "green"
            resValidando.innerHTML = `CPF VÁLIDO! Consulte a receita para mais informações.`
        }else{
            resValidando.style.color = "red";
            resValidando.innerHTML = `CPF Inválido!`
        } 
    }
    else{
        resValidando.style.color = "red";
        resValidando.innerHTML = `CPF Inválido!`;
        //resValidando.innerHTML = `Verifique o CPF digitado!`
    }
        cpfApagar.value = ''
        cpfApagar.focus()
}