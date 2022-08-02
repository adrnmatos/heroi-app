var assert = require('assert')

const database = require('./database')

describe('heroi test-suite', () => {

    before('create db file', () => {
        database.writeDBFile('[]')
    })

    beforeEach('create control hero element', async () => {
        const controlHero = {name: 'thor', power: 'hammer', id: '1'}
        await database.createHero(controlHero)
    })

    // read all heroes
    it('should read db file and returns the contents in an array', async () => {
        const result = await database.readDBFile()
        assert.ok(result)
    })

    // find hero by its id
    it('should find a hero by its id and returns the hero object', async () => {
        const result = await database.findHero('1')
        assert.ok(result)
    })

    // create a hero
    it('should insert a new hero on the list and returns true/false to indicate success/failure', async () => {
        const newHeroFields = {name: 'batman', power: 'money', id: '2'}
        let result = await database.createHero(newHeroFields)
        assert.ok(result, true)
    })

    // delete a hero
    it('should remove a hero from db and returns true/false to indicate success/failure', async () => {
        let result = await database.removeHero('1')
        assert.ok(result, true)
    })

    // update hero
    it('should update hero fields and returns true/false to indicate success/failure', async () => {
        let newFields = {power: 'wits'}
        const result = await database.updateHero('1', newFields)
        assert.ok(result, true)
    })

    afterEach('remove control hero', async () => {
        await database.removeHero('1')
    })

    after('remove db file', async () => {
        database.removeDBFile()
    })

})