const readline = require('node:readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Ohey> ',

})

const num = Math.trunc(Math.random()*100)

console.log('Угадай число от 0 до 100')
rl.prompt()

rl.on('line', (input) => {
    if(input < num){
        console.log('Число должно быть больше')
    } else if(input > num){
        console.log('Число должно быть меньше')
    } else{
        console.log('Ты УГАДАЛ(А)!!!')
        process.exit(0);
    }
    rl.prompt()
}).on('close', () => {
    console.log('\nВ другой раз. Хорошего дня!')
    process.exit(1)
})