import React, { useState } from 'react';
import UseTeachersContext from '../hooks/use-teachers-context';

const AddStudentForm = ({ teacherId }) => {
  const { assignStudent, error } = UseTeachersContext();
  const [name, setName] = useState('');
  const [formError, setFormError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // form validation
    if (!name) {
      setFormError('Student name is required.');
      return;
    }
    try {
      await assignStudent({ name, teacherId });
      setName('');
      setFormError(null);
    } catch (err) {
      setFormError(error || 'Failed to add student.');
    }
  };


  return (
    <div className=" bg-sky-300 p-8">
      <div className="text-xl mb-4">
        Add New Student
      </div>
      <form
        onSubmit={handleSubmit}>
        <input
          className='w-full hover:bg-sky-50 rounded bg-white border py-2 px-4'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}

        <button className="bg-green-700 mt-4 px-8 py-2 rounded text-white" type="submit">Add Student</button>
      </form>
    </div>
  );
};


export default AddStudentForm;
