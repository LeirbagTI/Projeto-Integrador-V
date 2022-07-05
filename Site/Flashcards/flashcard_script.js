var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

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

document.getElementById("mostrar_caixa").addEventListener("click", () => {
  document.getElementById("criar_flashcard").style.display = "block";
});

document.getElementById("fechar_flashcard").addEventListener("click", () => {
  document.getElementById("criar_flashcard").style.display = "none";
});

FazerFlashcard = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const lixeira = document.createElement("img");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');
  
  flashcard.className = 'flashcard';

  lixeira.src = 'https://cdn-icons-png.flaticon.com/512/6932/6932392.png';
  lixeira.setAttribute("style", "width: 25px; margin-left: 5px");
  lixeira.addEventListener("click", async () => {
    await deletar_flashcard(text);
    window.location.reload();
  });

  question.setAttribute("style", "border-top:2px solid blue; margin-top:5px; padding: 15px; text-align:center; font-size: 30px");
  question.textContent = text.minha_pergunta;

  answer.setAttribute("style", "text-align:center; display:none; font-size:30px ;color:blue");
  answer.textContent = text.minha_resposta;

  flashcard.appendChild(lixeira)
  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  question.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");  

  let flashcard_info = {
    'minha_pergunta' : question.value,
    'minha_resposta'  : answer.value
  }

  question.value = "";
  answer.value = "";
  window.location.reload();

  put_flashcard();
}

put_flashcard = async () => {
  let data = {
    
  }
  let amor = await request(data, "quiz/quiz", 'PUT')
  let indignacao = []

  for (const questionario in amor.questionarios){
    let data_questoes = {
      idquestionario : amor.questionarios[questionario].id
    };

    let odio = await request(data_questoes, "quiz/questao", 'PUT');

    if(odio.questoes[0]){
      indignacao.push({
        minha_pergunta : odio.questoes[0]?.enunciado,
        idquestao : odio.questoes[0]?.id,
        id_questionario : amor.questionarios[questionario].id
      });
    }
  }

  for (const card in indignacao) {
    let data_alternativa = {
      idquestao : indignacao[card].idquestao
    }
    
    let pegar_resposta = await request(data_alternativa, "quiz/alternativa", 'PUT');

    if(pegar_resposta.alternativas[0]){
      if(indignacao[card].idquestao == pegar_resposta.alternativas[0]?.idquestao){
        indignacao[card].minha_resposta = pegar_resposta.alternativas[0].texto
      }
    }
  }

  for (const i in indignacao) {
    FazerFlashcard(indignacao[i], i);
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
