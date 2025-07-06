import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Thought from "./Thought";
import { useEffect, useState } from "react";
import axios from "axios";

const Discussion = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/discussion/get"
        );
        if (response.data.success) {
          setThoughts(response.data.discussions || []);
        } else {
          console.error("Failed to fetch thoughts:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching thoughts:", error);
      }
    };
    fetchThoughts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      thought: newThought,
      user: user?._id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/discussion/discussionpost",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        setThoughts([...thoughts, response.data.discussion]);
        setNewThought("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold uppercase mb-6">
        Share Your <span className="text-cyan-400">Thoughts</span>
      </h1>

      {/* Thought Input */}
      <div className="w-full max-w-2xl mb-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 bg-white shadow-lg rounded-lg p-6"
        >
          <textarea
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            placeholder="What's on your mind?"
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-200"
          >
            Post
          </button>
        </form>
      </div>

      {/* Thoughts List */}
      <div className="w-full max-w-2xl space-y-6">
        {Array.isArray(thoughts) && thoughts.length > 0 ? (
          thoughts
            .slice(0)
            .reverse() // Show newest thoughts first
            .map((thought) => (
              <Thought
                key={thought._id}
                thought={thought}
                user={user}
                setThoughts={setThoughts}
                thoughts={thoughts}
              />
            ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No thoughts to display. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
