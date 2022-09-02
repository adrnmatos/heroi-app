const { program } = require('commander')
const database = require('./database')

const formatAddOptions = (prog) => {
    const options = prog.opts()
    if (options) {
        console.log(options)
        return JSON.stringify(options)
    }

    else
        console.log('program error')
}

program
.option('-l, --list', 'list all saved heroes')

program
.command('add')
.option('-n, --name <nome>', 'hero name')
.option('-p, --power <poder>', 'hero power')
.action(() => {
    let heroFields = formatAddOptions(program)
    console.log(heroFields)
})


program.parse()

const options = program.opts()
if(options.list) {
    console.log(database.listHeroes())
}