const {MongoClient} = require('mongodb')
const MongoDBClient = new MongoClient('mongodb://localhost:27017/test')

const employee = {
    patronymic: 'Olegovich',
    surname: 'Eparskii',
    age: 45,    
    salary: 260000,
    department: 'DevRel',
    date_of_birth: '15.11.1977',
    first_name: 'Anton'
}

const Insert = async () => {
    try {
        await MongoDBClient.connect()
        console.log('Успешное подключение к БД');

        const employees = MongoDBClient.db('test').collection('employees')
        await employees.insertOne(employee)

        await MongoDBClient.close()
        console.log('Успешно закрыли БД');
        
    } catch (error) {
        console.log(error);
    }
}

Insert()