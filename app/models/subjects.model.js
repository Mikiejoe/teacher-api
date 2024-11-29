import {Schema, model} from "mongoose";

const subjectSchema = new Schema({
    name: {type: String, required: true},
    lesson: {type: Schema.Types.ObjectId, ref: "Lesson"},
});


subjectSchema.query.byLesson = function(lessonId){
    return this.where({lesson: lessonId})
}

export const Subject = model("Subject", subjectSchema);
