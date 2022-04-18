#!/usr/bin/env node

const yargs = require('yargs')
const argv = yargs.argv;

function getDateByArgs() {
    const date = new Date();

    if(argv.y || argv.year) {
        const number =  typeof argv.y == 'number' || typeof argv.year == 'number' ? argv.y || argv.year : 0;
        if(number > 0 && argv._.length > 0) {
            argv._[0] === 'add' ?  date.setFullYear(date.getFullYear() + number) : argv._[0] === 'sub' ? date.setFullYear(date.getFullYear() - number) : null
            return date
        } else {
            return date.getFullYear();
        }
    } else if(argv.m || argv.month) {
        const number =  typeof argv.m == 'number' || typeof argv.month == 'number' ? argv.m || argv.month : 0;
        if(number > 0 && argv._.length > 0) {
            argv._[0] === 'add' ?  date.setMonth(date.getMonth() + number) : argv._[0] === 'sub' ? date.setMonth(date.getMonth() - number) : null
            return date
        } else {
            return date.getMonth() + 1;
        }
    } else if(argv.d || argv.date) {
        const number =  typeof argv.d == 'number' || typeof argv.date == 'number' ? argv.d || argv.date : 0;
        if(number > 0 && argv._.length > 0) {
            const currMil = date.getTime();
            return argv._[0] === 'add' ? new Date(currMil + number * 86400000) : argv._[0] === 'sub' ? new Date(currMil - number * 86400000) : null
        } else {
            return date.getDate();
        }
    } else {
        return date
    }
}

if(argv._.length === 0) {
    console.log(getDateByArgs())
}

yargs.command ({
    command: 'add',
    handler() {
        console.log(getDateByArgs())
    }
})

yargs.command ({
    command: 'sub',
    handler() {
        console.log(getDateByArgs())           
    }
})

yargs.parse()
