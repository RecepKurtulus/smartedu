const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const CourseSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true

    },
    description:{
        type: String,
        required: true,
        trim:true

    },
    teacherName:{
        type: String,
        required: true,
        trim:true

    },
    createDate: { type: Date, default: Date.now },
});
//Kurs şablonunu oluşturduk artık tüm kurslar bu şablon üzerinden gidicek

const Course=mongoose.model('Course',CourseSchema);
//Şablonumuzu burada modele dönüştürdük
module.exports = Course;
//Burada da modelimizi export ettik