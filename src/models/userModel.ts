import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    emai: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
