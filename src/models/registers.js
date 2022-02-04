const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    username: {
        type:String,
        required:'Enter your username'
    },
    email:{
        type:String,
        required:'Enter your email'
    },
    password:{
        type:String,
        required:'Enter your password'
    },

})

const Register = new mongoose.model("Movie", employeeSchema);

module.exports = Register;