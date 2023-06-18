const Course = require('../models/Course')
//Course modelimizi çağırdık
const Category = require('../models/Category')
//Categoryleri listelemek için kurs sayfasında çağırdık

exports.CreateCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
      
    });
    console.log(`${course.name} created successfully`);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error:err.message,
    });
    console.log(`${err.message}`);
  }
};



exports.GetAllCourses = async (req, res) => {
  try {
    const categorySlug=req.query.categories;
    //Burda kategori querysini yakalıyoruz
    const category=await Category.findOne({slug:categorySlug});
    //Burada istenilen kategoriyle ulaşmak için db'de üstteki sluga ait kategoriyi arıyoruz ve dikkat et await kullan
    let filter={};
    if(categorySlug){
      filter={category:category._id}
    };
    //Üstte yakaladığımız slugın idsi db de var ise ona göre filtrelemeyi yapıcaksın
    const courses = await Course.find(filter);
    //Course collectionundaki tüm dataları burda çekiyoruz
    const categories=await Category.find();
    courses.reverse();
    //Burada gelen dataları ters çevirip en son ekleneni en başa alıyoruz
    res.status(200).render('courses', {
       courses,
       categories,
       //Kurslarla beraber katagorileri de gönderdik
       pageName: 'courses' 
      });
    //Burada  200 status kodunu göndererek courses.ejs dosyaını ve çektiğmiz dataları gönderiyoruz ayrıca pageName'i üstte noktalar gözüksün diye
    //Courses yapıyoruz
    
    console.log(courses);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message
    });
    console.log(err.message); 
  }
};

exports.GetSingleCourse= async(req, res)=>{
  try {
    const course = await Course.findOne({slug: req.params.slug})
    //Burada slug'ı yakaladık 
    res.status(200).render('course-single', {
      course,
      pageName: 'courses',
    });

  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}


