const expresss = require("express")
const router = expresss.Router();
const mongoose = require("mongoose")

require("../models/ToDo")
const ToDoList = mongoose.model("ToDoList")

router.post("/add", (req, res) => {
    new ToDoList({
        name: req.body.name
    }).save().then(() => {
        res.send({
            code: 200
        })
    })
})

router.post("/patch/:id", (req, res) => {
    ToDoList.findById(req.params.id).then(result => {
        result.did = true;
        result.save().then(() => {
            res.send({
                code: 200
            })
        })
    })
})

router.get("/", (req, res) => {
    ToDoList.find({}, (error, result) => {
        res.send(result)
    })
})

router.post("/delete/:id", (req, res) => {
    ToDoList.remove({_id: req.params.id}).then(() => {
        res.send({
            code: 200
        })
    })
})

module.exports = router;