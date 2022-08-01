var assert = require('assert')

const database = require('./database')

const { isTypedArray } = require('util/types')


describe('heroi test-suite', () => {

    // create db file
    // before('should create db file and returns true/false to indicate success/failure', () => {
    //     database.writeDBFile('[]')
    // })

    // read all heroes
    // it('should read db file and returns the contents in an array', async () => {
    //     const result = await database.readDBFile()
    //     assert.ok(result)
    // })

    // look-up for hero by its id
    // it('should find a hero by its id and returns the hero object', async () => {
    //     const result = await database.findHero('85834034-d3f0-4193-9dab-8c70f80042d6')
    //     assert.ok(result)
    // })

    // create hero
    // it('should insert a new hero on the list and returns true/false to indicate success/failure', async () => {
    //     const newHeroFields = {name: 'batman', power: 'money'}
    //     let result = await database.createHero(newHeroFields)
    //     assert.ok(result, true)
    // })

    // delete hero
    // it('should remove a hero from db found by its id and returns true/false to indicate success/failure', async () => {
    //     let result = await database.removeHero('fa41e4b1-5ba2-4033-878e-bcdc8ffc425c')
    //     assert.ok(result, true)
    // })

    // update hero
    it('should update hero fields and returns true/false to indicate success/failure', async () => {
        let newFields = {power: 'sword'}
        const result = await database.updateHero(newFields, 'ac0881f1-aa4a-4d4e-8ffc-c97255df83f1')
        assert.ok(result, true)
    })

    // clean-up
    // after('should remove db file and returns true/false to indicate success/failure', async () => {
    //     database.removeDBFile()
    // })

})

