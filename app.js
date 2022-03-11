var color = document.querySelector('#color')
var sizeElement = document.querySelector('#size')
var eraser = document.querySelector('#eraser')
var decrease = document.querySelector('#decrease')
var increase = document.querySelector('#increase')
var save = document.querySelector('#save')
var clear = document.querySelector('#clear')
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')


var currentPos = {
    x: 0,
    y: 0
}

var isDrawing = false


// mousedown==> khi nhấn giữ chuột
// đang vẽ
document.addEventListener('mousedown', function(e){
    currentPos = {
        x:  e.offsetX,
        y: e.offsetY
    }
    isDrawing = true
})

var currentPosAfter = {
    x: 0,
    y: 0
}

// 
document.addEventListener('mousemove', function(e){

    if(isDrawing){
        currentPosAfter = {
            x:  e.offsetX,
            y: e.offsetY
        }

        // vẽ nét tròn
        ctx.beginPath()
        ctx.arc(currentPos.x, currentPos.y, size, 0, 2 * Math.PI)
        ctx.fillStyle = colorPaint
        ctx.fill()

        ctx.beginPath();
        ctx.moveTo(currentPos.x, currentPos.y);
        ctx.lineTo(currentPosAfter.x, currentPosAfter.y);
        // chọn màu
        ctx.strokeStyle = colorPaint
        // viền to
        ctx.lineWidth = size *2
        ctx.stroke();

        currentPos.x = currentPosAfter.x
        currentPos.y = currentPosAfter.y
    }
})


// mouseup ==> khi không click và giữ chuột  <==> khi thả chuột
// không vẽ
document.addEventListener('mouseup', function(e){
    isDrawing = false
})


var colorPaint = '#000';

color.addEventListener('change', function(e){
    colorPaint = e.target.value
})

eraser.addEventListener('click', function(e){
    colorPaint = '#fff'
})


var size = 5
decrease.addEventListener('click', function(e){
    size--
    size = size > 5? size : 5
    sizeElement.innerText = size
})

increase.addEventListener('click', function(e){
    size++
    size = size < 30? size : 30
    sizeElement.innerText = size
})

// xóa toàn bộ
clear.addEventListener('click', function(e){
    var canvasStats = canvas.getClientRects()[0]
    ctx.clearRect(0, 0, canvasStats.width, canvasStats.height)
})

//set bg white when download will see bg = white
var canvasStats = canvas.getClientRects()[0]
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvasStats.width, canvasStats.height)
save.addEventListener('click', function(e){
    var output = canvas.toDataURL('image/jpeg', 1.0)
    var tagA = save.querySelector('a')
    tagA.setAttribute('download', 'download.jpeg')
    tagA.setAttribute('href', output)
})


// init: khởi tạo
sizeElement.innerText = size



