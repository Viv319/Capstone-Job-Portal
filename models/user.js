const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        uinque: true
    },
    password:{
        type: String,
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"}}
);

module.exports = mongoose.model("UserInfo", userSchema);