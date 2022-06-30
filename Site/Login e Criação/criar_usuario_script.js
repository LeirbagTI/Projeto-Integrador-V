let register_button = document.querySelector("#botao_criar");
async function register(){
        let email = document.querySelector("#email");
        let senha1 = document.querySelector("#senha1");
        let senha2 = document.querySelector("#senha2");
        let emailValue = email.value;
        let senha1Value = senha1.value;
        let senha2Value = senha2.value;
        
        if(!(senha1Value == senha2Value)){
            window.alert('As senhas tem que ser iguais!');
            return;
        }

        let datas = {
            email : emailValue,
            password : senha1Value,
            cargo : 'professor'
        };

        let tokens = await postMethod(datas, "user/register");
        console.log(tokens);

        sessionStorage.setItem("accessToken", tokens.accessToken);
        sessionStorage.setItem("refreshToken", tokens.refreshToken);

        let verify = sessionStorage.getItem("accessToken");
        if(verify == "undefined"){
            window.alert("Ocorreu algum erro!");
        } else{
            window.location.href = "./../Flashcards/flashcard_index.html";
        };
}

register_button.addEventListener("click", register);