import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// ======= Import components =======
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Create from './pages/Create';
import { authContext } from './contexts/firebaseContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';

function App() {

  const {setUser} = useContext(authContext);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return () => unsubscribe(); // Clean up the subscription
}, [setUser]);

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
        <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
        <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
