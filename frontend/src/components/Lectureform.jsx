// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setLecture } from "@/redux/guestlectureSlice";

// const LectureForm = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     phonenumber: "",
//     topic: "",
//     skill: "",
//     url: "",
//     Domain: "",
//     date: "",
//     file: "" 
//   });
//   const handleChange = (e) => {
//    setFormData({
//         ...formData,
//         [e.target.name]: e.target.value
//       });

//   };

//   const handleFileChange=(e)=>{
//       setFormData({
//         ...formData,
//         file: e.target.files?.[0]  // Handle the file input
//       });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a FormData object to handle file upload
//     const formDataToSend = new FormData();
//     formDataToSend.append("fullname", formData.fullname);
//     formDataToSend.append("email", formData.email);
//     formDataToSend.append("phonenumber", formData.phonenumber);
//     formDataToSend.append("topic", formData.topic);
//     formDataToSend.append("skill", formData.skill);
//     formDataToSend.append("url", formData.url);
//     formDataToSend.append("Domain", formData.Domain);
//     formDataToSend.append("date", formData.date);
//     if (formData.file) {
//       formDataToSend.append("file", formData.file); 
//     }
//     console.log(formData);
//     try {
//       const response = await axios.post( "http://localhost:8000/api/v1/guestlecture/register",  formDataToSend,{
//             headers: { 'Content-Type': "multipart/form-data" },
//             withCredentials: true,
//         });
//       console.log("Response:", response.data);
//       if (response?.data?.success) {
//         dispatch(setLecture(response.data.lecture));
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="bg-gray-50 text-center">
//       <div className="text-2xl text-center text-black">
//         Make Your <span className="text-blue-600">Guest Lecture</span>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-10">
//         <div>
//           <input
//             name="fullname"
//             value={formData.fullname}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>

//         <div>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>
//         <div>
//           <input
//             name="phonenumber"
//             value={formData.phonenumber}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             required
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>
//         <div>
//           <input
//             name="topic"
//             value={formData.topic}
//             onChange={handleChange}
//             placeholder="Topic"
//             required
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>
//         <div>
//           <input
//             name="skill"
//             value={formData.skill}
//             onChange={handleChange}
//             placeholder="Skill"
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>
//         <div>
//           <input
//             name="url"
//             value={formData.url}
//             onChange={handleChange}
//             placeholder="URL"
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>
//         <div>
//           <input
//             name="Domain"
//             value={formData.Domain}
//             onChange={handleChange}
//             placeholder="Domain"
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>
//         <div>
//           <input
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             placeholder="Date"
//             required
//             type="date"
//             className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <input
//             accept="image/*"
//             type="file"
//             name="file" 
//             onChange={handleFileChange}
//             className="cursor-pointer"
//           />
//         </div>

//         <div className="rounded-r-full bg-[#ffffff] h-auto w-auto">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LectureForm;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLecture } from "@/redux/guestlectureSlice";
import { GUEST_LECTURE_API_END_POINT } from "@/utils/constant"; // Import the constant

import { toast } from "sonner"; // Add toast for better UX

const LectureForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    topic: "",
    skill: "",
    url: "",
    Domain: "",
    date: "",
    file: "" 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files?.[0]  // Handle the file input
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phonenumber", formData.phonenumber);
    formDataToSend.append("topic", formData.topic);
    formDataToSend.append("skill", formData.skill);
    formDataToSend.append("url", formData.url);
    formDataToSend.append("Domain", formData.Domain);
    formDataToSend.append("date", formData.date);
    if (formData.file) {
      formDataToSend.append("file", formData.file); 
    }

    console.log(formData);
    try {
      // Use the constant instead of hardcoded localhost
      const response = await axios.post(
        `${GUEST_LECTURE_API_END_POINT}/register`,
        formDataToSend,
        {
          headers: { 'Content-Type': "multipart/form-data" },
          withCredentials: true,
        }
      );
      
      console.log("Response:", response.data);
      if (response?.data?.success) {
        dispatch(setLecture(response.data.lecture));
        toast.success("Guest lecture registered successfully!");
        
        // Reset form after success
        setFormData({
          fullname: "",
          email: "",
          phonenumber: "",
          topic: "",
          skill: "",
          url: "",
          Domain: "",
          date: "",
          file: ""
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-center">
      <div className="text-2xl text-center text-black">
        Make Your <span className="text-blue-600">Guest Lecture</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-10">
        <div>
          <input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Topic"
            required
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Skill"
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL"
            type="url"
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="Domain"
            value={formData.Domain}
            onChange={handleChange}
            placeholder="Domain"
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div>
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            required
            type="date"
            className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto"
          />
        </div>

        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="file-input" className="text-gray-700">Upload Photo:</label>
          <input
            id="file-input"
            accept="image/*"
            type="file"
            name="file" 
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        <div className="rounded-r-full bg-[#ffffff] h-auto w-auto">
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LectureForm;