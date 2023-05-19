let resolution = 3;

let screen_height = window.innerHeight
let screen_width = screen_height/2.2;
console.log(screen_width + ", " + screen_height)

const c = document.getElementById("my-canvas");
const ctx = c.getContext("2d");
ctx.width = screen_width*resolution
ctx.height = screen_height*resolution


//alert(to_y(4))
const data = []
const heat = simpleheat('heatmap');
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //alert("ГОЛ или НЕТ?: " + "x: " + x + " y: " + y)
    ctx.save()
    heat.data(data);
    const point = [x,y, 0.3]
    heat.add(point);
    heat.draw(0.05);
    ctx.restore()

}
/*---------- s3----------*/
const canvas_heatmap = document.querySelector('#heatmap')
canvas_heatmap.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas, e)
})