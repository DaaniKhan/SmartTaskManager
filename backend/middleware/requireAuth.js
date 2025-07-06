import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

const requireAuth = async (req, res, next) => {
    if (process.env.NODE_ENV === "test") {
        // Fake user for test environment
        req.user = { _id: new mongoose.Types.ObjectId(process.env.TEST_USER_ID) }
        return next()
    }

    // Authentication Verification
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

export default requireAuth