const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const slugify=require('slugify');
const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
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

    videoLink:{
        type: String,
        required: true,

    },
    createDate: { type: Date, default: Date.now ,
        },
    day: { type: String },
    month: { type: String },
    year:{ type: String},
    simpleDate: { type: String},
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        //Kursları oluştururken katagori modelini görmemizi sağlıcak
    },
    //Kursları oluştururken katagorisini de seçicez bunun sayeysinde
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
});
//Kurs şablonunu oluşturduk artık tüm kurslar bu şablon üzerinden gidicek

CourseSchema.pre('validate', function (next) {
    this.day = this.createDate.getDate();
    if(this.day<10){
        this.day=`0`+this.day;
    }
    this.month = monthNames[this.createDate.getMonth()];
    this.year = this.createDate.getFullYear();
    this.simpleDate=`${this.day}.${this.month}.${this.year}`;
    this.slug=slugify(this.name,{
        lower: true,
        //Bütün harfleri küçük yaptık
        strict: true,
        //Aradaki gereksiz ":" gibi elamanları geçmeye yarıyor bu 
    });
    //Burada datayı oluşturmadan önce unique bir slug oluşturmak için name parametresini kullandık
    next();
  });

//Burada datayı oluşturmadan önce unique bir slug oluşturmak için name parametresini kullandık
const Course=mongoose.model('Course',CourseSchema);
//Şablonumuzu burada modele dönüştürdük
module.exports = Course;

//Burada da modellerimizi export ettik