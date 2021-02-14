const express = require('express');
const fs=require('fs')
const path=require('path')
// const request=require('re')
const multer=require('multer');
const crypto = require('crypto-js');
const { json } = require('body-parser');

const des =require('../3DES')



var imageRouter=express.Router();
imageRouter.use(json())

//storing original file to server
var fileStorage_original=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/original')
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() + '--' + file.originalname)
  }
})

var original =multer({storage:fileStorage_original})

//storing encrypted file to the server
var fileStorage_encrypted=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/encrypted')
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() + '--' + file.originalname)
  }
})


var encrypted =multer({storage:fileStorage_encrypted})

//encrypting server router
imageRouter.post('/',original.single('image'),(req,res)=>{
  var password=req.body.password
  
  if(req.file.mimetype=='text/plain'){


  fs.readFile(path.join(__dirname,`../public/original/${req.file.filename}`),'utf8',(err,data)=>{
    //console.log(data)
    console.log(req.file.filename, typeof(req.file.filename))
    console.log(path.join(__dirname,`../public/original/${req.file.filename}`))
    var output=des.encrypt(data,password,'1234')

    fs.writeFile(`C:/users/Shamalka/Downloads/${req.file.filename}_encrypted.txt`,output,(err)=>{
      res.send('Successfully Encrypted')

    })
  })
  }
  else{
    res.send("Text files only")
  }

 
 

})

//decrypting server router

imageRouter.post('/decrypt',encrypted.single('encrypted'),(req,res)=>{

  var password=req.body.password;

  if(req.file.mimetype=='text/plain'){

  fs.readFile(path.join(__dirname,`../public/encrypted/${req.file.filename}`),'utf8',(err,data)=>{
    //console.log(data)
    console.log(req.file.filename, typeof(req.file.filename))
    console.log(path.join(__dirname,`../public/encrypted/${req.file.filename}`))
    var output=des.decrypt(data,password,'1234')

    fs.writeFile(`C:/users/Shamalka/Downloads/${req.file.filename}_decrypted.txt`,output,(err)=>{
      res.send('Successfully Decrypted')

    })
  });
  }
  else{
    res.send('Text Files only')
  }
})

module.exports=imageRouter;