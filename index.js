const { program } = require('commander')

program
.usage('[options')
.option('--list')

program.parse()

const options = program.opts()
console.log(options)