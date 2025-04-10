import {Instagram, Youtube, Linkedin, X } from 'lucide-react';
  
  const Footer: React.FC = () => {
    return (
      <footer className="w-full py-6 flex justify-center items-center space-x-6 bg-white">
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <X className="w-8 h-8 text-black hover:text-gray-600 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-8 h-8 text-black hover:text-gray-600 transition" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <Youtube className="w-8 h-8 text-black hover:text-gray-600 transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-8 h-8 text-black hover:text-gray-600 transition" />
        </a>
      </footer>
    );
  }
  
  export default Footer;