const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const { exit } = require('yargs')

const args = yargs(hideBin(process.argv)).parse()
const len = Object.keys(args._).length
const modeLen = Object.keys(args).length
const mode = args._

if(len == 0){
    console.log('You need atributes')
    exit(1)
}

else {
    if(mode[0] == 'current'){
        if(modeLen == 2){
            console.log(`Current time is ISO fomr: ${new Date().toISOString()}`)
        }
        else{
            if(args.year || args.y){
                console.log(`Now is ${new Date().getFullYear()} year`)
            } else if(args.month || args.m){
                console.log(`Now is ${new Date().getMonth()} month`)
            } else if(args.date || args.d){
                console.log(`Today: ${new Date().getDate()} day of month`)
            }
        }
    }
    else{
        if(mode[0] == 'add'){
            let val = 0

            if(!args.month && !args.m && !args.year && !args.y && !args.date && !args.d){
                console.log("You don't have enough data")
                exit(2)
            }
            if(args.year || args.y){
                val = args.year || args.y
                console.log(`Your year is ${new Date().getFullYear()+val}`)
            } else if(args.month || args.m){
                val = args.month || args.m
                console.log(`Your month is ${new Date().getMonth()+val}`)
            } else if(args.date || args.d){
                val = args.date || args.d
                console.log(`Your day is ${new Date().getDate()+val}`)
            }
        }
        if(mode[0] == 'sub'){
            let val = 0
            if(!args.month && !args.m && !args.year && !args.y && !args.date && !args.d){
                console.log("You don't have enough data")
                exit(2)
            }
            if(args.year || args.y){
                val = args.year || args.y
                console.log(`Your year is ${new Date().getFullYear()-val}`)
            } else if(args.month || args.m){
                val = args.month || args.m
                console.log(`Your month is ${new Date().getMonth()-val}`)
            } else if(args.date || args.d){
                val = args.date || args.d
                console.log(`Your day is ${new Date().getDate()-val}`)
            }
        }
    }
}