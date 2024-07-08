const http = require('http')
const fs = require('fs')
const yargs = require('yargs')
const {hideBin} = require('yargs/helpers')

const args = yargs(hideBin(process.argv)).parse()
const len = Object.keys(args._).length

if(len == 0){
    console.log('You need atributes')
    process.exit(1)
}

const myAPIKEY = process.env.myAPIKEY
const city = args._[0]
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKEY}&units=metric`

http.get(url, (res) => {
    const {statusCode} = res

    if(statusCode !== 200){
        console.log(statusCode);
        return;
    }

    res.setEncoding('utf-8');

    let rawData = ''
    res.on('data', (chunk) => {
        rawData += chunk
    })
    res.on('end', () => {
        let parseData = JSON.parse(rawData)
        console.log(`${parseData.main.temp} градусов по Цельсию`)
    })
}).on('error', (err) => {
    console.error(`Error ${err}`)
})