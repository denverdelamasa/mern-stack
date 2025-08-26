const express = require("express");
const mongoose = require('mongoose'); // YOOO WHAT THE CORRECT ONE IS 'mongoose' NOT "mongoose" ?!?!?!? why?!??!?!?!
const cors = require("cors");
const AccountModel = require("./models/Account");

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcrypt = require("bcrypt");


// adding JWT cookie-parser and bcrypt

// adding JWT for authentication
// and cookie-parser for cookies
// also bcrypt for hashing passwords


// like bro why would you name em employees just name em accounts bruh
// Employee == Account
// also I've realized I'm using MongoDB compass instead of the server edition xDDD whoopsies.... 
// well tbf I'm not using AI so yeaahhh... I got autocomplete tho

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/account");

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { ...req.body, password: hashedPassword };
        
        AccountModel.create(user)
        .then(account => res.status(201).json(account))
        .catch(err => res.status(400).json({ error: err.message }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    AccountModel.findOne({ email: email })
    .then(async (user) => { // Make the callback async
        if (user) {
            try {
                // Compare provided password with stored hash
                const isPasswordValid = await bcrypt.compare(password, user.password);
                
                if (isPasswordValid) {
                    // Password is correct - create tokens
                    const accessToken = jwt.sign({email: email}, "jwt-access-SecretKey", {expiresIn: '1h'});
                    const refreshToken = jwt.sign({email: email}, "jwt-refresh-SecretKey", {expiresIn: '7d'});
                    
                    res.cookie('accessToken', accessToken, {
                        maxAge: 3600000,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict'
                    });
                    
                    res.cookie('refreshToken', refreshToken, {
                        maxAge: 7 * 24 * 3600000,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict'
                    });
                    
                    return res.json({Login: true});
                } else {
                    res.status(401).json({Login: false, Message: "Password is Incorrect"});
                }
            } catch (error) {
                console.error("Password comparison error:", error);
                res.status(500).json({Login: false, Message: "Server error"});
            }
        } else {
            res.status(404).json({Login: false, Message: "No account found with this email"});
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    });
});

const verifyUser = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return renewToken(req, res, next);
        } else {
            jwt.verify(accessToken, "jwt-access-SecretKey", (err, decoded) => {
                if (err) {
                    console.log("Access token invalid:", err.message);
                    return renewToken(req, res, next);
                } else {
                    req.email = decoded.email;
                    next();
                }
            });
        }
    } catch (error) {
        console.error("Error in verifyUser:", error);
        return res.status(500).json({ valid: false, message: "Server error during verification" });
    }
};

const renewToken = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ valid: false, message: "No refresh token" });
        }
        
        jwt.verify(refreshToken, "jwt-refresh-SecretKey", (err, decoded) => {
            if (err) {
                console.log("Refresh token invalid:", err.message);
                return res.status(401).json({ valid: false, message: "Invalid refresh token" });
            } else {
                const accessToken = jwt.sign({ email: decoded.email }, "jwt-access-SecretKey", { expiresIn: '1h' });
                res.cookie('accessToken', accessToken, { 
                    maxAge: 3600000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
                
                // Set the email in the request for the next middleware
                req.email = decoded.email;
                next();
            }
        });
    } catch (error) {
        console.error("Error in renewToken:", error);
        return res.status(500).json({ valid: false, message: "Server error during token renewal" });
    }
};

app.get('/', verifyUser, (req, res) => {
    try {
        return res.json({ valid: true, message: req.email });
    } catch (error) {
        console.error("Error in / route:", error);
        return res.status(500).json({ valid: false, message: "Server error" });
    }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(3001, () => {
    console.log(`
█▀ █▀▀ █▀█ █░█ █▀▀ █▀█   █ █▀   █▀█ █░█ █▄░█ █▄░█ █ █▄░█ █▀▀
▄█ ██▄ █▀▄ ▀▄▀ ██▄ █▀▄   █ ▄█   █▀▄ █▄█ █░▀█ █░▀█ █ █░▀█ █▄█
on port: 3001
    `)
})