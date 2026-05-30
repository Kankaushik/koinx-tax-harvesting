import React from "react";

const Header = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-800 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">Koin</span>
          <span className="text-2xl font-bold text-yellow-500">X</span>
          <span className="text-blue-500 text-xs align-top mt-1">®</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
