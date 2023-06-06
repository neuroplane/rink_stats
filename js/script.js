function APISendRequest(funcName, body) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token 11609376-ff57-401e-88a4-53f4c0904fd8'
        },
        body: body
    };

    return fetch('https://x125.ru/api/stats/'+ funcName, options)
        .catch(err => console.error(err))
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response;
        })

}

async function login() {
    const username = document.getElementById("inputLogin").value
    const password = document.getElementById("inputPassword").value
    const data = {
        "login": username,
        "password": password
    }
    const response = await APISendRequest("login", JSON.stringify(data))
    console.log(response['token'])
}