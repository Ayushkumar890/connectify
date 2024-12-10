import React from "react";

function About() {
  return (
    <div className="w-full bg-black text-gray-200 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Title */}
        <h2 className="text-green font-extrabold text-4xl md:text-6xl text-center">
          About CONNECTIFY
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-300 text-center max-w-3xl leading-relaxed">
          CONNECTIFY is your trusted platform for building meaningful
          connections with health and wellness experts. From fitness coaches to
          mental health professionals, we bring communities together to foster
          collaboration and growth.
        </p>

        {/* Highlight Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg shadow-lg">
            <h3 className="text-green text-2xl font-bold">Trusted Experts</h3>
            <p className="text-gray-400 mt-4">
              Connect with verified professionals to ensure quality advice and
              guidance tailored to your needs.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg shadow-lg">
            <h3 className="text-green text-2xl font-bold">Community Growth</h3>
            <p className="text-gray-400 mt-4">
              Join active communities that align with your health and wellness
              goals, fostering meaningful connections.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <button className="relative overflow-hidden h-12 px-8 rounded-md border-2 border-green bg-green text-gray-200 cursor-pointer group mt-10">
          <span className="relative z-10">Explore More</span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#075504] to-[#29a623] scale-x-0 group-hover:scale-x-100 transition-transform duration-[300ms] ease-in-out origin-left rounded-md"></span>
        </button>
      </div>
    </div>
  );
}

export default About;
