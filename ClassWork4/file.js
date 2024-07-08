const http = require('http')

const myAPIKey = process.env.myAPIKey
const url = `http://data.fixer.io/api/latest?access_key=${myAPIKey}&symbols=USD,EUR,RUB`

http.get(url, (res) => {
    const {statusCode} = res

    if(statusCode != 200){
        console.log(statusCode)
        return 1
    }

    res.setEncoding('utf-8')

    let rawData = ''
    res.on('data', (chunk) => {
        rawData += chunk
    })
    res.on('end', () => {
        let parseData = JSON.parse(rawData).rates

        console.log(parseData)
    }).on('error', (error) => {
        console.error(error)
    })
})