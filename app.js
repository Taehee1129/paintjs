const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

//canvas의 구간을 정해줘야 ctx.lineTo 나 ctx. stroke가 작동함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//canvas의 배경색을 지정해줘야함
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//context stroke의 시작 색깔 
ctx.strokeStyle = INITIAL_COLOR;
//context fill의 시작 색깔 
ctx.fillStyle= INITIAL_COLOR;
//context의 시작 두깨
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPaingting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        //closePath하면 항상 똑같은 포인트에서 시작함.
        //ctx.closePath();
    }
}

function handleColorClick(event){
   const color = event.target.style.backgroundColor;
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Filling";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

// does't work
/*function handleCM(event){
    event.preventDefault();
}*/

function saveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "YourPaint";
    link.click();
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPaingting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    /*canvas.addEventListener("contextmenu", handleCM);*/
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);



if(range) {
    range.addEventListener("input", handleRangeChange);

}


if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", saveClick);
}