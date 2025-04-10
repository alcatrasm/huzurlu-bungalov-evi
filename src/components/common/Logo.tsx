
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="inline-flex items-center">
      <div className="w-10 h-10 mr-2 rounded-lg bg-nature-500 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-white"
        >
          <path d="M8 3v4l-2 1 2 1v3a3 3 0 0 0 6 0V9l2-1-2-1V3" />
          <path d="M19 21V8a3 3 0 0 0-6 0v13" />
        </svg>
      </div>
      <span className="text-xl font-quicksand font-bold">
        <span className="text-earth-600">Huzurlu</span> Bungalov
      </span>
    </Link>
  );
};

export default Logo;
