const { writeFile, unlink, readFile } = require("fs").promises
const Hero = require('./hero')


const DB_FILE = 'herois.json'

class Database {
    
    async writeDBFile(content) {
        try {
            await writeFile(DB_FILE, content)
            return true;
        } catch (error) {
            console.error('writeDBFile error: ', error)
            return false
        }
    }
    
    async readDBFile() {
        try {
            const heroList = JSON.parse(await readFile(DB_FILE))
            return heroList;
        } catch (error) {
            console.error('readDBFile error: ', error)
        }
    }
    
    async findHero(id) {
        try {
            var heroList = await this.readDBFile()
            let foundHero = heroList.filter((el) => el.id === id)

            console.log('HERO FOUND: ', foundHero)
            return foundHero;
        } catch (error) {
            console.error('findHero error: ', error)
        }
    }

    async createHero(heroFields) {
        try {
            var heroList = await this.readDBFile()
            let newHero = new Hero(heroFields.name, heroFields.power)
            heroList.push(newHero)

            await this.writeDBFile(JSON.stringify(heroList))
            return true
        } catch (error) {
            console.error('createHero error: ', error)
            return false
        }
    }

    async updateHero(fields, id) {
        try {
            let foundHero = await this.findHero(id)
            if(foundHero) {
                console.log('foundHero ID: ', foundHero[0].id)
                await this.removeHero(foundHero.id)
                let heroList = await this.readDBFile()
                console.log('heroList after remove: ', heroList)
                let updatedHero = {
                    ...foundHero,
                    fields
                }

                console.log(updatedHero)
                heroList.push(updatedHero)
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
            var heroList = await this.readDBFile()
            var foundHeroId = heroList.findIndex((el) => el.id === id)
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
            return true
        } catch (error) {
            console.error('removeDBFile error: ', error)
            return false
        }
    }
}


module.exports = new Database()