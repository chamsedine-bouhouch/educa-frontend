import React, { createContext, useState, useCallback } from 'react';
import api from '../api';

const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [students, setStudents] = useState([]);
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
            await findStudentsByTeacher(id);
        } catch (err) {
            setError('Failed to fetch teacher details.');
            throw err;
        }
    }, []);

    const findStudentsByTeacher = useCallback(async (id) => {
        try {
            const res = await api.get(`/students/teacher/${id}`);
            setStudents(res.data);
        } catch (err) {
            setError('Failed to fetch students.');
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

    const store = { teacher, teachers, students, error, fetchTeacher, fetchTeachers, addTeacher, assignStudent };

    return (
        <TeacherContext.Provider value={store}>
            {children}
        </TeacherContext.Provider>
    );
};

export { TeacherProvider };
export default TeacherContext;
