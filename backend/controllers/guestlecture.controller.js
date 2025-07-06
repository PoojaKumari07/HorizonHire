import { Guest } from "../models/guestlecture.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const guestlecture = async (req, res) => {
  try {
    console.log(req.body);  // To check if the body is being received correctly
    console.log(req.file);  // To check if the file is being uploaded correctly

    const { fullname, email, phonenumber, topic, skills, url, Domain, date, photo } = req.body;

    if (!fullname || !email || !phonenumber || !topic) {
      return res.status(400).json({
        message: "Some data is missing",
        success: false,
      });
    }

    const file = req.file;  // Ensure this matches your `multer` field name
    if (!file) {
      return res.status(400).json({
        message: "File is missing",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const guest = await Guest.findOne({ email });
    if (guest) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    await Guest.create({
      fullname,
      email,
      phonenumber,
      topic,
      skills,
      url,
      Domain,
      date,
      photo: {
        EventPhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Guest lecture created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in guestlecture controller:", error); // Improved logging
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};


export const getAllLecture=async(req,res)=> {
    try {
        const userId = req.id; // logged in user id
        const data=await Guest.find({userId});
        if(!data){
            return res.status(404).json({
                message:"NO LECTURE SCHEDULE",
                success: false
            })
        }

        return res.status(200).json({
            data,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}