const express=require('express');
const app=express();
const mongoose=require('mongoose');
async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/gani", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("DB Connected");
    } catch (error) {
      console.error("DB Not Connected - Error:", error);
    }
  }

  connectToDatabase();
const ns=new mongoose.Schema({
name:String,
age:Number,
phno:Number
});
const nm=new mongoose.model("records",ns);
const data=new nm({name:'SOHAIL',age:27,PHNO:1234567890});
data.save();
