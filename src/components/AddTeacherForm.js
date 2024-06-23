import React, { useState } from 'react';
import UseTeachersContext from '../hooks/use-teachers-context';

const AddTeacherForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { addTeacher, error } = UseTeachersContext()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTeacher = { name, email };
      await addTeacher(newTeacher);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" bg-sky-300 p-8">
      <div className="text-xl mb-4">
        Add New Teacher
      </div>
      {error && <p className='mb-2 text-red-500'>{error}</p>}
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


export default AddTeacherForm;
