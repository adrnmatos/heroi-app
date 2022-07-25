var assert = require('assert')

const database = require('./database')

const { isTypedArray } = require('util/types')


describe('heroi test-suite', () => {

    // before('should create herois.json file', () => {
    //     database.writeDBFile('[]')
    // })

    it('should read herois.json file contents', async () => {
        const result = await database.readDBFile()
        assert.ok(result)
    })

    it('should insert a new hero on the list', async () => {
        const newHero = {name: 'deadpool', power: 'immortal'}
        await database.createHero(newHero)
    })

    // after('should remove herois.json file', () => {
    //     database.removeDBFile()
    // })

})

