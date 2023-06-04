const Course = require('../models/Course')

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
    const courses = await Course.find();
    //Course collectionundaki tüm dataları burda çekiyoruz
    courses.reverse();
    //Burada gelen dataları ters çevirip en son ekleneni en başa alıyoruz
    res.status(200).render('courses', { courses, pageName: 'courses' });
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


