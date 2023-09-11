import User from '../Models/User.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {

    try {

        const { name, last_name, password, email, image, country } = req.body
        const userInDB = await User.findOne({ email })

        if (userInDB) {
            throw new Error("El email ya esta en uso")
        }
        const passwordHash = bcrypt.hashSync(password, 10)

        const newUser = await User.create({ name, last_name, email, image, password: passwordHash, country })

        res.status(201).json({ user: newUser, success: true })

    } catch (error) {

        res.status(500).json({ error: error, success: false })
    }

}

export const signIn = () => {

}

const authController = {

    signIn() {

    }

}