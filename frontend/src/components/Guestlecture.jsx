import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const callouts = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]
const Guestlecture = () => {
  const { user } = useSelector(store => store.auth);
  const [dataLecture, setDataLecture] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/guestlecture/get");
        console.log(res);  // Inspect the response to see its structure
        setDataLecture(res.data.data);  // Assuming the guest lectures are in res.data.data
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
    { user ? (
    <div className="bg-white bg-transparent">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h2 className="text-2xl font-bold">Guest Lecture </h2>
        </div>
        <div>
          { user && user.role === 'recruiter' ? (
          <h2 className="border-l bg-amber-700 text-white">
            <Link to="/registerlecture">Register For Guest Lecture</Link>
          </h2>
          ):(
              <h2></h2>
          )
         }
        </div>
      </div>
      <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            { Array.isArray(dataLecture) && dataLecture.length > 0 ? (dataLecture.map((article, index)  => (
              <div key={article.fullname} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={article.photo}
                    src={article.photo.
                      EventPhoto}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              
                <p className="text-base font-semibold text-gray-900">{article.fullname}</p>
                <p className="text-base font-semibold text-gray-900"> {article.email}</p>
                <p className="text-base font-semibold text-gray-900"> {article.phonenumber}</p>
                <p className="text-base font-semibold text-gray-900"> {article.Domain}</p>
                <p className="text-base font-semibold text-gray-900"> {article.topic}</p>
                <p className="text-base font-semibold text-gray-900"> {article.date}</p>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href= {article.url}>
                    <span className="absolute inset-0" />
                    LINK TO THE EVENT
                  </a>
                </h3>
              </div>
            ))) 
            :(
                <div>content</div>
            )
            }
          </div>
        </div>
      </div>
    </div>
    </div>
          ):(
             navigate('/login')
          )}

          </>
   
  );
};

export default Guestlecture;
