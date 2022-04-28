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
        
        if (+data === number) {
            gameSet += 1;

            fs.readFile(file, 'utf-8', (err, data) => {
                if(err) throw new Error(err)
                let jsonData = JSON.parse(data);
                jsonData[gameSet] = "win"

                fs.writeFile(file, JSON.stringify(jsonData), (err)=>{
                    if(err) throw new Error(err)
                    console.log('Вы выиграли')
                })
            })
            number = getRandomArbitrary();
            
        } else {
            gameSet += 1;
    
            fs.readFile(file, 'utf-8', (err, data) => {
                if(err) throw new Error(err)
                let jsonData = JSON.parse(data);
                jsonData[gameSet] = "loose"

                fs.writeFile(file, JSON.stringify(jsonData), (err)=>{
                    if(err) throw new Error(err)
                    console.log('Вы проиграли')
                })
            })
            number = getRandomArbitrary();
            
        }

        if(data === 'стоп') {
            console.log("Конец игры!");
            process.exit(-1)
        }
    })
}
