//let resolution = 3;

let screen_height = window.innerHeight
let screen_width = screen_height/2.2;
console.log(screen_width + ", " + screen_height)

const c = document.getElementById("heatmap");
const ctx = c.getContext("2d");
ctx.width = image.width
ctx.height = image.height

const g = document.getElementById("goals");
const gctx = g.getContext("2d");
gctx.width = image.width
gctx.height = image.height

function draw_text(x,y,text, color) {
    let canvas = document.querySelector('#goals');
    let ctx = canvas.getContext('2d');
    ctx.save()
    ctx.fillStyle = color;
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1
    ctx.font = "bold 50pt Arial";
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, x, y);
    ctx.restore()
}

//alert(to_y(4))
let heatData = []
const heat = simpleheat('heatmap');
/*  DRAW POINT    */
function drawPoint(x,y) {
    heat.data(heatData);
    const point = [x,y, 0.4]
    heat.add(point);
    heat.resize()
    heat.draw(0.05);
}

async function redraw(team) {
    heatData = []
    let canvas = document.querySelector('#goals');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    heat.clear()

    //heat.data(newData)
    /*  FUNC TAB    */
    const teamShots = await APISendRequest("getteamheatmap", JSON.stringify({"game_id": getURLValues(), "team_id": team}))
    for (const point of teamShots) {
        drawPoint(point['shot_x'], point['shot_y'])
        if (point['is_target'] === true){
            draw_text(point['shot_x'], point['shot_y'], "•", "#5245ce")
        }
        if (point['is_goal'] === true){
            draw_text(point['shot_x'], point['shot_y'], "G", "#3b3b3b")
        }
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = Math.round((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
    const y = Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    openModal(x,y)

}
/*---------- s3----------*/
const canvas_heatmap = document.querySelector('#goals')
canvas_heatmap.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas_heatmap, e)
})
/*-------------- API SEND DATA GET RESPONSE --------------------*/
/*function APISendRequest(funcName, body) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token 11609376-ff57-401e-88a4-53f4c0904fd8'
        },
        body: body
    };

    return fetch('https://x125.ru/api/stats/'+funcName, options)
        .then(response => response.json())
        .then(response => {return response})
        .catch(err => console.error(err));
}
*/