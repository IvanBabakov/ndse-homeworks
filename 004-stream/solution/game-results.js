#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('Введите название игры:')

const input = readline.createInterface(process.stdin);

let name;
input.on('line', (data) => {
    name = data;

    const file = path.join(__dirname, `${name}.json`)

    let gameResult = '';
    const readerStream = fs.createReadStream(file)
    readerStream.setEncoding('UTF8');
    readerStream.on('data', (chunk)=> {
        gameResult += chunk
    })

    readerStream.on('end', ()=>{
        const results = JSON.parse(gameResult)
        const sets = Object.keys(results).length
        let setsWin = 0;
        let setsLoose = 0;
        for (let i in results) {
            if(results[i] === 'win') {
                setsWin += 1
            } else {
                setsLoose += 1
            }
        }
        const percentageWinSets = (setsWin/sets) * 100;
        console.log(
            `Результаты игры: 
            общее количество партий - ${sets}, 
            количество проигранных партий - ${setsLoose}, 
            количество выигранных партий - ${setsWin}, 
            процентное соотношение выигранных партий - ${percentageWinSets.toFixed(2)}`
        )
    })
})

