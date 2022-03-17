require('dotenv').config();
const express=require('express');
const path=require('path')
const formidable=require('formidable');

const PORT=process.env.PORT||8080;

const app=express();

app.get('/',(req,res,next)=>{
    res.setHeader('Content-Type','text/html')
    res.sendFile(path.join(__dirname,'index.html'),(err)=>{
        if(err){
            next(err);
        }
    })
})

app.post('/post',(req,res,next)=>{
    const form=formidable({
        multiples:true,
        uploadDir:path.join(__dirname,'uploads'),
        keepExtensions:true
    })
    form.parse(req,(err,feilds,files)=>{
        if(err){
            next(err);
        }
        res.redirect('/');
    })
})

app.use((req,res,next)=>{
    res.status(404);
    res.send("Page not found");
})

app.use((err,req,res,next)=>{
    res.status(500);
    res.send("ERROR\n"+JSON.stringify(err.message));
})

app.listen(PORT,()=>{console.log(`listening at http://localhost:${PORT}`)});