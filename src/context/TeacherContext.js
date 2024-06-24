import React, { createContext, useCallback, useReducer } from 'react';
import api from '../api';

const SET_TEACHERS = 'set-teachers';
const SET_TEACHER = 'set-teacher';
const SET_STUDENT = 'set-student';
const SET_ASSIGNMENT = 'set-assignment';
const SET_ERROR = 'set-error';

const TeacherContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TEACHERS:
            return {
                ...state,
                teachers: action.payload,
            };
        case SET_TEACHER:
            return {
                ...state,
                teacher: action.payload,
            };
        case SET_STUDENT:
            return {
                ...state,
                student: action.payload,
            };
        case SET_ASSIGNMENT:
            return {
                ...state,
                assignment: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

const TeacherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        teachers: [],
        teacher: null,
        student: null,
        assignment: null,
        error: null,
    });

    // Teachers
    const fetchTeachers = useCallback(async () => {
        try {
            const res = await api.get('/teachers');
            dispatch({ type: SET_TEACHERS, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to fetch teachers.' });
            throw err;
        }
    }, []);

    const fetchTeacher = useCallback(async (id) => {
        try {
            const res = await api.get(`/teachers/${id}`);
            dispatch({ type: SET_TEACHER, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to fetch teacher details.' });
            throw err;
        }
    }, []);

    const addTeacher = useCallback(async (newTeacher) => {
        try {
            await api.post('/teachers', newTeacher);
            await fetchTeachers();
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to add teacher.' });
            throw err;
        }
    }, [fetchTeachers]);

    // Students
    const assignStudent = useCallback(async (newStudent) => {
        try {
            await api.post('/students', newStudent);
            await fetchTeacher(newStudent.teacherId);
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to add student.' });
            throw err;
        }
    }, [fetchTeacher]);

    const fetchStudent = useCallback(async (id) => {
        try {
            const res = await api.get(`/students/${id}`);
            dispatch({ type: SET_STUDENT, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to fetch student details.' });
            throw err;
        }
    }, []);

    // Assignments
    const addAssignment = useCallback(async (newAssignment) => {
        try {
            await api.post('/assignments', newAssignment);
            await fetchStudent(newAssignment.studentIds[0]);
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to add assignment.' });
            throw err;
        }
    }, [fetchStudent]);

    const fetchAssignment = useCallback(async (id) => {
        try {
            const res = await api.get(`/assignments/${id}`);
            dispatch({ type: SET_ASSIGNMENT, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to fetch assignment details.' });
            throw err;
        }
    }, []);

    const updateAssignmentGrade = useCallback(async (id, newGrade) => {
        try {
            const res = await api.patch(`/assignments/${id}/grade`, {
                status: newGrade,
            });
            dispatch({ type: SET_ASSIGNMENT, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: 'Failed to update assignment.' });
            throw err;
        }
    }, []);

    const store = {
        ...state,
        fetchTeacher,
        fetchTeachers,
        addTeacher,
        assignStudent,
        fetchStudent,
        addAssignment,
        fetchAssignment,
        updateAssignmentGrade,
    };

    return (
        <TeacherContext.Provider value={store}>
            {children}
        </TeacherContext.Provider>
    );
};

export { TeacherProvider };
export default TeacherContext;
