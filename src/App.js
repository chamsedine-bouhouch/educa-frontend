
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TeacherProvider } from './context/TeacherContext';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const TeacherDetails = lazy(() => import('./pages/TeacherDetails'));
const AddTeacherForm = lazy(() => import('./pages/AddTeacherForm'));
const StudentDetails = lazy(() => import('./pages/StudentDetails'));
const AssignmentDetails = lazy(() => import('./pages/AssignmentDetails'));

const App = () => (
  <Router>
    <TeacherProvider>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers/:id" element={<TeacherDetails />} />
          <Route path="/add-teacher" element={<AddTeacherForm />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/assignments/:id" element={<AssignmentDetails />} />
        </Routes>
      </Suspense>
    </TeacherProvider>
  </Router>
);

export default App