import express from "express"
import { 
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
} from "../controllers/taskController.js"

import requireAuth from "../middleware/requireAuth.js"

const router = express.Router()

router.use(requireAuth)

// Get All tasks
router.get('/', getTasks)

// Get Single Task
router.get("/:id", getTask)

// Post New Task
router.post("/", addTask)

// Delete Task
router.delete("/:id", deleteTask)

// Update Task
router.patch("/:id", updateTask)

export default router