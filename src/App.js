
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TeacherProvider } from './context/TeacherContext';
import Spinner from './components/Spinner';
import NotFound from './pages/NotFound';

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/teachers/:id" element={<TeacherDetails />} />
          <Route exact path="/add-teacher" element={<AddTeacherForm />} />
          <Route exact path="/students/:id" element={<StudentDetails />} />
          <Route exact path="/assignments/:id" element={<AssignmentDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TeacherProvider>
  </Router>
);

export default App