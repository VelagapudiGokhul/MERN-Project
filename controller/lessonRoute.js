const express = require("express");
const lessonSchema = require("../model/lessonSchema");
const mongoose = require("mongoose");
const lessonRoute = express.Router();

lessonRoute.get("/lessonSchema", (req, res) => {
    lessonSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

lessonRoute.post("/create-lesson", (req, res) => {
    const newLesson = new lessonSchema(req.body);
    newLesson.save()
        .then((data) => {
            const result = data.toObject();
            delete result.__v;
            res.status(200).json(result);
        })
        .catch((err) => res.status(400).json({ error: err }));
});

lessonRoute.delete("/delete-lesson/:id", (req, res) => {
    lessonSchema.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
        .then((data) => {
            if (data) {
                res.json({ message: "Course deleted successfully" });
            } else {
                res.status(404).json({ error: "Course not found" });
            }
        })
        .catch((err) => {
            console.error("Error deleting student:", err); 
            res.status(500).json({ error: "An error occurred while deleting the student" });
        });
});

lessonRoute.get("/", (req, res) => {
    lessonSchema.find().then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json({ error: err });A
    });
});

lessonRoute.route("/update-lesson/:id")
    .get((req, res) => {
        lessonSchema.findById(new mongoose.Types.ObjectId(req.params.id))
            .then((data) => res.json(data))
            .catch((err) => res.status(400).json({ error: err }));
    })
    .put((req, res) => {
        lessonSchema.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.params.id), 
            { $set: req.body }, 
            { new: true }
        )
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json({ error: err }));
    });

module.exports = lessonRoute;
