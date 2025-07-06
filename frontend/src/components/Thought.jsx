import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarImage } from './ui/avatar';
import axios from 'axios';

const Thought = ({ thought, user, setThoughts, thoughts }) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/discussion/${thought._id}/comment`,
        { comment },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const updatedThoughts = thoughts.map((t) =>
          t._id === thought._id
            ? { ...t, comments: [...t.comments, response.data.comment] }
            : t
        );
        setThoughts(updatedThoughts);
        setComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete thought
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this thought?')) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/discussion/${thought._id}`, {
          withCredentials: true,
        });

        setThoughts(thoughts.filter((t) => t._id !== thought._id));
      } catch (error) {
        console.error('Error deleting thought:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg rounded-lg w-full md:w-3/4 lg:w-1/2 mx-auto transition-all duration-300 ease-in-out">
      {/* User Details Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user?.profile?.profilePhoto}
              alt={user?.profile?.fullname || 'User'}
            />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80 shadow-md rounded-md">
          <div className="p-4">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.profile?.fullname || 'User'}
                />
              </Avatar>
              <div>
                <h4 className="font-semibold text-lg">{user?.profile?.fullname}</h4>
                <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Thought Content */}
      <div className="w-full">
        <h3 className="text-lg font-semibold">{thought.content}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {new Date(thought.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Comments Section */}
      <div className="w-full mt-4">
        <ul className="space-y-2 mb-4">
          {(thought.comments || []).map((c, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded-md shadow-sm text-sm border-l-4 border-blue-500"
            >
              {c}
            </li>
          ))}
        </ul>

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            required
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="self-end px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Comment'}
          </button>
        </form>
      </div>

      {/* Delete Button */}
      {thought.user === user?._id && (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-all duration-200"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Thought;
