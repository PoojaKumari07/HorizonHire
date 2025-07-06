import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,  
    },
    email: {
      type: String,
      required: true,  
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: true, 
    },
    topic: {
      type: String,
      required: true,  
    },
    skill: [
      {
        type: String,
      },
    ],
    url: {
      type: String,
      unique: true,
    },
    Domain: {
      type: String,
    },
    date: {
      type: Date, 
      required: true,  
    },
    photo:{
      EventPhoto:{
        type:String,
        default:""
    }
    } 
  },
  { timestamps: true }
);

export const Guest = mongoose.model('Guest', guestSchema);
