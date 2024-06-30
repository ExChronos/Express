const readline = require('readline')
const fs = require('fs')
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')

let game = () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    })

    let random = (min, max) => {
        let rand = min + Math.random()*(max+1-min)
        return Math.floor(rand)
    }

    let randNum = random(1,2)
    let score = 0
    let miss = 0

    console.log('Итак, Я подбросил монетку. Орел или решка (1:2)? (для выхода нажми комбинацию Ctrl+C)')
    rl.prompt()

    rl.on('line', (input) => {
        if (input == randNum){
                console.log('Ей! Ты везунчик!')
        score += 1
        }else if(input != randNum && (input > 0 && input < 3)) {
            console.log('Вдругой раз повезет)')
            miss += 1
        }else {
        console.log('Нужно выбрать из пары [1,2]. Давай еще раз')
        }
        randNum = random(1,2)
        rl.prompt()

    }).on('close', () => {

        writeToFile(score)

        console.log(`Твой счет: ${score} - угадал, ${miss} - промахнулся.
                \rСпасибо за игру. Хорошего дня!`)
        process.exit(0)
    })
}

let writeToFile = (score) => {
    let fileName = yargs(hideBin(process.argv)).parse()._[0]

    const date = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`

    fs.appendFileSync(fileName, `Игрок: ${date} - ${score} очков\n`, (error) => {
        if(error) throw error;
        console.log('Запись произошла успешно')
    })
}

game()