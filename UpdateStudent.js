import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5001/update/'+id, { name, email })
      .then(res => {
        console.log(res);
        navigate('/');
      }).catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter Name" 
              className="form-control" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter Email" 
              className="form-control" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-success">update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
