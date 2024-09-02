// Margin.js
import React from 'react';
import Blog from './Blog';

const Margin = () => {
  return (
    <div>
    {
      Array.from({ length: 10 }, () => <Blog />)
    }

    </div>
  );
};

export default Margin;
