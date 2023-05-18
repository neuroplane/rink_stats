let resolution = 1;


//let ctx_width = 360*resolution
//let ctx_height = 648*resolution
let screen_width = window.screen.width;
let screen_height = window.screen.height;
let ctx_width = screen_width
let ctx_height = screen_height

const main = document.getElementById("main_id");
//const div_id = "id" + Math.random().toString(16).slice(2)
main.setAttribute("class", "text-center")
let element = document.createElement("canvas")
element.setAttribute("style", "width:"+screen_width)
element.setAttribute("style", "height:"+screen_height)
element.id = "heatmap"
element.width = screen_width
element.height = screen_height
document.getElementById("main_id").append(element)
//
const c = document.getElementById("heatmap");
const ctx = c.getContext("2d");


function roundedRect(ctx, x, y, width, height, radius, fill, stroke, lineWidth) {
    const useStroke = typeof stroke == 'undefined' || stroke !== 0;
    radius = typeof radius == 'undefined' ? 5 : radius;

    // Save previous context
    ctx.save();
    ctx.lineWidth = 1;
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

    // Restore original context
    ctx.restore();

}

function to_x(x) {
    let real_x = x/resolution/10
    return real_x
}

function to_y(y) {
    let real_y = y*10*resolution/0.835
    return real_y
}

//

ctx.strokeStyle = "#db5c5c"
ctx.lineWidth = 5
// Лицевая Север
ctx.beginPath()
ctx.moveTo(0, to_y(4))
ctx.lineTo(ctx_width, to_y(4))
ctx.stroke()
//
ctx.beginPath()
ctx.moveTo(ctx_width/2, 0)
ctx.lineTo(ctx_width/2, ctx_height)
ctx.stroke()
// Лицевая Юг
ctx.beginPath()
ctx.moveTo(0, ctx_height - to_y(4))
ctx.lineTo(ctx_width, ctx_height - to_y(4))
ctx.stroke()
// Центральная
ctx.beginPath()
ctx.moveTo(0, ctx_height / 2)
ctx.lineTo(ctx_width, ctx_height / 2)
ctx.stroke()
// Синяя Север
ctx.strokeStyle = "#5c95db"
ctx.beginPath()
//ctx.moveTo(0, (ctx_height - to_y(4)*2) / 3)
ctx.moveTo(0, 552)
ctx.lineTo(ctx_width, (ctx_height - to_y(8)) / 3)
ctx.stroke()
// Синяя Юг
ctx.strokeStyle = "#5c95db"
ctx.beginPath()
ctx.moveTo(0, to_y(4) + (ctx_height - to_y(8)/3))
ctx.lineTo(ctx_width, (ctx_height - to_y(8))/3 * 2)
ctx.stroke()

roundedRect(ctx, 5, 5 , screen_width-10, screen_height-10, 65*resolution, "", "black", 1)
//alert(to_y(4))