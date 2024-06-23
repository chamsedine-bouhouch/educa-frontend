
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDetails from './components/StudentDetails';
import AssignmentDetails from './components/AssignmentDetails';

const Home = lazy(() => import('./routes/Home'));
const TeacherDetails = lazy(() => import('./components/TeacherDetails'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers/:id" element={<TeacherDetails />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/assignments/:id" element={<AssignmentDetails />} />

      </Routes>
    </Suspense>
  </Router>
);

export default App