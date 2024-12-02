import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// ======= Import components =======
import Home from './pages/Home'
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
        <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
