import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import '../../styles/style.css'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="navbar" className={`fixed w-full z-10 bg-(--bg-color) backdrop-blur-xs text-white py-3 md:py-5 transition-all duration-500 ${isScrolled ? "shadow-lg" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center">
          <a href="/" className="text-(--primary-color) font-black text-xl md:text-2xl lg:text-3xl">
            Iyan Zuli A
          </a>
          <div className="hidden md:flex gap-6 xl:gap-12">
            <a href="#home" id="navHome" className="navbar">Home</a>
            <a href="#about" id="navAbout" className="navbar">About</a>
            <a href="#skills" id="navSkills" className="navbar">Skills</a>
            <a href="#projects" id="navProjects" className="navbar">Projects</a>
            <a href="#contact" id="navContact" className="navbar">Contact</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-white hover:text-(--border-color)">
              {isOpen ? <X className="w-6 md:w-8 h-auto" /> : <Menu className="w-6 md:w-8 h-auto" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden p-4 flex flex-col items-center gap-4 w-full">
          <span>
            <a href="#home" className="font-semibold navbar" onClick={closeMenu}>Home</a>
          </span>
          <span>
            <a href="#about" className="font-semibold navbar" onClick={closeMenu}>About</a>
          </span>
          <span>
            <a href="#skills" className="font-semibold navbar" onClick={closeMenu}>Skills</a>
          </span>
          <span>
            <a href="#projects" className="font-semibold navbar" onClick={closeMenu}>Projects</a>
          </span>
          <span>
            <a href="#contact" className="font-semibold navbar" onClick={closeMenu}>Contact</a>        
          </span>
        </div>
      )}
    </nav>
  );
}
