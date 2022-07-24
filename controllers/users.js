const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()

const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique',
        })
    }

    if (!(password && username)) {
        return res.status(400).json({
            error: 'missing username or password',
        })
    }

    if (password.length < 3 || username.length < 3) {
        return res.status(400).json({
            error: 'username and password need to each be at least 3 charaters long',
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        name,

        username,

        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')

    res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.find({ _id: req.params.id }).populate('blogs')

    res.json(user[0])
})

module.exports = usersRouter
