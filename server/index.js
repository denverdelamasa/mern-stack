const express = require("express")
const mongoose = require('mongoose') // YOOO WHAT THE CORRECT ONE IS 'mongoose' NOT "mongoose" ?!?!?!? why?!??!?!?!
const cors = require("cors")
const AccountModel = require("./models/Account")

// like bro why would you name em employees just name em accounts bruh
// Employee == Account
// also I've realized I'm using MongoDB compass instead of the server edition xDDD whoopsies.... 
// well tbf I'm not using AI so yeaahhh... I got autocomplete tho

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/account");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    AccountModel.findOne({email: email}) // it finds the email in the database
    // AH YES!!! IF ELSE!!! MY FAVORITE THING IN THE WORLD!!!
    // IF ELSE STATEMENTS TO VERIFY THE USER'S EMAIL AND PASSWORD
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json("Password is Incorrect")
            }
        } else {
            res.json("No record Existed")
        }
    })
})

app.post("/register", (req, res) => {
    AccountModel.create(req.body)
    .then(account => res.status(201).json(account))
    .catch(err => res.status(400).json({ error: err.message }))
})

app.listen(3001, () => {
    console.log(`
█▀ █▀▀ █▀█ █░█ █▀▀ █▀█   █ █▀   █▀█ █░█ █▄░█ █▄░█ █ █▄░█ █▀▀
▄█ ██▄ █▀▄ ▀▄▀ ██▄ █▀▄   █ ▄█   █▀▄ █▄█ █░▀█ █░▀█ █ █░▀█ █▄█
on port: 3001
    `)
})