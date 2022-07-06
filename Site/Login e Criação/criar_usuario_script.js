let register_button = document.querySelector("#botao_criar");
async function register(){
    let email = document.querySelector("#email");
    let senha1 = document.querySelector("#senha1");
    let senha2 = document.querySelector("#senha2");
    let emailValue = email.value.trim();
    let senha1Value = senha1.value.trim();
    let senha2Value = senha2.value.trim();
    
    if(!(senha1Value == senha2Value)){
        window.alert('As senhas devem ser iguais!');
        return;
    }

    if(senha1Value == '' || senha2Value == ''){
        window.alert('Por favor, coloque uma senha!');
        return;
    }

    if(emailValue == ''){
        window.alert('Por favor, coloque um email válido');
        return;
    }
    
    let datas = {
        email : emailValue,
        password : senha1Value,
        cargo : 'professor'
    };

    let tokens = await request(datas, "user/register", 'POST');
    if(tokens.message == "duplicate key value violates unique constraint \"account_email_key\""){
        window.alert('Este email já existe. Por favor, adicione um email válido!');
        return;
    }

    sessionStorage.setItem("accessToken", tokens.tokens.accessToken);
    sessionStorage.setItem("refreshToken", tokens.tokens.refreshToken);

    let verify = sessionStorage.getItem("accessToken");
    if(verify == "undefined"){
        window.alert("Ocorreu algum erro!");
    } else{
        window.location.href = "./../Flashcards/flashcard_index.html";
    };       
}

register_button.addEventListener("click", register);