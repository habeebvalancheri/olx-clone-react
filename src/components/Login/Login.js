import React, {useState} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { auth } from '../../firebase/config'; // Ensure the correct path for Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate(); 

  const [userEmail,setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Firebase authentication for login
      const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      console.log('User logged in successfully:', userCredential.user);

      // Redirect to dashboard or home page after login
      navigate('/'); // Update '/dashboard' to the path where the user should be redirected
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Handle login errors
      console.error('Error during login:', error.message);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to the login page
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value = {userEmail}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value = {userPassword}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignupRedirect}>
          Signup
          </a>
      </div>
    </div>
  );
}

export default Login;