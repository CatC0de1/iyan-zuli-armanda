import { useState } from "react";

const Hamburger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Button Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        {isOpen ? (
          // Close Icon
          <svg className="w-6 md:w-8 h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Icon
          <svg className="w-6 md:w-8 h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div className={`absolute items-start bg-(--bg-color) backdrop-blur-md flex flex-col justify-center rounded-b-lg
      py-4 gap-3 right-10 md:right-35 px-5 md:px-10 top-15 md:top-19
      ${isOpen ? "block" : "hidden"}`}
      >
        <a href="#home" className="navbar"
        onClick={() => setIsOpen(!isOpen)}>Home</a>
        <a href="#about" className="navbar"
        onClick={() => setIsOpen(!isOpen)}>About</a>
        <a href="#skills" className="navbar"
        onClick={() => setIsOpen(!isOpen)}>Skills</a>
        <a href="#portfolio" className="navbar"
        onClick={() => setIsOpen(!isOpen)}>Portfolio</a>
        <a href="#contact" className="navbar"
        onClick={() => setIsOpen(!isOpen)}>Contact</a>
      </div>
    </div>
  );
};

export default Hamburger;
