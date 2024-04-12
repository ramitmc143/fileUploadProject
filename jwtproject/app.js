const  express = require("express");
require('./db/conn');
const studentData = require('./models/student');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


const app = express();
const port = 3000;
const secret_key = process.env.JWT_SECRET || 'default_secret_key';

// configure cloudinary
cloudinary.config({
    cloud_name:'dqevfqmup',
    api_key:'395637498869635',
    api_secret:'GwZV7z-1keV-tbjLAleHKwhuR2k'
})


app.use(express.json())



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Use a relative path from the current working directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const upload = multer({storage })
// const upload = multer({storage:storage})



app.post("/studentData" , async(req , res) => {
 try {
     console.log(req.body);
     const student = new studentData(req.body);
     const createStudent = await student.save();
     res.status(201).send(createStudent)
 } catch (e) {
    console.log(e)
 }
});



app.get("/studentData" ,  async(req,res) => {
   try {
    const studentsData = await studentData.find()
    res.status(201).send(studentsData)
   } catch (error) {
    res.status(400).send(error)
   } 
});


// app.post('/profile', upload.single('fileInput'), (req, res) => {
//     console.log(req.body)
//     console.log(req.file)
//    res.redirect("/")
// })

app.post('/profile',upload.single('file') , async (req, res, next) => {
   try {
    // Upload file to cloudinary 
    const result = await cloudinary.uploader.upload(req.file.path);

    // Optionally , you can save the cloudinary URL to a database
    const imageUrl = result.secure_url;

    // Respond with the cloudinary url
    res.json({imageUrl})
   } catch (error) {
    
   }
  })


app.listen(port , () =>{
    console.log(`server is listenning at ${port}`)
});