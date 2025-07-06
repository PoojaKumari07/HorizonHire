import React from 'react';

const ExtendedHeroSection = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-300 p-8 rounded-lg shadow-lg text-gray-900 h-[50%]">

      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Member <span className="text-cyan-500">Perks</span>
        </h1>
        <p className="mt-2 text-lg text-gray-600">Unlock opportunities and enhance your academic and professional journey.</p>
      </div>
      
   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
  
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-orange-600 mb-3">Guest Lectures</h2>
          <img src='https://www.hse.ru/data/2019/08/29/1535818379/3guestlecture.jpeg' alt='Guest lecture'></img>
          <p className="text-gray-700">
            Be invited or apply to speak in high school and college classes, workshops, and panel discussions.
          </p>
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-orange-600 mb-3">Mentorships</h2>
          <img src='https://www.ala.org/sites/default/files/advocacy/content/Mentorship%20Thought.png' alt='mentoship image'></img>
          <p className="text-gray-700">
            Provide career-focused mentorship to guide students toward their professional goals.
          </p>
        </div>
 
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-orange-600 mb-3">Job Finder</h2>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi6UEOf1YJtI3fnVnywsi8oBSUQokdeZfWGw&s' alt='job finder'></img>
          <p className="text-gray-700">
            Explore job opportunities tailored to your profile, and apply for positions in your field of expertise.
          </p>
        </div>
      </div>
    </div>
    <div>

    </div>
    </>
  );
};

export default ExtendedHeroSection;
