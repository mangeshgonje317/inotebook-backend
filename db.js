const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook";
// const mongoURI = "mongodb+srv://mangeshgonje12:SPSiT3IcMTd0vxBY@cluster0.47o5wcv.mongodb.net/";
const mongoURI= "mongodb+srv://mangeshgonje00:6V1ZySDG7PbSmtJz@cluster0.npchnw9.mongodb.net/"


const connectToMongo = () => {
    mongoose.connect(mongoURI)
         console.log("Connected to MongoDB successfully")    
};

module.exports = connectToMongo;
