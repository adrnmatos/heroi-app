const { writeFile, unlink, readFile } = require("fs").promises
const Hero = require('./hero')

const DB_FILE = 'herois.json'

class Database {
    
    async writeDBFile(content) {
        try {
            await writeFile(DB_FILE, content)
        } catch (error) {
            console.error('writeDBFile error: ', error)
        }
    }
    
    async readDBFile() {
        try {
            let heroList = JSON.parse(await readFile(DB_FILE))
            return heroList;
        } catch (error) {
            console.error('readDBFile error: ', error)
            return false
        }
    }
    
    async findHero(id) {
        try {
            let heroList = await this.readDBFile()
            let foundHero = heroList.filter((el) => el.id === id)
            return foundHero;
        } catch (error) {
            console.error('findHero error: ', error)
            return false
        }
    }

    async createHero(heroFields) {
        try {
            let heroList = await this.readDBFile()
            let newHero = new Hero(heroFields.name, heroFields.power, heroFields.id)
            heroList.push(newHero)

            await this.writeDBFile(JSON.stringify(heroList))
            return true
        } catch (error) {
            console.error('createHero error: ', error)
            return false
        }
    }

    async updateHero(id, fields) {
        try {
            let foundHeroList = await this.findHero(id)
            if (foundHeroList) {
                let foundHeroObj = foundHeroList[0]
                let updateHero = {}
                for(const field in foundHeroObj) {
                    if (fields[field]) {
                        updateHero[field] = fields[field]
                    } else {
                        updateHero[field] = foundHeroObj[field]
                    }
                }
                
                await this.removeHero(id)

                let heroList = await this.readDBFile()
                heroList.push(updateHero)
                await this.writeDBFile(JSON.stringify(heroList))

                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('updateHero error:', error)
            return false
        }
    }

    async removeHero(id) {
        try {
            let heroList = await this.readDBFile()
            let foundHeroId = heroList.findIndex((el) => el.id === id)
            if(foundHeroId != -1) {
                heroList.splice(foundHeroId,1)
                await this.writeDBFile(JSON.stringify(heroList))
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('removeHero error: ', error)
            return false
        }
    }

    async removeDBFile() {
        try {
            await unlink(DB_FILE)
        } catch (error) {
            console.error('removeDBFile error: ', error)
        }
    }
}


module.exports = new Database()