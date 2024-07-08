const express = require("express");
const usersSchema = require("../model/usersSchema");
const mongoose = require("mongoose");
const usersRoute = express.Router();
const User = require("../model/usersSchema");

usersRoute.get("/usersSchema", (req, res) => {
    usersSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});


usersRoute.post("/enroll", async (req, res) => {
    const { email, courseName } = req.body;
    try {
        const user = await usersSchema.findOne({ email });
        if (user.courses.includes(courseName)) {
            return res.json({ success: false, message: "Already enrolled in this course" });
        }
        if (user) {
            if (!user.courses) {
                user.courses = [];
            }
            user.courses.push(courseName);
            await user.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


usersRoute.get("/courses/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ courses: user.courses });
    } catch (error) {
        console.error("Error fetching user courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


usersRoute.post("/unenroll", async (req, res) => {
    const { email, courseName } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.courses = user.courses.filter(course => course !== courseName);
        
        await user.save();

        res.json({ success: true, message: `Successfully unenrolled from ${courseName}` });
    } catch (error) {
        console.error("Error unenrolling from course:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


usersRoute.get("/", (req, res) => {
    usersSchema.find().then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json({ error: err });
    });
});

module.exports = usersRoute;