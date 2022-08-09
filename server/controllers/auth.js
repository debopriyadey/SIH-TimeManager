const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const signup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(422).json({ error: "Please enter all fields" });
    } else if (!validator.isEmail(email)) {
        return res.status(422).json({ error: "Enter valid email" })
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email already registered" });
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new Users({
                        name,
                        email,
                        password: hashedpassword
                    })

                    user.save()
                        .then(user => {
                            return res.status(201).json({ message: "Signup success" });
                        })
                        .catch((err) => {
                            next(err);
                        })
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            next(err);
        })
}

const signin = (req, res, next ) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please enter all fields" });
    } else if (!validator.isEmail(email)) {
        return res.status(422).json({ error: "Enter valid email" })
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            bcrypt.compare(password, savedUser.password)
                .then((doMatch) => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id, name: savedUser.name },process.env.JWT_SECRET);
                        savedUser.token = token;
                        savedUser.save().then((user) => {
                            res.cookie('token', token, {
                                maxAge: 60*24*60*60*1000,//setting cookie for 60 days
                                httpOnly: true,
                                sameSite: 'None',
                                secure: true,
                                path: '/',
                            });
                            return res.json({ user });
                        }).catch((err) => {
                            next(err);
                        })
                    }
                    else {
                        return res.status(401).json({ error: "Invalid credentials" });
                    }
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            next(err);
        })
}


const getUserById = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

const getLoggedInUserInfo = (req, res, next) => {
    res.status(200).json(req.user);
}

const logout = async (req, res, next ) => {
    const { token } = req.cookies;
    res.clearCookie('token');
    Users.updateOne({token}, {token:''}).then((user)=>{
        return res.status(200).json({message: "Logged Out"});
    }).catch((err) => {
        next(err)
    })
}

module.exports = {
    signup,
    signin,
    getUserById,
    getLoggedInUserInfo,
    logout
}