import validator from "validator";
import mongoose from "mongoose";

const identintyDocSchema = new mongoose.Schema({
    docId: {
        type: String,
        required: true,
    },
    docType: {
        type: String,
        enum: ["national", "passport"],
    },
    docPicture: String,
    userProfile: {
        type: mongoose.Schema.ObjectId,
        ref: "Profile",
    },
}, {
    timestamp: true,
});

const IdentintyDocs = mongoose.model("IdentintyDoc", identintyDocSchema);
export default IdentintyDocs;