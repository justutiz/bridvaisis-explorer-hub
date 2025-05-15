
import React from 'react';

interface FooterProps {
  isLoaded: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoaded }) => {
  return (
    <footer className={`bg-gradient-to-r from-lake-blue-900/90 via-lake-blue-800/80 to-lake-teal-900/70 backdrop-blur-lg text-white border-t border-white/10 p-6 mt-12 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto text-center">
        <p className="text-lake-blue-200 text-sm font-medium">&copy; {new Date().getFullYear()} Bridvaišio ežero informacinis puslapis</p>
        <p className="text-lake-blue-100/80 text-xs mt-2">Šis puslapis skirtas dalintis informacija apie Bridvaišio ežerą ir nardymo patirtis jame.</p>
        <p className="text-lake-teal-300 text-xs mt-4 italic font-light">One Man. One Lake. A Lifelong Bond – Justas Maziliauskas</p>
      </div>
    </footer>
  );
};

export default Footer;
