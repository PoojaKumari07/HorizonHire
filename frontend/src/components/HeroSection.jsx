import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import img from "../assets/home.png";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative flex flex-col items-center justify-center  h-screen text-center">
      {/* Image behind the text */}
      <img
        src={img}
        alt="Background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[50%] object-cover z-0  opacity-50"
      />

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center text-black top-0">
        {/* <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Connection Website
        </span> */}
        <h1 className="text-4xl md:text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-gray-600 mt-4">
          What you find out guest lecture or Employee
        </p>
        <div className="flex w-[80%] md:w-[60%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-5">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-gray-700 px-3 py-2 rounded-l-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
