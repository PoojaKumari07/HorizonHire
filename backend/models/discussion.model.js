import mongoose from "mongoose";

const discussionSchema=new mongoose.Schema({
         content:{
            type:String,
            required:true
         },
         comment:[{
               type:String,
         }],
         email: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
})

export const discuss=mongoose.model('discuss',discussionSchema)