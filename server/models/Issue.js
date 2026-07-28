const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        status:{
            type:String,
            enum:["open","in-progress","resolved"],
            default:"open",

        },
        priority:{
            type:String,
            enum:["low","medium","high"],
            default:"medium"
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null,
        },
    },
    {
timestamps:true,
    }
    
)
module.exports = mongoose.model("Issue","issueSchema")