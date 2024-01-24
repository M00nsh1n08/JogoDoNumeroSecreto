let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
exibirMensagemInicial();


/*Ativando o botão de Chute, criando uma função.
linha 27 "on click = "verificarChute()""
A função sempre será chamada pelo Click do botão*/

function verificarChute() {
    //.value serve para pegar o valor colocado pelo usuario
    let chute = document.querySelector("input").value;
    
    //No caso de acerto
    if(chute == numeroSecreto){
        let quantidade_chutes = tentativas == 1 ? "tentativa" : "tentativas"
        exibirTextoNaTela("h1", "Você acertou, parabéns!");
        exibirTextoNaTela("p", `O número secreto foi descoberto com ${tentativas} ${quantidade_chutes}`);

        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        //No caso de erro:
        if (chute > numeroSecreto){
            exibirTextoNaTela("p", `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite  + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    //Isso para que quando o limite de gerar os números for alcançado, ele limpar a lista
    if(quantidadeDeElementosNaLista == 3){
        listaDeNumerosSorteados = []
    }

    //Verificação se o número gerado já foi pego antes
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        //Caso de recursão, se ja foi sorteado, gerará um outro número
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}




