import React, { useState } from 'react';
import './logeo.css';
const Logeo = () => {
  const [register, setRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleToggle = () => {
    setRegister(!register);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { email, password, name });
  }

  return (
    <div>
      <h2>{register ? 'Registrarse' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {register &&
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        }
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{register ? 'Register' : 'Login'}</button>
      </form>
      <p onClick={handleToggle}>{register ? 'Tienes una cuenta? Login' : 'No tienes cuenta? Registrarse'}</p>
    </div>
  );
};

export default Logeo;