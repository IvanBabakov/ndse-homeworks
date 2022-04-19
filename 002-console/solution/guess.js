const { rejects } = require('assert');
const EventEmitter = require('events');
const { resolve } = require('path');
const readline = require('readline');

const input = readline.createInterface(process.stdin)
const emiter = new EventEmitter()
const number = Math.floor(Math.random() * 101)

emiter.on('message', message => {
    console.log(message)
})

function guessGame(num) {
    return new Promise ((resolve, rejects) => {
        if(Number.isInteger(+num)) {
            if(num > number) {
                resolve('меньше')
            } else if(num < number) {
                resolve('больше')
            } else {
                resolve(`Отгадано число ${number}`)
            }
        } else {
            rejects('только число!')
        }
    })
}

input.on('line', data => guessGame(data).then(result => console.log(result)).catch(result => console.log(result)));

emiter.emit('message', `Загадано число в диапазоне от 0 до 100`)

