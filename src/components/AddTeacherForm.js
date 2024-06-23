import React, { useState } from 'react';
import UseTeachersContext from '../hooks/use-teachers-context';

const AddTeacherForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState(null);

  const { addTeacher, error } = UseTeachersContext()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // form validation
    if (!name || !email) {
      setFormError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Email address is invalid.');
      return;
    }

    try {
      const newTeacher = { name, email };
      await addTeacher(newTeacher);
    } catch (err) {
      console.error(err);
      setFormError(error || 'Failed to add teacher.');

    }
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
        />
        <input
          className='w-full hover:bg-sky-50  rounded  bg-white border py-2 px-4'
           placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}

        <button className="bg-green-700 mt-4 px-8 py-2 rounded text-white " type="submit">Add Teacher</button>
      </form>
    </div>
  );
};


export default AddTeacherForm;
