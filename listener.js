entview = false;

window.addEventListener("load", function() {
    document.getElementById("GameSpeed").value = gameSpeed;

    this.document.getElementById("generate").addEventListener("click", () => {
        generateWorld();
        console.log("World generated");
    });
    this.document.getElementById("start").addEventListener("click", () => {
        if (!running) {
            worldRunning = setInterval(gameLoop, gameSpeed);
            console.log("started world");
            running = true;
        }
    });
    this.document.getElementById("stop").addEventListener("click", () => {
        clearInterval(worldRunning);
        running = false;
        console.log("Stoped World");
    });
    this.document.getElementById("detailOK").addEventListener("click", () => {
        document.getElementById("detail").innerHTML = "";
        document.getElementById("detailView").style.display = "none";
    });
    this.document.getElementById("settingsBtn").addEventListener("click", () => {
        document.getElementById("GameSpeed").value = gameSpeed;
        document.getElementById("fieldSize").value = xSize;
        document.getElementById("fieldSize").value = ySize;
        document.getElementById("startEntities").value = entityStartAmount;
        document.getElementById("foodAmount").value = foodAmount;
        document.getElementById("settingView").style.display = "flex";
    });
    this.document.getElementById("settingOK").addEventListener("click", () => {
        gameSpeed = document.getElementById("GameSpeed").value;
        xSize = document.getElementById("fieldSize").value;
        ySize = document.getElementById("fieldSize").value;
        entityStartAmount = document.getElementById("startEntities").value;
        foodAmount = document.getElementById("foodAmount").value;
        document.getElementById("settingView").style.display = "none";
    });
    this.document.getElementById("stats").addEventListener("click", () => {
        if (!entview) {
            setEntityView();
            document.getElementById("entView").style.display = "grid";
            entview = true;
            return;
        }
        entview = false;
        document.getElementById("entView").style.display = "none";
    });
    this.document.getElementById("families").addEventListener("click", () => {
        if (!entview) {
            setFamilyView();
            document.getElementById("entView").style.display = "grid";
            entview = true;
            return;
        }
        entview = false;
        document.getElementById("entView").style.display = "none";
    });
    /* 
        canvas.addEventListener('mousedown', function(e) {
            getCursorPosition(canvas, e)
        }) */
});