var xSize = 100;
var ySize = 100;
const entScale = (500 / xSize);
var entityStartAmount = 5;
var gameSpeed = 50;
const ageLimit = 50;
var foodAmount = 20;
var world = [];
var foodInWorld = [];
var entitiesInWorld = [];
var deadEntitys = [];
var families = [];
var born;
var died;
var round;
var shownEntites = false;
var shownFamilies = false;

var running = false;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class foodObject {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}