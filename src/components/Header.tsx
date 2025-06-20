import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center">Flight Globe Visualizer</h1>
        <p className="text-center text-sm mt-1">
          Visualize flight routes between locations on Earth using 2D maps and 3D globe views
        </p>
      </div>
    </header>
  );
};

export default Header;
