const flashcards = document.getElementsByClassName("flashcards")[0];
const criarCaixa = document.getElementsByClassName("criar-caixa")[0];
const pergunta = document.getElementById("pergunta");
const resposta = document.getElementById("resposta");
let conteudoArray = localStorage.getItem('items') ? 
JSON.parse(localStorage.getItem('items')) : [];

conteudoArray.forEach(fazDiv); /*Cria uma array pra cada flashcard*/
function fazDiv(text){
    var div = document.createElement("div");
    var h2_pergunta = document.createElement("h2");
    var h2_resposta = document.createElement("h2");

    div.className = 'flashcard';

    h2_pergunta.setAttribute('style', "border-top: 1px solid red; padding: 15px; margin-top:30px");
    h2_pergunta.innerHTML = text.minha_pergunta;

    h2_resposta.setAttribute('style', 'text-align: center; display: none; color: red');
    h2_resposta.innerHTML = text.minha_resposta;

    div.appendChild(h2_pergunta);
    div.appendChild(h2_resposta);

    div.addEventListener("click", function(){
        if(h2_resposta.style.display == "none") 
        h2_resposta.style.display == "block"
        
        else 
        h2_pergunta.style.display == "none";
    });

    flashcards.appendChild(div);
}

function AddFlashcard(){
    var flashcard_conteudo = {
        'minha_pergunta' : pergunta.value,
        'minha_resposta' : resposta.value
    }
    conteudoArray.push(flashcard_conteudo)
    localStorage.setItem('items', JSON.stringify (conteudoArray));
    fazDiv(conteudoArray[conteudoArray.length -1]);
    pergunta.value = '';
    resposta.value = '';
} 

function delCartao(){
    localStorage.clear();
    flashcards.innerHTML = '';
    conteudoArray = [];
}

function CriarCartao(){ /* Abre a caixa de flashcard*/
    criarCaixa.style.display = "block";
}

function esconderCartao(){ /* Esconde a caixa de flashcard*/
    criarCaixa.style.display = "none"
}