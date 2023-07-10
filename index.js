const express = require('express')
const connecting = require('./connection')
const app = express();

const mysql = require('mysql')






app.listen(4500, () => {
    console.log('server running at http://localhost/4500')
})

app.use(express.json())



app.get('/', (request, response) => {
    const connection = connecting()
    const getUsersQuery = `SELECT * FROM person`;
    connection.query(getUsersQuery, (error, rows) => {
        if (error) throw error;
        console.log('The data from person table are: \n', rows)
        response.send(rows)
        connection.end()
    })
})

app.post('/register', (request, response) => {

    const {id, name, password, address} = request.body 
    console.log(request.body)

    const connection = connecting()
    const insertUserQuery = `INSERT INTO person (id, name, password, adress)
                             VALUES( ${id}, "${name}", "${password}", "${address}")`

    connection.query(insertUserQuery, (error, data) => {
        if (error) throw error
        response.send('User Details Inserted Successfully')
        connection.end()
    })
})

app.put('/user/:id', (request, response) => {

    const {id, name, password, address} = request.body 
    const userId = request.params.id

    const updateUserDetailsQuery = `UPDATE person SET id = ${id}, name = "${name}", password= "${password}", adress = "${address}"  WHERE id = ${userId}`

    const connection = connecting() 
    connection.query(updateUserDetailsQuery, (error, data) => {
        if (error) throw error;
        response.send('User Details Updated Successfully')
        connection.end()
    })
})

app.delete('/user/:id', (request, response) => {

    const userId = request.params.id 

    const deleteUserQuery = `DELETE FROM person WHERE id = ${userId}`

    const connection = connecting()
    connection.query(deleteUserQuery, (error, data) => {
        if (error) throw error 
        response.send('User Deleted Successfully')
        connection.end()
    })
})