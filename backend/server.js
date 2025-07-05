import express from "express"
import env from "dotenv"
import taskRouter from "./routes/taskRoutes.js"
import userRouter from "./routes/userRoutes.js"
import mongoose from "mongoose"

// Express App
const app = express()

env.config()

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/user', userRouter)
app.use('/api/tasks', taskRouter)

const PORT = process.env.PORT || 3001

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`)
    }
)
})
.catch((error) => {
    console.log(error)
})