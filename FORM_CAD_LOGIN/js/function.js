//criamos ORIENTAÇÃO A OBJETOS:
class Validator{
    //criamos constructor()que vai aceitar as propriedades desse objeto, para iniciar para inicia-las:
        constructor() {
            //nesse array vamos mapear TODAS validações existentes:
            this.validations = [
                //coloco aqui oq botei lá no html:
                'data-min-length',
                'data-max-length',
                'data-only-letters',
                'data-email-validate',
                'data-required',
                'data-equal',
                'data-password-validate'
            ]
        }
    //iniciar a validação, com uma funçãozinha que espera receber  form quando ele estiver ativado:
    validate(form){
        
        //limpar validações, 1º preciso saber all validações presentes no form:
        let currentValidations = document.querySelectorAll("form .error-validation");
        //pego all elementos de dentro do form que tem a classe error-validation

        //se tiver validações presentes na tela{chamo método clean(e passo as validações)}
        if(currentValidations.length){
            this.cleanValidations(currentValidations);
        }
        //pego todos meus inputs:
        let inputs = form.getElementsByTagName('input');
        //mesmo eu pegando os inputs, eu Ñ consigo dar um loop neles, para saber quais precisam ou não ser validados, então preciso transformar essa variável em um array:
        //acima criou um HTMLCollection.

        //Array:
        let inputsArray = [...inputs];
        //isso significa que vai pegar todas as infos da tag acima, e formar um array com vários elementos.
      
        //Agr posso fazer meu loop, sem que o JS me interrompa :)
        //agr to percorrendo CADA loop (forEach) e com a função estou dizendo que quero validar cada item que for encontrado      
        inputsArray.forEach(function(input){        
            //loop:
            //onde o this..... conta itens lá da var de cima
            for(let i = 0; this.validations.length > i; i++){
                //if(pego os atributos do input(e vejo se é igual a minha validação atual do meu loop))
                //ou seja, verifia se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){

                    //tenho que transformar meu data-min-length em minlength():
                    let method = this.validations[i].replace("data-", "").replace("-","");
                    //criei var = nome do meu array e disse p trocar data, - e deixar os campos vazios.

                    //valor do input, ou seja lá defini como 3, logo preciso saber se é esse o valor:
                    let value = input.getAttribute(this.validations[i]);

                    //chamo o método: [invoco o min-length](preciso saber qual input to validando, e qual valor do atributo)
                    this[method](input,value);
                }
            }
        }, this);
    }
    //vê se um input tem o número mínimo de caracteres:
    minlength(input, minValue){
        //vejo quantos caracteres estão escritos no input que o usuario excreveu/enviou:
        let inputLength = input.value.length;
      
        //msg de erro p mostrar o us:
        let errorMessage = `O campo precisa de ao menos ${minValue} caracteres.`;
      
        //se o comprimento de caracteres do input for MENOR que o valor mínimo{ mostro msg de erro}
        if(inputLength < minValue){
           this.printMessage(input, errorMessage);
        }
    }
    //verifica se algum input passou do limite de caracteres:
    maxlength(input, maxValue){
        //copio do de cima, alterando alguns itens:
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres.`;
        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
         }
    }
    //verifica se o campo tem SÓ letras:
    onlyletters(input){
        //digo que só vai aceitas letras maiu e minu de A a Z:
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita caracteres ou números.`;
        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }
    //validar email:
    emailvalidate(input){
        //crio o Rejex, ou seja, vai ver se tem todos aqueles itens para validar ou não o email: FRACAMENTE
        let re = /\S+@\S+\.\S+/;

        //verifico se é email:
        let email = input.value;
        let errorMessage = `Insira um e-mail válido!`;

        //se não for email{mostro erro}
        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }
     //verifica se 2 campos são iguais:
     equal(input, inputName){
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = `As duas senhas não combinam. Tente novamente!`;
        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }      
    }
    //verifica se o input é requerido:
    required(input){

        //pego o txt do input:
        let inputValue = input.value;

        //vejo se esta vazio, se estiver eu mostro erro:
        if(inputValue === ""){
            let errorMessage = `Este campo é obrigatório.`;
            this.printMessage(input, errorMessage);
        }
    }
    //valida campo senha:
    passwordvalidate(input){
        //transformo a string em um array:
        let charArr = input.value.split("");
        //agr tenho a senha separada em CADA caractere
      
        let uppercases = 0;
        let numbers = 0;
        //vou percorrer todos meus caracteres em busca dos dois acima, minha validação é que vou querer ao menos um número e uma letra maiúscula:
        for(let i = 0; charArr.length > i; i++){
            //Se meu caractere atual do meu loop foi¡r igual ao do meu loop maiúsculo EE se ele não é um nº(isNAn...), ou seja vai ver por ex a letra H e confirmar que não é um número
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){

                //quando eu encontrar eu increment:
                uppercases++;

                //aqui sei que é um número e incremento, assim vou saber que tem um nº na senha do us
            } else if(!isNaN(parseInt(charArr[i]))){
                numbers++;
            }
        }
        //só vou imprimir um erro se o upperCase ou numbers foi igual 0:
        if(uppercases === 0 || numbers === 0){
            let errorMessage = `Senha precisa ter um caractere maíusculo e um número!`;

            this.printMessage(input, errorMessage);
        }
    }
    //modo p mostrar msg erro pro us...
    printMessage(input, msg){

        //lá nos erros inicialmente aparece um axima do outro, então pra não ficar ilegível, eu faço aparecer 1 de cada vez:
        let errorsQty = input.parentNode.querySelector(".error-validation");

        if(errorsQty === null){
            //uso como recipente p clonar msg
            let template = document.querySelector(".error-validation").cloneNode(true);

            //agr mudo o txt do meu templete para msg de erro
            template.textContent = msg;

            //acho o local que vou por a msg de erro, logo, preciso achar o pai do input:
            let inputParent = input.parentNode;

            //removo a classe templete p ele aparecer na tela
            template.classList.remove("template");

            //aqui p colocar um filho no pai do input, acrescento templete que é o erro
            inputParent.appendChild(template)
        }
    }
        //chamo o pra limpar validações:
        cleanValidations(validations){
            //percorro campos que estão p validar(crio um elemento e peço pra remover)
            validations.forEach(el => el.remove());
        }        
}
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

//iniciamos o OBJETO:
let validator = new Validator();
//vamos passar ele pra um método

//evento que vai disparar as validações:
submit.addEventListener("click", function(e){
    e.preventDefault();

    //método validar:
    validator.validate(form);
    //esse método validade vai mapear todos meus inputs do formulário
});
//função para exibir/ocultar senha
function password_show(){
    var senha = document.querySelector("#password");
    if (senha.type == "password") {
        senha.type = "text";
    }else{
        senha.type = "password";
    }
}