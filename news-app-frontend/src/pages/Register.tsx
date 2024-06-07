// src/pages/Register.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from '../features/auth/authSlice';
// import Footer from '../components/Footer';
// import './RegisterLogin.css'; 

// const RegisterLogin: React.FC = () => {
//   const [isRegister, setIsRegister] = useState(true);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isRegister) {
//         const response = await axios.post('http://localhost:5000/api/users/register', {
//           username,
//           email,
//           password,
//         });
//         dispatch(loginSuccess(response.data.token)); 
//         setMessage('Registration successful');
//         navigate('/preferences');
//       } else {
//         const response = await axios.post('http://localhost:5000/api/users/login', {
//           email,
//           password,
//         });
//         dispatch(loginSuccess(response.data.token));
//         setMessage('Login successful');
//         navigate('/preferences');
//       }
//     } catch (error: any) {
//       setMessage(error.response.data.message || 'That username or email already exists');
//     }
//   };

//   const handleToggle = () => {
//     setIsRegister(!isRegister);
//     setUsername('');
//     setEmail('');
//     setPassword('');
//     setMessage('');
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container container d-flex justify-content-center align-items-center flex-column fade-in">
//         <div className="card register-card">
//           <div className="row no-gutters flex-column flex-md-row">
//             <div className="col-md-6 d-flex align-items-center justify-content-center left-side">
//               <img src="/logo1.webp" alt="Website Logo" className="logo img-fluid"/>
//             </div>
//             <div className="col-md-6 right-side">
//               <div className="card-body">
//                 <h1 className="my-4">{isRegister ? 'User Registration' : 'User Login'}</h1>
//                 {message && <div className="alert alert-info">{message}</div>}
//                 <form onSubmit={handleSubmit}>
//                   {isRegister && (
//                     <div className={`mb-3 ${isRegister ? '' : 'hidden-username'}`}>
//                       <label htmlFor="username" className="form-label">Username</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required={isRegister}
//                       />
//                     </div>
//                   )}
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="button-group">
//                     <button type="submit" className="btn btn-primary">{isRegister ? 'Register' : 'Login'}</button>
//                     <button type="button" className="btn btn-secondary ml-2" onClick={handleToggle}>
//                       {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default RegisterLogin;






import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';
import Footer from '../components/Footer';
import './RegisterLogin.css'; // Import the CSS file

const RegisterLogin: React.FC = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use environment variable or fallback to local API
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const response = await axios.post(`${API_URL}/api/users/register`, {
          username,
          email,
          password,
        });
        dispatch(loginSuccess(response.data.token)); // Simulate login
        setMessage('Registration successful');
        navigate('/preferences');
      } else {
        const response = await axios.post(`${API_URL}/api/users/login`, {
          email,
          password,
        });
        dispatch(loginSuccess(response.data.token));
        setMessage('Login successful');
        navigate('/preferences');
      }
    } catch (error: any) {
      setMessage(error.response.data.message || 'That username or email already exists');
    }
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setUsername('');
    setEmail('');
    setPassword('');
    setMessage('');
  };

  return (
    <div className="register-page">
      <div className="register-container container d-flex justify-content-center align-items-center flex-column fade-in">
        <div className="card register-card">
          <div className="row no-gutters flex-column flex-md-row">
            <div className="col-md-6 d-flex align-items-center justify-content-center left-side">
              <img src="/logo1.webp" alt="Website Logo" className="logo img-fluid" />
            </div>
            <div className="col-md-6 right-side">
              <div className="card-body">
                <h1 className="my-4">{isRegister ? 'User Registration' : 'User Login'}</h1>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                  {isRegister && (
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="button-group">
                    <button type="submit" className="btn btn-primary">{isRegister ? 'Register' : 'Login'}</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={handleToggle}>
                      {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterLogin;






