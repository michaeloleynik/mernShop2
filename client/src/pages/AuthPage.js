import React, {useState, useEffect, useContext} from 'react';
import {Loader} from '../components/Loader';

import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/authContext';

import classes from './styles/FormComponent.module.css';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({email: '', password: '', admin: false, secretWord: ''});

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });     

      message(data.message);
    } catch (e) {} 
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      
      auth.login(data.token, data.userId, data.isAdmin, data.secretWord);
    } catch (e) {} 
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Mern Shop</h1>

        {loading && <Loader />}
        
        <div className={classes.Card + " card red lighten-1"}>
          <div className="card-content white-text">
            <span className="card-title">Authification</span>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input 
                name="email"
                id="email" 
                type="email"
                value={form.email} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row white-text">
            <div className="input-field col s12">
              <input
                name="password" 
                id="password"
                type="password"
                value={form.password} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="password">Password</label>
            </div>
          </div>
      
          <div className="card-action">
            <button 
              className={classes.firstBtn + " btn cyan lighten-2 black-text"}
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>

            <button 
              className="btn cyan lighten-2 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}