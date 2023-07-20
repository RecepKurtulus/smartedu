const Course = require('../models/Course')
//Course modelimizi çağırdık
const Category = require('../models/Category')
//Categoryleri listelemek için kurs sayfasında çağırdık
const User = require('../models/User')
const app = require('../app.js')

exports.CreateCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      //Course ismini req body den al
      description: req.body.description,
      category: req.body.category,
      videoLink: req.body.videoLink,
      user: req.session.userID,
    })
    res.status(201).redirect('/courses')
    console.log(`${course.name} created successfully`)
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    })
    console.log(`${err.message}`)
  }
}

exports.GetAllCourses = async (req, res) => {
  try {
    if (userIN) {
      try {
        const categorySlug = req.query.categories
        //Burda kategori querysini yakalıyoruz
        const user = await User.findById(req.session.userID).populate('courses')
  
        const category = await Category.findOne({ slug: categorySlug })
        //Burada slugı attığımız querye ait olan slugı eşit olan categoriyi bulduk
        let filter = {}
        if (categorySlug) {
          filter = { category: category._id }
        }
        //Üstte yakaladığımız slugın idsi db de var ise ona göre filtrelemeyi yapıcaksın
        const courses = await Course.find(filter).populate('user')
  
        //Course collectionundaki tüm dataları burda çekiyoruz ve usere göre populate ediyoruz
        const categories = await Category.find()
        courses.reverse()
        //Burada gelen dataları ters çevirip en son ekleneni en başa alıyoruz
        res.status(200).render('courses', {
          courses,
          categories,
          user,
          //Kurslarla beraber katagorileri de gönderdik
          pageName: 'courses',
        })
        console.log(user.courses.length)
        //Burada  200 status kodunu göndererek courses.ejs dosyaını ve çektiğmiz dataları gönderiyoruz ayrıca pageName'i üstte noktalar gözüksün diye
        //Courses yapıyoruz
      } catch (err) {
        res.status(400).json({
          status: 'fail',
          error: err.message,
        })
        console.log(err.message)
      }
    } else {
      try {
        const categorySlug = req.query.categories
        //Burda kategori querysini yakalıyoruz
        console.log("User is not founded")
        const category = await Category.findOne({ slug: categorySlug })
        //Burada slugı attığımız querye ait olan slugı eşit olan categoriyi bulduk
        let filter = {}
        if (categorySlug) {
          filter = { category: category._id }
        }
        //Üstte yakaladığımız slugın idsi db de var ise ona göre filtrelemeyi yapıcaksın
        const courses = await Course.find(filter).populate('user')
  
        //Course collectionundaki tüm dataları burda çekiyoruz ve usere göre populate ediyoruz
        const categories = await Category.find()
        courses.reverse()
        //Burada gelen dataları ters çevirip en son ekleneni en başa alıyoruz
        res.status(200).render('courses', {
          courses,
          categories,
          //Kurslarla beraber katagorileri de gönderdik
          pageName: 'courses',
        })
       
        //Burada  200 status kodunu göndererek courses.ejs dosyaını ve çektiğmiz dataları gönderiyoruz ayrıca pageName'i üstte noktalar gözüksün diye
        //Courses yapıyoruz
      } catch (err) {
        res.status(400).json({
          status: 'fail',
          error: err.message,
        })
        console.log(err.message)
      }
    }
  }
  catch(error){
    console.log(error.message)
  }
 
}

exports.GetSingleCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user',
    )
    //Populate ile birlikte referansını verdiğimiz useri gösterebilriiz

    //Burada slug'ı yakaladık
    res.status(200).render('course-single', {
      course,
      pageName: 'courses',
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}

exports.EnrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    let isEnrolled = false
    for (i = 0; i < user.courses.length; i++) {
      if (user.courses[i]._id == req.body.course_id) {
        isEnrolled = true
        console.log('You have already enrolled in this course.')
        break
      }
    }
    if (!isEnrolled) {
      await user.courses.push({ _id: req.body.course_id })
      await user.save()
      res.status(200).redirect('/user/dashboard')
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
    console.log(error)
  }
}

exports.ReleaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)

    await user.courses.pull({ _id: req.body.course_id })
    await user.save()
    res.status(200).redirect('../courses')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
    console.log(error)
  }
}
