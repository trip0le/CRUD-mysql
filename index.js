const connection = require('./connection')
const express = require('express')
const bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json());

app.get('/getContacts', (req, res)=>{
    connection.query('SELECT * FROM employee', (err, rows)=>{
        if(err) console.log(err)
        else res.send(rows)
    })
})


app.get('/getContact/:id', (req, res)=>{
    connection.query('SELECT * FROM employee WHERE id=?',[req.params.id], (err, rows)=>{
        if(err) console.log(err)
        else res.send(rows)
    })
})

app.delete('/deleteContact/:id', (req, res)=>{
    connection.query('DELETE FROM employee WHERE id=?',[req.params.id], (err, rows)=>{
        if(err) console.log(err)
        else res.send(rows)
    })
})

app.post('/createContact', (req, res)=>{
    var emp = req.body
    var empData = [emp.first_name, emp.last_name, emp.email, emp.mobile_number]
    console.log(empData)
    connection.query('INSERT INTO employee(first_name, last_name, email, mobile_number) VALUES(?)',[empData], (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send(rows);
        }
    })
})

app.put('/updateContact/:id', (req, res)=>{
    var emp = req.body
    connection.query('UPDATE employee SET ? WHERE id=' +req.params.id, [emp], (err, rows)=>{
        if(err) console.log(err)
            else res.send(rows)
    })
})

app.listen(3000, ()=>console.log('Express server is running on port 3000'))
