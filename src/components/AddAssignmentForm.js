import React, { useState } from 'react';

const AddAssignmentForm = ({ studentId }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to add a new Student
    assignStudent({ name, studentId }).then(() => {
      setName('');
    });
  };

  return (
    <div className=" bg-sky-300 p-8">
      <div className="text-xl mb-4">
        Add New Assignment
      </div>
      <form
        onSubmit={handleSubmit}>
        <input
          className='w-full hover:bg-sky-50 rounded bg-white border py-2 px-4 mb-4'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button className="bg-green-700 mt-4 px-8 py-2 rounded text-white " type="submit">Add Student</button>
      </form>
    </div>
  );
};

const assignStudent = async (student) => {
  // Placeholder for API call
  console.log('Adding student:', student);
};

export default AddAssignmentForm;
