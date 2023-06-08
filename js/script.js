/*  API    */
async function APISendRequest(funcName, body, token) {

    if (getCookie("token")){
        token = getCookie("token")
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token
        },
        body: JSON.stringify(body)
    };


    let res

    try {
        res = await fetch('https://x125.ru/api/stats/'+ funcName, options)
    } catch (e) {
        throw new Error("Bad response from server");
    }

    return res.json()
}
/*  LOGIN    */
async function login() {
    const username = document.getElementById("inputLogin").value
    const password = document.getElementById("inputPassword").value
    const data = {
        "login": username,
        "password": password
    }
    let token = "00000000-0000-0000-0000-000000000000"
    let response = await APISendRequest("login", data, token)
    console.log(response)
    if (response['token']){
        setCookie("token", response['token'])
        toastAlert(response['token'], "success")
    } else {
        console.log(response['message'])
        toastAlert(response['message'], "danger")
    }
}
/*  COOKIES    */
function setCookie(name, value) {
    document.cookie = `${name}=${value}`
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
}

function deleteCookie(name) {
    setCookie(name, "")
}
/*  FUNC TAB    */
async function getUser(cookie) {
    const token = getCookie("token")
    const data = {
        "token": token
    }
    const userid = await APISendRequest("getuser", data)
}
/*  FUNC TAB    */
function toastAlert(message, color) {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    const toastMessage = document.getElementById("toastMessage")
    toastMessage.innerHTML = message
    toastLiveExample.setAttribute("class", "")
    toastLiveExample.classList.add("toast")
    toastLiveExample.classList.add("text-bg-" + color)
    toastBootstrap.show()
}