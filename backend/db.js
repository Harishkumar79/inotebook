const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/iNotebook"

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))
};
module.exports = connectToMongo;