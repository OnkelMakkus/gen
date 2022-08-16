function drawStuff(object) {
    for (const toDraw of object) {
        let xstart = toDraw.x * entScale;
        let ystart = toDraw.y * entScale;
        if (toDraw.x == 0) { xstart = 0 };
        if (toDraw.y == 0) { ystart = 0 };
        ctx.fillStyle = toDraw.color;
        ctx.fillRect(xstart, ystart, entScale, entScale);
    }
}

function gameLoop() {
    born = 0;
    died = 0;
    round++;
    addRandomFood();
    for (const entity of entitiesInWorld) {
        entity.entityFoodFind();
        entity.energy -= (entity.consumption * entity.size);
        entity.age++;
        entity.entityReproduce();
        entity.entityDeath();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStuff(foodInWorld);
    drawStuff(entitiesInWorld);
    setEntityView();
    document.getElementById("round").innerHTML = "Iteration: " + round;
    document.getElementById("alive").innerHTML = "Alive: " + entitiesInWorld.length;
    document.getElementById("food").innerHTML = "Food: " + foodInWorld.length;
    document.getElementById("died").innerHTML = "Died this Round: " + died;
    document.getElementById("born").innerHTML = "Born this Round: " + born;
    document.getElementById("families").innerHTML = "Families: " + families.length;
}

/* Helper */
function setRandom(val) {
    rnd = Math.floor(Math.random() * val);
    return rnd;
}

function randomColor() {
    return 'rgb(' + setRandom(255) + ',' + setRandom(255) + ',' + setRandom(255) + ')';
}

function rgbToHex(a) {
    a = a.replace(/[^\d,]/g, "").split(",");
    return "#" + ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function displayAllStats(entID) {
    var element = entitiesInWorld[entID];
    console.log(element.energy);

    const entryText = `Age: ${element.age}` +
        " Speed: " + element.speed +
        " Energy: " + element.energy +
        " Generation: " + element.generation +
        " Children: " + element.children +
        " Strength: " + element.strength +
        "<br> Family: " + element.family +
        " Size: " + element.size +
        " Agelimit: " + element.ageLimit +
        " Children Max: " + element.childrenMax +
        " Reproduction Energy: " + element.reproductionEnergy +
        " Determination: " + element.determination +
        " <br>Carnivore: " + element.carnivore +
        " Eaten: " + element.eaten +
        " Heritage: " + element.ancestor +
        " Consumtionrate: " + element.consumption;
    document.getElementById("detail").innerHTML = entryText;
    document.getElementById("detailView").style.display = "block";
}

function setEntityView() {
    document.getElementById("entView").innerHTML = "";
    for (let i = 0; i < entitiesInWorld.length; i++) {
        const entry = document.createElement("div");
        const entryText = `Entity: ${i} Age: ${entitiesInWorld[i].age}` +
            " Speed: " + entitiesInWorld[i].speed +
            " Generation: " + entitiesInWorld[i].generation +
            " Carnivore: " + entitiesInWorld[i].carnivore +
            " Children: " + entitiesInWorld[i].children +
            " Family: " + entitiesInWorld[i].family;
        entry.innerHTML = entryText;
        entry.setAttribute("class", "entry");
        entry.setAttribute("id", i);
        entry.addEventListener("click", function() {
            displayAllStats(this.id);
        });

        document.getElementById("entView").appendChild(entry);
    }
}

function setFamilyView() {
    document.getElementById("entView").innerHTML = "";
    for (let i = 0; i < families.length; i++) {
        const entry = document.createElement("div");
        entry.innerHTML = families[i];
        entry.setAttribute("class", "entry");
        entry.setAttribute("id", families[i]);
        entry.addEventListener("click", function() {
            showFamily(this.id);
        });
        document.getElementById("entView").appendChild(entry);
    }
}

function showFamily(fam) {
    document.getElementById("entView").innerHTML = "";
    for (let i = 0; i < entitiesInWorld.length; i++) {
        if (entitiesInWorld[i].family == fam) {
            const entry = document.createElement("div");
            const entryText = `Entity: ${i} Age: ${entitiesInWorld[i].age}` +
                " Speed: " + entitiesInWorld[i].speed +
                " Generation: " + entitiesInWorld[i].generation +
                " Children: " + entitiesInWorld[i].children +
                " Family: " + entitiesInWorld[i].family;
            entry.innerHTML = entryText;
            entry.setAttribute("class", "entry");
            entry.setAttribute("id", i);
            entry.addEventListener("click", function() {
                displayAllStats(this.id);
            });
            document.getElementById("entView").appendChild(entry);
        }
    }
}