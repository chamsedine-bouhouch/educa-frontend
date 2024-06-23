import React, { useState } from 'react';
import UseTeachersContext from '../hooks/use-teachers-context';

const AddAssignmentForm = ({ student }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState(null);
  const { addAssignment, error } = UseTeachersContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // form validation
    if (!title || !dueDate) {
      setFormError('All fields are required.');
      return;
    }

    // Validate dueDate format
    const isoDate = new Date(dueDate).toISOString();
    if (isoDate === 'Invalid Date') {
      setFormError('Invalid date format.');
      return;
    }
    try {
      const newAssignment = {
        title,
        dueDate: isoDate,
        studentIds: [student.id],
        teacherId: student.teacher.id
      }
      await addAssignment(
        newAssignment
      );
      setTitle('');
      setDueDate('');
      setFormError(null);
    } catch (err) {
      setFormError(error || 'Failed to add assignment.');
    }
  };


  return (
    <div className=" bg-sky-300 p-8">
      <div className="text-xl mb-4">
        New Assignment
      </div>
      <form
        onSubmit={handleSubmit}>
        <input
          className='w-full hover:bg-sky-50 rounded bg-white border py-2 px-4 mb-4'
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}

        />

        <input
          className='w-full hover:bg-sky-50 rounded bg-white border py-2 px-4'
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} />


        {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}

        <button className="bg-green-700 mt-4 px-8 py-2 rounded text-white " type="submit">Add</button>
      </form>
    </div>
  );
};


export default AddAssignmentForm;
