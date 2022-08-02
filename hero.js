// const { v4: uuidv4 } = require('uuid')

class Hero {
    constructor(name, power, id) {
        this.name = name;
        this.power = power;
        this.id = id;
        // this.id = uuidv4();
    }
}

module.exports = Hero