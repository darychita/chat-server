const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
    username: {
        unique: true,
        type: String, 
        trim: true,
        required: true,
        minlength: 5
    },
    email: {
        type: String, 
        trim: true,
        required: true,
        minlength: 5,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Doesn't look like email!");
        }
    },
    phone: {
        type: Number, 
        required: true
    },

    password: {
        type: String, 
        trim: true,
        required: true,
        minlength: 6
    },
    role: { 
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
});

module.exports = User;
