function generateWorld() {
    world = [];
    foodInWorld = [];
    entitiesInWorld = [];
    deadEntitys = [];
    families = [];

    generateGrid();
    addRandomFood();
    addEntities();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStuff(foodInWorld);
    drawStuff(entitiesInWorld);
    round = 0;

    function generateGrid() {
        for (let x = 0; x < xSize; x++) {
            for (let y = 0; y < ySize; y++) {
                const cell = { x, y };
                world.push(cell);
            }
        }
    }

    function addEntities() {
        for (let i = 0; i < entityStartAmount; i++) {
            const tempEnt = new entity;
            tempEnt.x = setRandom(xSize);
            tempEnt.y = setRandom(ySize);
            tempEnt.age = 0;
            tempEnt.generation = 1;
            tempEnt.color = randomColor();
            tempEnt.family = rgbToHex(tempEnt.color);
            tempEnt.ancestor = tempEnt.family;
            entitiesInWorld.push(tempEnt);
            addToFamily(tempEnt.family);
        }
    }
}

function addRandomFood() {
    var tempAmount = foodAmount;
    if (getRandomIntInclusive(1, 10) < 3) {
        return;
    }
    if (getRandomIntInclusive(1, 10) < 3) {
        tempAmount = foodAmount * 2;
    }
    for (let i = 0; i < tempAmount; i++) {
        const tempFood = new foodObject;
        tempFood.x = setRandom(xSize);
        tempFood.y = setRandom(ySize);
        tempFood.color = "green";
        foodInWorld.push(tempFood);
    }
}

function addToFamily(ent) {
    if (families.indexOf(ent) !== -1) {
        console.log("Family exists!")
        return;
    }
    families.push(ent);
}