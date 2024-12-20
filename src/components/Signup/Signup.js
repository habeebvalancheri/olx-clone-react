import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth,db } from '../../firebase/config'; // Ensure the correct relative path
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate(); // Initialize navigation

  const [userName,setUserName] = useState('');
  const [userEmail,setEmail] = useState('');
  const [userPhone,setPhone] = useState('');
  const [userPassword,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Use Firebase's modular functions to create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);

      // Update the user's display name
      await updateProfile(userCredential.user, { displayName: userName });

       // Store additional details in Firestore
       const userRef = doc(db, "users", userCredential.user.uid); // Reference to the user's document
       await setDoc(userRef, {
         uid: userCredential.user.uid,
         userName: userName,
         email:userEmail,
         phone: userPhone,
         createdAt: new Date().toISOString(),
       });

      console.log('User created successfully:', userCredential.user);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value = {userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value = {userPhone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a onClick={handleLoginRedirect}>
          Login
        </a>
      </div>
    </div>
  );
}