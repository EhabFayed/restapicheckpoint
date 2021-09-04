const express = require('express');
const mongoose = require('mongoose');
const Person= require("./model/user");
const port = 3000;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/rest')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async(req, res)=>{
    const data = await Person.find({});
    res.send(data);
});
app.post('/user/add', async(req, res)=>{
    const body= req.body;
    const newperson= new Person({
        name: body.name,
        age: body.age,
        favoriteCars: body.favoriteCars,
    });
    const error =newperson.validateSync();
    if(error){
        res.statusCode = 400;
        res.send(error);
    }else{
        const response = await newperson.save().catch((e)=>console.error(e));
        res.send(response);
    }
});
app.put("/user/:id",async (req, res) => {
    const body =req.body;
    const id=req.params.id;
    let error;
    const data = await Person.findByIdAndUpdate(
        id,
        {...body},
        {runValidatorhadis: true,new:true,useFindAndModify:false}
    ).catch((e)=>{
            error=e;
    });
    if (!data) {
        res.statusCode=400;
        res.send(error);
    }else{
        res.send(data);
    } 
});

app.delete("/user/:id",async(req, res) => {
    const id=req.params.id;
    let error;
    const data = await Person.findByIdAndDelete(id).catch((e)=>{
        error=e;
    });
    if (error) {
        res.statusCode=400;
        res.send(error);
    }else{
        res.send(data);
    } 
});




module.exports = app;
app.listen(port);