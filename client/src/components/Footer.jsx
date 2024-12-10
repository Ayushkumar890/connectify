import React from "react";

function Footer() {
  return (
    <footer className="w-full rounded-t-xl bg-zinc-950 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Section: Logo and Description */}
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-green font-bold text-2xl">CONNECTIFY</h2>
          <p className="text-gray-400 max-w-sm">
            Your trusted platform for connecting with health and wellness
            experts. Building communities for a healthier future.
          </p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/about"
                className="hover:text-green transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="hover:text-green transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-green transition-colors duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="hover:text-green transition-colors duration-300"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Social Media */}
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-semibold text-gray-300">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green transition-colors duration-300"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green transition-colors duration-300"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green transition-colors duration-300"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-800 pt-5">
        © {new Date().getFullYear()} CONNECTIFY. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
