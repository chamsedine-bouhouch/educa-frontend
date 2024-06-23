
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TeacherProvider } from './context/teachers';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./routes/Home'));
const TeacherDetails = lazy(() => import('./routes/TeacherDetails'));
const AddTeacherForm = lazy(() => import('./components/AddTeacherForm'));
const StudentDetails = lazy(() => import('./routes/StudentDetails'));
const AssignmentDetails = lazy(() => import('./routes/AssignmentDetails'));

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