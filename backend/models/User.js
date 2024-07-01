const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String ,
        require : true,
        unique : true
    },
    password:{
        type : String ,
        require : true
    },
    date:{
        type : Date,
        require : true,
        default : Date.now 
    }

});
const User = mongoose.model('User',UserSchema);
// User.createIndexes();
module.exports = User;