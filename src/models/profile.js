import validator from "validator";
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    picture: {
        type: String,
    },
    names: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    age: {
        type: Number,
    },
    dateOfBirth: {
        type: Date,
    },
    nationality: String,
    maritalStatus: {
        type: String,
        enum: ["single", "married", "divorced", "widowed"],
    },
    identityDoc: {
        type: mongoose.Schema.ObjectId,
        ref: "IdentintyDoc",
    },
    userAccount: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
}, {
    timestamp: true,
});

profileSchema.pre(/^find/, function(next) {
    this.populate({
        path: "identityDoc",
        // select: "firstname lastName phone",
    }).populate({
        path: "userAccount",
        select: "userName phone email role isActive statusVerification",
    });
    next();
});

const Profiles = mongoose.model("Profile", profileSchema);
export default Profiles;