let resolution = 3;

const canvas_array = ["rink", "heatmap"]

let screen_width = window.innerWidth;
let screen_height = window.innerHeight
let ctx_width = screen_width
let ctx_height = screen_height
let center_x = screen_width/2
let center_y = screen_height/2
let kh = 56/screen_height
let kw = 26/screen_width
console.log(screen_width/2 + ", " + screen_height/2)

function render() {
    for (const canvas in canvas_array) {
        let element = document.createElement("canvas")
        element.id = canvas_array[canvas]
        element.width = screen_width
        element.height = screen_height
        element.className = "render"
        document.getElementById("main_id").append(element)
    }
}

render()
/*const main = document.getElementById("main_id");
main.setAttribute("class", "text-center")
let element = document.createElement("canvas")
element.id = "canvas"
element.width = screen_width
element.height = screen_height
document.getElementById("main_id").append(element)
/*/
const c = document.getElementById("rink");
const ctx = c.getContext("2d");
ctx.width = screen_width*resolution
ctx.height = screen_height*resolution


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
function h_line(ctx, k, color, width) {
    ctx.save();
    ctx.beginPath()
    ctx.moveTo(0, center_y-center_y*k);
    ctx.lineTo(screen_width, center_y - center_y*k)
    ctx.closePath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()
    ctx.restore()
}

function circle(ctx, kx, ky, radius, color, width) {
    ctx.save();
    ctx.beginPath()
    ctx.arc(center_x-center_x*kx, center_y - center_y*ky, radius, 0, 2 * Math.PI);
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

}

function rectangle() {
    
}
//Лицевые
// Лицевая Север

// Лицевая Юг

// Центральная

// Синяя Север

// Синяя Юг 

const faceoffs = 500

roundedRect(ctx, 1, 1 , screen_width-2, screen_height-2, 50, "#d6f1f6", 0, "")
h_line(ctx, 0.9, "#640000", 1)
h_line(ctx, -0.9, "#640000", 1)
h_line(ctx, 0, "#b72323",6)
h_line(ctx, 0.3, "#3270ce",6)
h_line(ctx, -0.3, "#3270ce",6)
circle(ctx,0,0,faceoffs*kh,"#b72323",3)
circle(ctx,0,0,2,"#cccccc",2)
circle(ctx,0.5,0.65,faceoffs*kh,"#b72323",3)
circle(ctx,-0.5,0.65,faceoffs*kh,"#b72323",3)
circle(ctx,-0.5,-0.65,faceoffs*kh,"#b72323",3)
circle(ctx,0.5,-0.65,faceoffs*kh,"#b72323",3)



//alert(to_y(4))
const data = []
const heat = simpleheat('heatmap');
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //alert("x: " + x + " y: " + y)
    ctx.save()
    heat.data(data);
    const point = [x,y, 0.3]
    heat.add(point);
    heat.draw(0.05);
    ctx.restore()

}
/*---------- s3----------*/
const canvas = document.querySelector('#heatmap')
canvas.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas, e)
})