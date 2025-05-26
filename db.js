const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";
// const mongoURI = "mongodb+srv://mangeshgonje12:SPSiT3IcMTd0vxBY@cluster0.47o5wcv.mongodb.net/";
// const mongoURI="mongodb+srv://mangeshgonje12:Mangesh@01@cluster0.47o5wcv.mongodb.net/";


const connectToMongo = () => {
    mongoose.connect(mongoURI)
         console.log("Connected to MongoDB successfully")    
};

module.exports = connectToMongo;
