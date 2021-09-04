const mongoose=require('mongoose');
const personScehma= new mongoose.Schema({
    name: {type:String, require :true},
    age: Number,
    favoriteCars : [String]
  })
  module.exports = mongoose.model("Person",personScehma);