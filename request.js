async function request(data, lastUrl, method){
    const url = 'https://bd-pie5-unifagoc.herokuapp.com/api/v1/' + lastUrl
    const response = await fetch(url, {
        method: method,
        headers: {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('accessToken'),
            'Accept' : '/',
            'Content-Type': 'application/json'
        },
        credentials : 'same-origin',
        body: JSON.stringify(data)
    })
    //console.log(await response.json());
    const json = await response.json();
    if(json.message == 'jwt expired'){
        let tokens = await request({}, 'user/refresh_token', 'PUT');

        sessionStorage.setItem("accessToken", tokens.accessToken);
        sessionStorage.setItem("refreshToken", tokens.refreshToken);
        return
    }
    return json;
}