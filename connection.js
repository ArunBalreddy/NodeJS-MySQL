const mysql = require('mysql')

const createConnection = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'user'
    })
    
    connection.connect((err) => {
        if (err){
            throw err
        }else{
            console.log('Succeessfully Connected to MySQL Server')
        }
    })

    return connection
}


module.exports =  createConnection