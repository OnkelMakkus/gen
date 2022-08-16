class entity {
    constructor(age,
        size,
        ageLimit,
        strength,
        color,
        children,
        childrenMax,
        speed,
        energy,
        mutations,
        fov,
        consumption,
        reproductionEnergy,
        x,
        y,
        generation,
        family,
        direction,
        determination,
        carnivore,
        eaten,
        ancestor
    ) {
        this.age = age;
        this.size = getRandomIntInclusive(1, 3);
        this.ageLimit = getRandomIntInclusive(20, 100);
        this.color = color;
        this.children = 0;
        this.mutations = 0;
        this.strength = getRandomIntInclusive(1, 5);
        this.childrenMax = getRandomIntInclusive(1, 5);
        this.speed = getRandomIntInclusive(1, 5);
        this.energy = getRandomIntInclusive(40, 80);
        this.reproductionEnergy = this.energy * 2;
        this.consumption = getRandomIntInclusive(1, 10);
        this.x = x;
        this.y = y;
        this.generation = generation;
        this.family = family;
        this.carnivore = 0;
        this.eaten = 0;
        this.determination = getRandomIntInclusive(1, 9);
        this.direction = getRandomIntInclusive(1, 8);
        this.ancestor = ancestor;

    }
    entityFoodFind() {
        if (this.energy < this.reproductionEnergy) {
            if (this.carnivore == 1) {
                for (const element2 of entitiesInWorld) {
                    const dis = getDistance(this.x, this.y, element2.x, element2.y);
                    if (dis <= this.speed && this.family != element2.family) {
                        this.x = element2.x;
                        this.y = element2.y;
                        if (this.strength > element2.strength) {
                            this.energy += element2.energy;
                            element2.energy = 0;
                            this.eaten++;
                        } else {
                            if (element2.carnivore == 1) {
                                element2.energy += this.energy;
                                element2.eaten++;
                            }
                            this.energy = 0;
                        }
                        return;
                    }
                }
                this.moveEntity();

            } else {
                for (const element2 of foodInWorld) {
                    const dis = getDistance(this.x, this.y, element2.x, element2.y);
                    if (dis <= this.speed) {
                        this.x = element2.x;
                        this.y = element2.y;
                        this.energy += 10;
                        foodInWorld.splice(foodInWorld.indexOf(element2), 1);
                        return;
                    }

                }
                this.moveEntity();
            }

        } else {
            this.moveEntity();
        }
    }
    moveEntity() {
        var dir = getRandomIntInclusive(1, 8);
        const speed = this.speed * this.size;
        if (getRandomIntInclusive(1, 10) <= this.determination) {
            dir = this.direction;
        } else {
            this.direction = dir;
        }

        if (dir == 1) {
            this.y -= 1 * speed;
        }
        if (dir == 2) {
            this.y -= 1 * speed;
            this.x += 1 * speed;
        }
        if (dir == 3) {
            this.y -= 0;
            this.x += 1 * speed;
        }
        if (dir == 4) {
            this.y += 1 * speed;
            this.x += 1 * speed;
        }
        if (dir == 5) {
            this.y += 1 * speed;
            this.x += 0;
        }
        if (dir == 6) {
            this.y += 1 * speed;
            this.x -= 1 * speed;
        }
        if (dir == 7) {
            this.y += 0;
            this.x -= 1 * speed;
        }
        if (dir == 8) {
            this.y -= 1 * speed;
            this.x -= 1 * speed;
        }
        if (this.y < 0) { this.y = ySize }
        if (this.y > ySize) { this.y = 0 }
        if (this.x < 0) { this.x = xSize }
        if (this.x > xSize) { this.x = 0 }
    }
    entityReproduce() {
        if (this.energy >= this.reproductionEnergy && this.children < this.childrenMax) {
            born++;
            this.energy -= this.reproductionEnergy;
            this.children++;
            const tempEnt = new entity;
            tempEnt.x = this.x;
            tempEnt.y = this.y;
            tempEnt.speed = this.speed;
            tempEnt.age = 0;
            tempEnt.size = this.size;
            tempEnt.reproductionEnergy = this.reproductionEnergy;
            tempEnt.ageLimit = this.ageLimit;
            tempEnt.childrenMax = this.childrenMax;
            tempEnt.generation = this.generation + 1;
            tempEnt.consumption = this.consumption;
            tempEnt.strength = this.strength;
            tempEnt.color = this.color;
            tempEnt.family = this.family;
            tempEnt.carnivore = this.carnivore;
            tempEnt.determination = this.determination;
            tempEnt.ancestor = this.ancestor;
            this.mutation(tempEnt);
            entitiesInWorld.push(tempEnt);
            addToFamily(tempEnt.family);
        }
    }

    mutation(tempEnt) {
        if (getRandomIntInclusive(1, 100) <= 5) {
            tempEnt.speed++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 5) {
            tempEnt.strength++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 2 && tempEnt.strength > 1) { tempEnt.strength--; }
        if (getRandomIntInclusive(1, 100) <= 1) {
            tempEnt.speed--;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 2 && tempEnt.consumption > 1) { tempEnt.consumption--; }
        if (getRandomIntInclusive(1, 100) == 1) {
            tempEnt.consumption++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 10) {
            tempEnt.ageLimit++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 1) {
            if (tempEnt.carnivore == 0) {
                tempEnt.carnivore = 1;
                tempEnt.strength += 2;
                tempEnt.consumption++;
                tempEnt.speed += 2;
                this.startNewFamily(tempEnt);
            }
        }
        if (getRandomIntInclusive(1, 100) <= 5) {
            tempEnt.ageLimit--;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 3 && tempEnt.reproductionEnergy > 1) {
            tempEnt.reproductionEnergy--;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 3) {
            tempEnt.reproductionEnergy++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 3) {
            tempEnt.size++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 5) {
            tempEnt.childrenMax++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 5 && tempEnt.childrenMax > 1) {
            tempEnt.childrenMax--;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 5 && tempEnt.determination < 9) {
            tempEnt.determination++;
            this.startNewFamily(tempEnt);
        }
        if (getRandomIntInclusive(1, 100) <= 5 && tempEnt.determination > 1) {
            tempEnt.determination--;
            this.startNewFamily(tempEnt);
        }
    }
    startNewFamily(tempEnt) {
        tempEnt.mutations++;
        if (tempEnt.mutations > 1) {
            tempEnt.color = randomColor();
            tempEnt.family = rgbToHex(tempEnt.color);
            tempEnt.mutations = 0;
        }
    }

    /* entityEaten(ent) {
        deadEntitys.push(ent);
        const index = entitiesInWorld.indexOf(ent);
        entitiesInWorld.splice(index, 1);
        ent.removeFromFamily(ent.family);
        died++;
    } */

    entityDeath() {
        if (this.energy <= 0) {
            deadEntitys.push(this);
            const index = entitiesInWorld.indexOf(this);
            entitiesInWorld.splice(index, 1);
            this.removeFromFamily(this.family);
            died++;
        }
        if (this.age > this.ageLimit && getRandomIntInclusive(1, (100 * this.size)) <= (1 + (this.age - this.ageLimit))) {
            deadEntitys.push(this);
            const index = entitiesInWorld.indexOf(this);
            entitiesInWorld.splice(index, 1);
            this.removeFromFamily(this.family);
            died++;

        }
    }
    removeFromFamily(fam) {
        const checkIfMemberAlive = obj => obj.family === fam;
        if (entitiesInWorld.some(checkIfMemberAlive)) {
            return;
        }
        const index = families.indexOf(fam);
        families.splice(index, 1);
    }
}