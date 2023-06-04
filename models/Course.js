const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const slugify=require('slugify');

const CourseSchema = new Schema({
    slug:{
        type: String,
        unique: true,
    },
   //Burda unique tekil sayfalar yaratabilmek için böyle bir değişken atadık
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

CourseSchema.pre('validate', function(next){
    this.slug=slugify(this.name,{
        lower: true,
        //Bütün harfleri küçük yaptık
        strict: true,
        //Aradaki gereksiz ":" gibi elamanları geçmeye yarıyor bu 
    });
    next();
}
);
//Burada datayı oluşturmadan önce unique bir slug oluşturmak için name parametresini kullandık
const Course=mongoose.model('Course',CourseSchema);
//Şablonumuzu burada modele dönüştürdük
module.exports = Course;

//Burada da modellerimizi export ettik