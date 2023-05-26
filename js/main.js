//let resolution = 3;

let screen_height = window.innerHeight
let screen_width = screen_height/2.2;
//console.log(screen_width + ", " + screen_height)

const c = document.getElementById("heatmap");
const ctx = c.getContext("2d");
ctx.width = image.width
ctx.height = image.height

const g = document.getElementById("goals");
const gctx = g.getContext("2d");
gctx.width = image.width
gctx.height = image.height

function draw_text(x,y,text) {
    let canvas = document.querySelector('#goals');
    let ctx = canvas.getContext('2d');
    ctx.save()
    ctx.fillStyle = "#3b3b3b";
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1
    ctx.font = "bold 50pt Arial";
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, x, y);
    ctx.restore()
}

//alert(to_y(4))
const data = []
const heat = simpleheat('heatmap');
function drawPoint(x,y) {
    heat.data(data);
    const point = [x,y, 0.4]
    heat.add(point);
    heat.resize()
    heat.draw(0.05);
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = Math.round((event.clientX - rect.left) / (rect.right - rect.left)*canvas.width)
    const y = Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    openModal(x,y)

}
/*---------- s3----------*/
const canvas_heatmap = document.querySelector('#goals')
canvas_heatmap.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas_heatmap, e)
})

/* HEATMAP */
