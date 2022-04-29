#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const fs = require('fs');
const path = require('path');

const readline = require('readline');
const input = readline.createInterface(process.stdin);

function getRandomArbitrary() {
    return Math.floor(Math.random() * 2 + 1);
}

if(!argv.name) {
    console.log('Пожалуйста, дайте название игре (используйте --name)')
    process.exit(-1)
} else {

    const file = path.join(__dirname, `${argv.name}.json`)
    const content = '{}'
    fs.writeFile(file, content, (err)=> {
        if(err) throw new Error(err);
        console.log('игра началась')
    })
    
    let number = getRandomArbitrary();
    let gameSet = 0;

    input.on('line', (data)=> {
        gameSet += 1;
        fs.readFile(file, 'utf-8', (err, gameResultsJSON) => {
            if(err) throw new Error(err)
            let gameResults = JSON.parse(gameResultsJSON);
            gameResults[gameSet] = +data === number ? "win" : "loose";
            let message = +data === number ? 'Вы выиграли' : 'Вы проиграли';
            fs.writeFile(file, JSON.stringify(gameResults), (err)=>{
                if(err) throw new Error(err)
                console.log(message)
            })
        })
        number = getRandomArbitrary();
            
        if(data === 'стоп') {
            console.log("Конец игры!");
            process.exit(-1)
        }
    })
}
