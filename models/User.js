const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema= mongoose.Schema;
const UserSchema = new Schema({
    role:{
        type: String,
        enum: ['Student','Teacher','Admin'],
        // 3 Farklı değer alabilir 
        default: 'Student',
        //Degfult olarak daha önce de kayıt olanlar student olarak kayıt oldu
    },
    name:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true,
        

    },
    bio:{
        type: String,
        required: true,
        

    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'

    }],
    acCreatedDate: { type: Date, default: Date.now ,
        },
    
});
//User şablonunu oluşturduk artık tüm Userler bu şablon üzerinden gidicek
UserSchema.pre('validate', function (next) {
    const user=this;
    if(!user.isModified('password')) {
        return next();
    }
    else{
        bcrypt.genSalt(10,function(err, salt) {
            
            if(err) return next(err);
            //Şifreleme için bir tuz (salt) oluşturmak için bcrypt kütüphanesini kullanır. 
            //Tuz, şifreleme işleminin güvenliğini arttıran rastgele bir dizedir. 
            //İşlem tamamlandığında, bir hata olup olmadığını kontrol eder.
            else{
                bcrypt.hash(user.password,salt,function(err, hash) {
                    if(err) return next(err);
                    // şifresini bcrypt ile tuzla birlikte karmaşık bir şekilde şifreler. 
                    //İşlem tamamlandığında, bir hata olup olmadığını kontrol eder.
                    user.password = hash;
                    // şifresini bcrypt ile tuzla birlikte karmaşık bir şekilde şifreler. 
                    //İşlem tamamlandığında, bir hata olup olmadığını kontrol eder.
                    next();
                })
            }
        })
    }
    
  });


const User=mongoose.model('User',UserSchema);
//Şablonumuzu burada modele dönüştürdük
module.exports =User;

//Burada da modellerimizi export ettik