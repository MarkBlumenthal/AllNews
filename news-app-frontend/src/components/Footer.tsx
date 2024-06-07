// src/components/Footer.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css';
// import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { RootState } from '../app/store';

// const Footer: React.FC = () => {
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-links">
//           <Link to="/" className="footer-link">Home</Link>
//           <Link to="/politics" className="footer-link">Politics</Link>
//           {isAuthenticated && <Link to="/preferences" className="footer-link">Preferences</Link>}
//           <Link to="/about" className="footer-link">About</Link>
//           <Link to="/user/register" className="footer-link">Register</Link>
//         </div>
//         <div className="footer-social">
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
//             <FaTwitter />
//           </a>
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
//             <FaFacebook />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
//             <FaInstagram />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Footer: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/politics" className="footer-link">Politics</Link>
          {isAuthenticated && <Link to="/preferences" className="footer-link">Preferences</Link>}
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/user/register" className="footer-link">Register</Link>
        </div>
        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
