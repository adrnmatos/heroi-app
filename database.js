const { writeFile, unlink, readFile } = require("fs").promises

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

    async createHero(newHero) {
        try {
            var heroList = await this.readDBFile()
            heroList.push(newHero)
            await this.writeDBFile(JSON.stringify(heroList))
            return true
        } catch (error) {
            console.error('createHero error: ', error)
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