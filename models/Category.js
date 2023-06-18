const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const slugify=require('slugify');
const CategorySchema = new Schema({
    slug:{
        type: String,
        unique: true,
    },
   //Urlde id yazmaması için slug'ı tutucaz burda
    name:{
        type: String,
        unique: true,
        required: true

    },
    
});
CategorySchema.pre('validate', function (next) {
    this.slug=slugify(this.name,{
        lower: true,
        //Bütün harfleri küçük yaptık
        strict: true,
        //Aradaki gereksiz ":" gibi elamanları geçmeye yarıyor bu 
    });
    //Burada datayı oluşturmadan önce unique bir slug oluşturmak için name parametresini kullandık
    next();
  });
const Category=mongoose.model('Category',CategorySchema);
//Şablonumuzu burada modele dönüştürdük
module.exports = Category;

//Burada da modellerimizi export ettik