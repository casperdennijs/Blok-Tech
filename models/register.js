const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }

})

const Register = mongoose.model("Register", RegisterSchema);
module.exports = Register;