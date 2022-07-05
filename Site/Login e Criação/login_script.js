let login_button = document.querySelector("#botao_login");
async function login(){
        let email = document.querySelector("#email");
        let senha = document.querySelector("#senha");
        let emailValue = email.value;
        let senhaValue = senha.value;
        let datas = {
            email : emailValue,
            password : senhaValue
        };

        if(emailValue == "" || senhaValue == ""){
            window.alert('Não pode haver EMAIL e/ou SENHA vazios');
            return;
        }

        let tokens = await request(datas, "user/login", 'POST');

        sessionStorage.setItem("accessToken", tokens.tokens.accessToken);
        sessionStorage.setItem("refreshToken", tokens.tokens.refreshToken);

        let verify = sessionStorage.getItem("accessToken");
        if(verify == "undefined"){
            window.alert("Os dados são inválidos...");
        } else{
            window.location.href = "./../Flashcards/flashcard_index.html";
        }
}

login_button.addEventListener("click", login);