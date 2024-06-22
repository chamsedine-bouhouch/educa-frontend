
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const TeacherDetails = lazy(() => import('./components/TeacherDetails'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers/:id" element={<TeacherDetails />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App