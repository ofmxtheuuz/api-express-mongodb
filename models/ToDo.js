const mongoose = require("mongoose")

const ToDo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    did: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("ToDoList", ToDo)