
import React from 'react';

interface FooterProps {
  isLoaded: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoaded }) => {
  return (
    <footer className={`bg-lake-blue-800 text-white p-6 mt-12 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Bridvaišio ežero informacinis puslapis</p>
        <p className="text-sm mt-2">Šis puslapis skirtas dalintis informacija apie Bridvaišio ežerą ir nardymo patirtis jame.</p>
        <p className="text-sm mt-4 italic font-light">With deepest love for this lake, Justas Maziliauskas</p>
      </div>
    </footer>
  );
};

export default Footer;
