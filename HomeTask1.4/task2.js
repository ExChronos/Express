const fs = require('fs')

fs.readFile('scrores.txt', 'utf-8', (error, data) => {
    if(error)
        console.log('Невозможно прочитать файл')

    let count = 0
    let win = 0

    for(let i = 0; i < data.length; i++){
        if(data[i] == '\n')
            count += 1

        if(data[i] == '-')
            win += +(data[i+2])
    }
    
    console.log(`Количество партий - ${count}. Побед - ${win}`);
})
