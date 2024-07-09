const http = require('http')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
})
const myAPIKEY = process.env.myAPIKEY

console.log('Hi. This is the weather app. I will show you weather in the city.\nNow, please, give me a city name: ')
rl.prompt()


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
        console.log(`${parseData.main.temp} degrees Celsius in ${city} now`)
    })
}).on('error', (err) => {
    console.error(`Error ${err}`)
})