let resolution = 3;

let screen_height = window.innerHeight
let screen_width = screen_height/2.2;
console.log(screen_width + ", " + screen_height)

const c = document.getElementById("heatmap");
const ctx = c.getContext("2d");
ctx.width = image.width
ctx.height = image.height


//alert(to_y(4))
const data = []
const heat = simpleheat('heatmap');
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log(x, y, rect.left, rect.top)

    heat.data(data);
    const point = [x,y, 0.3]
    heat.add(point);
    heat.draw(0.05);


}
/*---------- s3----------*/
const canvas_heatmap = document.querySelector('#heatmap')
canvas_heatmap.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas_heatmap, e)
})