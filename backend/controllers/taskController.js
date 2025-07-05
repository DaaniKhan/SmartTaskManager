import Task from "../models/taskModel.js"
import mongoose from "mongoose"
import leoProfanity from 'leo-profanity';

// Get all Tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(tasks)
}

// Get a Single Task
const getTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

// Add new Task
const addTask = async (req, res) => {
    const {task, category, information, deadline, completed} = req.body

    try {
        const user_id = req.user._id

        const cleanTask = task ? leoProfanity.clean(task) : '';
        const cleanInformation = information ? leoProfanity.clean(information) : '';

        // Check If The User already has a Task with the same name, deadline and category
        const existing = await Task.findOne({ user_id, cleanTask, category, deadline, completed });

        if (existing) {
            return res.status(400).json({ error: "The task already exists." });
        }

        const newTask = await Task.create({task: cleanTask, category, information: cleanInformation, deadline, completed, user_id})
        
        res.status(200).json(newTask)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// Delete a Task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

// Update a Task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    const newTask = await Task.findById(id)

    res.status(200).json(newTask)
}

export {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
}