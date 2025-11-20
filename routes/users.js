// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.post('/registered', function (req, res, next) {
    const saltRounds = 10
    const plainPassword = req.body.password
    const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

    
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.

        let sqlquery = "INSERT INTO users (username, first_name, last_name, email, hashedPassword) VALUES (?,?,?,?,?)";
        // execute sql query
        let newrecord = [req.body.username, req.body.first, req.body.last, req.body.email, hashedPassword]
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                next(err)
            }
            else
                res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email + ' ' + req.body.password) + ' ' + hashedPassword;                                                                              
        })
      })    

    // saving data in database
}); 

router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})

router.post('/loggedin', function (req, res, next) {
    let sqlquery = "SELECT * FROM users WHERE username = ?"
    db.query(sqlquery, [req.body.username], (err, results) => {
        if (err) {
            next(err)
        }
        else if (results.length === 0) {
            res.send("Invalid username or password.")
        }
        else {

            // Get the hashed password from the database
            let hashedPassword = results[0].hashedPassword

            // Compare the password supplied with the password in the database
            bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
                if (err) {
                    res.send("An error occurred.")
                }
                else if (result == true) {
                    res.send("Welcome back " + results[0].first_name + " " + results[0].last_name + "!")
                }
                else {
                    res.send("Invalid username or password.")
                }
            })

        }
    })
    
}) 

// Export the router object so index.js can access it
module.exports = router
