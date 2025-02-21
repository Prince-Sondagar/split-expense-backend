import { model, Schema } from 'mongoose';

const userSchema = new Schema({
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

const User = model("User", userSchema);

export default User;
