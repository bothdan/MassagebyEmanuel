const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

//DEV
function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user:'root',
        database: 'massagebyemanuel'
    })
}

app.use(morgan('short'))

app.get("/user/:id", (req,res) => {
    const userId = req.params.id
    const queryString = "SELECT * FROM appointments WHERE customer_id = ?"
    const connection = getConnection()
    
    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        // const users = rows.map((row) => {
        //     return {
        //         appointmentsId: row.appointments_id,
        //         therapistId: row.therapist_id,
        //         customerId: row.customer_id,
        //         dateApp: row.date,
        //         timeApp: row.time,
        //         lengthApp: row.length,
        //         bookedBy: row.book_by,
        //         noteApp: row.appointment_note,
        //         serverTime: row.ServerTimeStamp,
        //         serverDate: row.ServerDateStamp
        //     }
        // })

        res.json(rows)
    })    
    //res.end()
})

app.get("/", (req, res) => {
    res.send("Hello from RoooooT");
})

app.get("/reports", (req, res) => {
    const queryString = `SELECT 
                            ap.appointments_id,
                            a.first AS therapistName,
                            c.first AS customerFirstName,
                            c.last AS customerLastName,
                            c.phone AS customerPhone,
                            c.email AS customerEmail,
                            ap.date,
                            ap.time,
                            ap.length,
                            ap.book_by, 
                            ap.appointment_note,
                            ap.ServerTimeStamp,
                            ap.ServerDateStamp 
                            
                        FROM appointments AS ap
                            INNER JOIN admin AS a ON a.user_id = ap.therapist_id
                            INNER JOIN customers AS c ON c.customer_id = ap.customer_id
                            
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

app.get("/logs/admins", (req, res) => {
    const queryString = `SELECT 
                            login_id,
                            username,
                            date,
                            time,
                            IP
                        FROM login_admin
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

app.get("/logs/users", (req, res) => {
    const queryString = `SELECT 
                            login_id,
                            user_id,
                            username,
                            date,
                            time,
                            IP
                        FROM login_user
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

app.get("/statistics/totalViews", (req, res) => {
    const queryString = `SELECT 
                            number_views
                        FROM views
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

app.get("/statistics/totalUniqueViews", (req, res) => {
    const queryString = `SELECT 
                            COUNT(*) as totalUniqueViews
                        FROM views_unique
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

app.get("/statistics/totalUniqueViews2018", (req, res) => {
    const queryString = `SELECT 
                            COUNT(*) as totalUniqueViews
                        FROM views_unique_2018
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

app.get("/admin/info", (req, res) => {
    const queryString = `SELECT 
                            user_id,
                            first,
                            last,
                            phone,
                            email,
                            address,
                            city,
                            state,
                            zip,
                            cancellation_policy 
                        FROM admin
                        WHERE user_id = 1
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })    
})

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded());

//Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/admin/info/update/', function(req, res){
    const queryString = `UPDATE admin
                            SET first = '`+req.body.adminInfo[0].first+`',
                                last = '`+req.body.adminInfo[0].last+`',
                                phone = '`+req.body.adminInfo[0].phone+`',
                                email = '`+req.body.adminInfo[0].email+`',
                                address = '`+req.body.adminInfo[0].address+`',
                                city = '`+req.body.adminInfo[0].city+`',
                                state = '`+req.body.adminInfo[0].state+`',
                                zip = '`+req.body.adminInfo[0].zip+`',
                                cancellation_policy = '`+req.body.adminInfo[0].cancellation_policy+`'
                        WHERE user_id = 1
                        `
    const connection = getConnection()
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.sendStatus(500)
            return
        }
        resp = {status: 200, message: 'Admin info successfully updated.'}
        res.json(resp)
    })    
});

app.listen(3001, () => {
  console.log("Server is up and listening on 3001...")
})