const http = require('http')
const readline = require('readline')

const myAPIKEY = process.env.myAPIKey

const reqKey = (key) => {
    if(!key){
        console.log('API key does not exist\nClose the app')
        process.exit(1);
    }
}

reqKey(myAPIKEY)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
})

console.log(`Hi. This is the weather app.\nTo start give me a city name (to stop enter empty string)`)
rl.prompt()

rl.on('line', (input) => {

    if(!input){
        console.log('Have a great day!')
        process.exit(0)
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myAPIKEY}&units=metric`;

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
            console.log(`${parseData.main.temp} degrees Celsius in ${input} now`)
            console.log('Great! Give me the next city');
            rl.prompt()
        })
    }).on('error', (error) => {
        console.log(error);
    })


}).on('close', () => {
    console.log('Thanks for using. Have a great day!');
    process.exit(1)
})