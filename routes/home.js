const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Job Seeker App',message:'This app is for Job Seekers'})
  })
  
module.exports = router;