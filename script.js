var doc = document;

var size = doc.getElementById('sizeSelect');
var newColor = doc.getElementById('color');
var canvas = doc.getElementById('canv');
var ctx = canvas.getContext('2d');
var xCoord = doc.getElementById('xCoord');
var yCoord = doc.getElementById('yCoord');
var tools = ['brush', 'eraser', 'rectangle'];
var activeTool = '';


var system = {
    width: canvas.getAttribute('width'),
    height: canvas.getAttribute('height'),
    currentColor: newColor.value,
    currentTool: '',
    brushSize: size.value,
    startX: 0,
    startY: 0
};

//рендер Системы
var renderSystem = function (obj, elem, action) {
    obj[elem] = action;
};

//Получение коодинат
var getCoordinates = function (evt) {
    let mas = {};
    let x = evt.offsetX;
    let y = evt.offsetY;

    mas = {
        x: x,
        y: y
    };
    xCoord.innerText = x;
    yCoord.innerText = y;

    return mas;
};

//Изменение размера кисти
var switchSize = function (list) {
    return list.value;
};

//Изменение размера кисти
var switchColor = function (evt) {
    system.currentColor = evt.target.value;
};

//Изменение инструмента
var switchTool = function (button) {
    if (button.id == 'brush') {
        setCursor('pointer');
        return 'brush';
    } else if (button.id == 'eraser') {
        setCursor('pointer');
        return 'eraser';
    } else if (button.id == 'rectangle') {
        setCursor('default');
        return 'rectangle';
    }
};

//Мышинные события (клики)
var mouseActionsClick = function (evt) {
    if (evt.target.classList.contains('toolButton') == true) {
        renderSystem(system, 'currentTool', switchTool(evt.target));
    } else if (evt.target.id == 'sizeSelect') {
        renderSystem(system, 'brushSize', switchSize(evt.target));
    }

};


//НЕПОСРЕДСТВЕННО РИСОВАНИЕ

var startDraw = function (evt) {
    if (system.currentTool == 'brush' || system.currentTool == 'eraser') {
        drawLines(evt);
    }
    if (system.currentTool == 'rectangle') {
        drawRectangle(evt);
    }
};

var endDraw = function (evt) {
    canvas.onmousemove = null;
    if (system.currentTool == "rectangle") {
        ctx.beginPath();
        ctx.fillStyle = system.currentColor;
        ctx.fillRect(system.startX, system.startY, xCoord.innerText - system.startX, yCoord.innerText - system.startY);
    }
};

var drawLines = function (evt) {
    canvas.onmousemove = function (evt) {
        ctx.beginPath();
        if (system.currentTool == 'brush') {
            ctx.fillStyle = system.currentColor;
        } else if (system.currentTool == 'eraser') {
            ctx.fillStyle = '#ffffff';
        }
        ctx.fillRect(xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
    }
};

var drawRectangle = function (evt) {
    system.startX = xCoord.innerText;
    system.startY = yCoord.innerText;
};

function setCursor(cursor) {
    canvas.style.cursor = cursor;
}

canvas.addEventListener('mousemove', getCoordinates); //активация получения координат
doc.addEventListener('click', mouseActionsClick); //активация кликов
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
doc.querySelector('#color').addEventListener('change', switchColor);
