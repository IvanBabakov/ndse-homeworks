#!/usr/bin/env node

const readline = require('readline');
const http = require('http');
require('dotenv').config();

console.log('Введите название города:')

const input = readline.createInterface(process.stdin)

input.on('line', (name)=>{
    const weatherAPIkey = process.env.myAPIkey;
    
    const city = name;
    const url = `http://api.weatherstack.com/current?access_key=${weatherAPIkey}&query=${city}`
    http.get(url, (res)=>{
        const statusCode = res.statusCode;
        if(statusCode !== 200 ) {
            console.error(`Status code: ${statusCode}`);
            return
        }

        res.setEncoding('utf8');
        let weatherInfo = '';
        res.on('data', (chunk)=> weatherInfo += chunk);
        res.on('end', ()=>{
            let weatherInfoParse = JSON.parse(weatherInfo);
            console.log(`Погода в ${weatherInfoParse.location.name}: ${weatherInfoParse.current.temperature}º С`)
        })
    })
})