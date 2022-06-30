var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("salvar_flashcard").addEventListener("click", async () => {
  let datas = {
    titulo : "memorycard"
  };
  let id_questionario = await postMethod(datas, "quiz/quiz");
  
  let dataQuestao = {
    idquestionario : id_questionario.idQuestionario.rows[0].id,
    enunciado : document.querySelector('#question').value
  };

  let id_questao = await postMethod(dataQuestao, "quiz/questao");

  let data_alternativa = {
    idquestao : id_questao.idQuestao.rows[0].id,
    alternativa : [{
      texto : document.querySelector("#answer").value,
      correta : true
    }]
  };
  let alternativa = await postMethod(data_alternativa, "quiz/alternativa");

  addFlashcard();
});

document.getElementById("deletar_flashcard").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("mostrar_caixa").addEventListener("click", () => {
  document.getElementById("criar_flashcard").style.display = "block";
});

document.getElementById("fechar_flashcard").addEventListener("click", () => {
  document.getElementById("criar_flashcard").style.display = "none";
});

FazerFlashcard = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';

  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.minha_pergunta;

  answer.setAttribute("style", "text-align:center; display:none; color:red");
  answer.textContent = text.minha_resposta;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(FazerFlashcard);

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");  

  let flashcard_info = {
    'minha_pergunta' : question.value,
    'minha_resposta'  : answer.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  FazerFlashcard(contentArray[contentArray.length - 1], contentArray.length - 1);
  question.value = "";
  answer.value = "";
}

put_flashcard = async () => {
  let data = {
    idprofessor : 13
  }
  let amor = await putMethod(data, "quiz/quiz")

  let indignacao = []

  for (const questionario in amor.questionarios){
    let data_questoes = {
      idquestionario : amor.questionarios[questionario].id
    };

    let odio = await putMethod(data_questoes, "quiz/questao");

    if(odio.questoes[0]){
      indignacao.push({
        enunciado : odio.questoes[0]?.enunciado,
        idquestao : odio.questoes[0]?.id
      });
    }
  }

  for (const card in indignacao) {
    let data_alternativa = {
      idquestao : indignacao[card].idquestao
    }
    
    let pegar_resposta = await putMethod(data_alternativa, "quiz/alternativa");

    if(pegar_resposta.alternativas[0]){
      if(indignacao[card].idquestao == pegar_resposta.alternativas[0]?.idquestao){
        indignacao[card].resposta = pegar_resposta.alternativas[0].texto
      }
    }
  }

  console.log();

}

put_flashcard();
