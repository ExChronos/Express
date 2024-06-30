const fs = require('fs')
// const readerStream = fs.createReadStream('package.json')

// let data
// readerStream
// .setEncoding('utf-8')
// .on('data', (chank) => {
//     data += chank
// })
// .on('end', () => {
//     console.log('end', data)
// })

// const content = 'content \n'
// const writeStr = fs.createWriteStream('output.txt')

// writeStr.write(content, 'utf-8')
// writeStr.end()

// writeStr.on('finish', () => {
//     console.log('finish')
// })

// writeStr.on('close', () => {
//     console.log('close')
// })

// writeStr.on('error', () => {
//     console.log('error')
// })

const readStr1 = fs.createReadStream('package.json')
const writeStr1 = fs.createWriteStream('output.txt')

readStr1.pipe(writeStr1)