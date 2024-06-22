import React, { useState } from 'react';

const AddTeacherForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to add a new teacher
    // Assume addTeacher is a function that makes the API call
    addTeacher({ name, email }).then(() => {
      setName('');
      setEmail('');
      // Refresh the list of teachers or show a success message
    });
  };

  return (
    <div className=" bg-sky-300 p-8">
    <div className="text-xl mb-4">
        Add New Teacher
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
      <input
      className='w-full hover:bg-sky-50  rounded  bg-white border py-2 px-4'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="bg-green-700 mt-4 px-8 py-2 rounded text-white " type="submit">Add Teacher</button>
    </form>
    </div>
  );
};

const addTeacher = async (teacher) => {
  // Placeholder for API call
  console.log('Adding teacher:', teacher);
};

export default AddTeacherForm;
