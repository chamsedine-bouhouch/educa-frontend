import React, { createContext, useState, useCallback } from 'react';
import api from '../api';

const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [student, setStudent] = useState(null);
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState(null);
    // teachers
    const fetchTeachers = useCallback(async () => {
        try {
            const res = await api.get('/teachers');
            setTeachers(res.data);
        } catch (err) {
            setError('Failed to fetch teachers.');
            throw err;
        }
    }, []);

    const fetchTeacher = useCallback(async (id) => {
        try {
            const res = await api.get(`/teachers/${id}`);
            setTeacher(res.data);
        } catch (err) {
            setError('Failed to fetch teacher details.');
            throw err;
        }
    }, []);



    const addTeacher = useCallback(async (newTeacher) => {
        try {
            await api.post('/teachers', newTeacher);
            await fetchTeachers();
        } catch (err) {
            setError('Failed to add teacher.');
            throw err;
        }
    }, [fetchTeachers]);
    //  students
    const assignStudent = useCallback(async (newStudent) => {
        try {
            await api.post('/students', newStudent);
            await fetchTeacher(newStudent.teacherId);
        } catch (err) {
            setError('Failed to add student.');
            throw err;
        }
    }, [fetchTeacher]);
    const fetchStudent = useCallback(async (id) => {
        try {
            const res = await api.get(`/students/${id}`);
            console.log(res)
            setStudent(res.data)
        } catch (err) {
            setError('Failed to fetch student details.');
            throw err;
        }
    }, []);

    // Assignments
    const addAssignment = useCallback(async (newAssignment) => {
        try {
            await api.post('/assignments', newAssignment);
            await fetchStudent(newAssignment.studentIds[0]);
        } catch (err) {
            setError('Failed to add student.');
            throw err;
        }
    }, [fetchStudent]);

    const fetchAssignment = useCallback(async (id) => {
        try {
            const res = await api.get(`/assignments/${id}`);
            setAssignment(res.data);
        } catch (err) {
            setError('Failed to fetch assignment details.');
            throw err;
        }
    }, []);
    const updateAssignmentGrade = useCallback(async (id, newGrade) => {
        try {
            const res = await api.patch(`/assignments/${id}/grade`, {
                status: newGrade
            });
            setAssignment(res.data);
        } catch (err) {
            setError('Failed to update assignment.');
            throw err;
        }
    }, []);



    const store = {
        teacher,
        teachers,
        student,
        assignment,
        error,
        fetchTeacher,
        fetchTeachers,
        addTeacher,
        assignStudent,
        fetchStudent,
        addAssignment,
        fetchAssignment,
        updateAssignmentGrade
    };

    return (
        <TeacherContext.Provider value={store}>
            {children}
        </TeacherContext.Provider>
    );
};

export { TeacherProvider };
export default TeacherContext;
