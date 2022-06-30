async function putMethod(data, lastUrl){
    const url = 'https://bd-pie5-unifagoc.herokuapp.com/api/v1/' + lastUrl
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('accessToken'),
            'Accept' : '/',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}