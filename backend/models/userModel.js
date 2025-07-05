import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Static Signup Method
userSchema.statics.signup = async function (email, password) {
    
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    
    const emailExists = await this.findOne({ email })

    if (emailExists) {
        throw Error("Email already in use")
    }

    const saltRounds = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const user = await this.create({ email, password: hashPassword })

    return user
}

// Static Login Method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect Email/Password")
    }

    const matchPasswords = await bcrypt.compare(password, user.password)

    if (!matchPasswords) {
        throw Error('Incorrect Email/Password')
    }

    return user
}

export default mongoose.model('User', userSchema)