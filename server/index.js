require('dotenv').config(); // import our env variables, "the tokens"??? duh???

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const AccountModel = require("./models/Account");

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcrypt = require("bcrypt");

const app = express()
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_PORT],
    credentials: true
}))
app.use(cookieParser());

/* useNewUrlParser: true, useUnifiedTopology: true  <-------- these are no longer needed starting MongoDB Node driver v4+ */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected Successfully");
})

.catch((err) => {
  console.log("MongoDB Connection Error:", err.message);
  console.log("Make sure MongoDB is running on your system");
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await AccountModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: "Email already registered" 
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { name, email, password: hashedPassword };
        
        AccountModel.create(user)
        .then(account => res.status(201).json({ 
            success: true, 
            message: "Account created successfully" 
        }))
        .catch(err => res.status(400).json({ 
            success: false, 
            error: err.message 
        }));
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    AccountModel.findOne({ email: email })
    .then(async (user) => {
        if (user) {
            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                
                if (isPasswordValid) {
                    const accessToken = jwt.sign({email: email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'});
                    const refreshToken = jwt.sign({email: email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '7d'});
                    
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
                    
                    return res.json({
                        success: true,
                        message: "Login successful"
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Invalid password"
                    });
                }
            } catch (error) {
                console.error("Password comparison error:", error);
                res.status(500).json({
                    success: false,
                    message: "Server error during login"
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "No account found with this email"
            });
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    });
});

const verifyUser = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return renewToken(req, res, next);
        } else {
            jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
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
        
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                console.log("Refresh token invalid:", err.message);
                return res.status(401).json({ valid: false, message: "Invalid refresh token" });
            } else {
                const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
                res.cookie('accessToken', accessToken, { 
                    maxAge: 3600000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
                req.email = decoded.email;
                next();
            }
        });
    } catch (error) {
        console.error("Error in renewToken:", error);
        return res.status(500).json({ valid: false, message: "Server error during token renewal" });
    }
};


app.get('/', verifyUser, async (req, res) => {
    try {
        const user = await AccountModel.findOne({ email: req.email });
        if (user) {
            return res.json({ valid: true, message: user.name });
        } else {
            return res.status(404).json({ valid: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error in / route:", error);
        return res.status(500).json({ valid: false, message: "Server error" });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.json({ success: true, message: 'Logged out successfully' });
});

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`
█▀ █▀▀ █▀█ █░█ █▀▀ █▀█   █ █▀   █▀█ █░█ █▄░█ █▄░█ █ █▄░█ █▀▀
▄█ ██▄ █▀▄ ▀▄▀ ██▄ █▀▄   █ ▄█   █▀▄ █▄█ █░▀█ █░▀█ █ █░▀█ █▄█
on port: 3001
    `)
})