const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const apiRouter = require('./routes/task');
// const userRouter = require('./routes/loginRoutes');
const multer = require('multer');
const path = require('path');
const {connectDb} = require('./db/connectDb');
const {authenticateToken} = require('./middleware/authorization');
require('dotenv').config();

app.use(cors())
app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.path === '/login' || req.path === '/signup') {
      next();
    } else {
      authenticateToken(req, res, next);
    }
  }, apiRouter);

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.file}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});
app.use('/image',express.static('uplaod/images'));
app.post('/upload',authenticateToken,upload.single('client'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

const start = async()=>{
    try {
    const connection = await connectDb('localhost',5432,'postgres','hikmat2005$','Dental');
    console.log("Connected successfully");
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    })
    } catch (error) {
        console.log(error);
    }
}

start();
