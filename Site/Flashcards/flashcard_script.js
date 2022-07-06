
// SALVAR O FLASHCARD NO BANCO DE DADOS
document.getElementById("salvar_flashcard").addEventListener("click", async () => {
  let datas = {
    titulo : "memorycard"
  };
  let id_questionario = await request(datas, "quiz/quiz", 'POST');
  let dataQuestao = {
    idquestionario : id_questionario.idQuestionario.rows[0].id,
    enunciado : document.querySelector('#question').value
  };
  let id_questao = await request(dataQuestao, "quiz/questao", 'POST');
  let data_alternativa = {
    idquestao : id_questao.idQuestao.rows[0].id,
    alternativa : [{
      texto : document.querySelector("#answer").value,
      correta : true
    }]
  };
  let alternativa = await request(data_alternativa, "quiz/alternativa", 'POST');

  addFlashcard();
});

// MOSTRAR FLASHCARD NA TELA DO USUÁRIO
document.getElementById("mostrar_caixa").addEventListener("click", () => {
  document.getElementById("criar_flashcard").style.display = "block";
});

// FECHAR A TELA DE FLASHCARD NA TELA DO USUÁRIO
document.getElementById("fechar_flashcard").addEventListener("click", () => {
  document.getElementById("criar_flashcard").style.display = "none";
});

// ESSA FUNÇÃO FAZ O FLASHCARD
FazerFlashcard = (text, delThisIndex) => {

// CRIA PELO JAVASCRIPT ELEMENTOS HTML
  const flashcard = document.createElement("div");
  const lixeira = document.createElement("img");
  const pergunta = document.createElement('h2');
  const resposta = document.createElement('h2');
  const del = document.createElement('i');
  
  flashcard.className = 'flashcard';

// CRIA EVENTO DE DELETAR UM FLASHCARD
  lixeira.src = 'https://cdn-icons-png.flaticon.com/512/6932/6932392.png';
  lixeira.setAttribute("style", "width: 25px; margin-left: 5px");
  lixeira.addEventListener("click", async () => {
    await deletar_flashcard(text);
    window.location.reload();
  });

  pergunta.setAttribute("style", "border-top:2px solid blue; margin-top:5px; padding: 15px; text-align:center; font-size: 30px");
// COLOCA O CONTEÚDO DA PERGUNTA NO FLASHCARD
  pergunta.textContent = text.minha_pergunta;

  resposta.setAttribute("style", "text-align:center; display:none; font-size:30px ;color:blue");
// COLOCA O CONTEÚDO DA RESPOSTA NO FLASHCARD PORÉM ESCONDIDO
  resposta.textContent = text.minha_resposta;

  flashcard.appendChild(lixeira)
  flashcard.appendChild(pergunta);
  flashcard.appendChild(resposta);
  flashcard.appendChild(del);

// DEIXA VISÍVEL O CONTEÚDO DA RESPOSTA
  pergunta.addEventListener("click", () => {
    if(resposta.style.display == "none")
      resposta.style.display = "block";
    else
      resposta.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

// ADICIONA UM NOVO FLASHCARD
addFlashcard = () => {
  const pergunta = document.querySelector("#question");
  const resposta = document.querySelector("#answer");  

  let flashcard_info = {
    'minha_pergunta' : pergunta.value,
    'minha_resposta'  : resposta.value
  }

  pergunta.value = "";
  resposta.value = "";
  window.location.reload();

  put_flashcard();
}

put_flashcard = async () => {
  let data = {
    
  }
  let getQuestionario = await request(data, "quiz/quiz", 'PUT')
  let FlashCards = []

  for (const questionario in getQuestionario.questionarios){
    let data_questoes = {
      idquestionario : getQuestionario.questionarios[questionario].id
    };

    let questao = await request(data_questoes, "quiz/questao", 'PUT');

    if(questao.questoes[0]){
      FlashCards.push({
        minha_pergunta : questao.questoes[0]?.enunciado,
        idquestao : questao.questoes[0]?.id,
        id_questionario : getQuestionario.questionarios[questionario].id
      });
    }
  }

  for (const card in FlashCards) {
    let data_alternativa = {
      idquestao : FlashCards[card].idquestao
    }
    
    let pegar_resposta = await request(data_alternativa, "quiz/alternativa", 'PUT');

    if(pegar_resposta.alternativas[0]){
      if(FlashCards[card].idquestao == pegar_resposta.alternativas[0]?.idquestao){
        FlashCards[card].minha_resposta = pegar_resposta.alternativas[0].texto
      }
    }
  }

  for (const i in FlashCards) {
    FazerFlashcard(FlashCards[i], i);
  }
}

put_flashcard();

deletar_flashcard = async (flashcard) =>{
  let data = {
    idquestao : flashcard.idquestao,
    idquestionario : flashcard.id_questionario
  }
  let deletar = await request(data, 'quiz/questao', 'DELETE');
}
