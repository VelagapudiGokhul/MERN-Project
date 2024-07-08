const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: Number, required: true },
    modules: [{
        moduleName: { type: String, required: true },
        moduleContent: { type: String, required: true }
    }],
    quizQuestions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctOption: { type: Number, required: true }
    }]
}, {
    collection: "Languages",
    versionKey: false 
});

module.exports = mongoose.model("Lesson", lessonSchema);
