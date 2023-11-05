const mongoose = require('mongoose'); // importing mongoose library
mongoose.connect('mongodb://localhost:27017/Database_Name');




const schema = new mongoose.Schema(
{ property_1: Number,
property_2: String }
);
