import React, { createContext, useState, useCallback } from 'react';
import api from '../api';

const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    //  fetch all
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
    // add student
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

    // add student
    const addAssignment = useCallback(async (newAssignment) => {
        try {
            await api.post('/assignments', newAssignment);
            await fetchStudent(newAssignment.studentIds[0]);
        } catch (err) {
            setError('Failed to add student.');
            throw err;
        }
    }, [fetchStudent]);


    const store = {
        teacher,
        teachers,
        student,
        error,
        fetchTeacher,
        fetchTeachers,
        addTeacher,
        assignStudent,
        fetchStudent,
        addAssignment
    };

    return (
        <TeacherContext.Provider value={store}>
            {children}
        </TeacherContext.Provider>
    );
};

export { TeacherProvider };
export default TeacherContext;
