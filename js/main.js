let resolution = 3;


//let ctx_width = 360*resolution
//let ctx_height = 648*resolution
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
let ctx_width = screen_width
let ctx_height = screen_height
//alert(screen_width + " х " + screen_height)

const main = document.getElementById("main_id");
//const div_id = "id" + Math.random().toString(16).slice(2)
main.setAttribute("class", "text-center")
let element = document.createElement("canvas")
//element.setAttribute("style", "width:"+screen_width)
//element.setAttribute("style", "height:"+screen_height)
element.id = "canvas"
element.width = screen_width
element.height = screen_height
document.getElementById("main_id").append(element)
//
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
ctx.width = screen_width*3
ctx.height = screen_height*3


function roundedRect(ctx, x, y, width, height, radius, fill, stroke, lineWidth) {
    const useStroke = typeof stroke == 'undefined' || stroke !== 0;
    radius = typeof radius == 'undefined' ? 5 : radius;

    // Save previous context
    ctx.save();
    //ctx.lineWidth = -1;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius,radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height,radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius,radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y,radius);
    ctx.closePath();
    if (useStroke && stroke !== 0) {
        ctx.strokeStyle = typeof stroke == 'undefined' ? '#000' : stroke;
        ctx.stroke();
    }
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    ctx.restore();
}


//ctx.strokeStyle = "#db5c5c"
//ctx.lineWidth = 5
function h_line(ctx, x, y, color) {
    ctx.save();
    ctx.moveTo(x, y);
}

function circle(ctx, x, y, radius, color, stroke) {

}
//Лицевые
// Лицевая Север

// Лицевая Юг

// Центральная

// Синяя Север

// Синяя Юг
roundedRect(ctx, 1, 1 , screen_width-2, screen_height-2, 85, "#7dc5d2", 0, "")
//alert(to_y(4))
const data = []
const heat = simpleheat('canvas');
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //alert("x: " + x + " y: " + y)
    ctx.save()
    heat.data(data);
    const point = [x,y, 0.2]
    heat.add(point);
    heat.draw();
    ctx.restore()

}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})