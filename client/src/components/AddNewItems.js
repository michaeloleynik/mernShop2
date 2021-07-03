import React, {useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

import classes from '../pages/styles/FormComponent.module.css';


export const AddNewItems = () => {
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();
  const history = useHistory();

  const [form, setForm] = useState({title: '', description: '', image: '', price: 0});

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const addHandler = async () => {
    try {
      const data = await request('/api/admin/add', 'POST', { ...form });
      const addHandlerPath = `/catalog`;
      history.push(addHandlerPath);
      message(data.message);
    } catch (e) {} 
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className={classes.Card + " card red lighten-1"}>
          <div className="card-content white-text">
            <span className="card-title">Add new item</span>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input 
                name="title"
                id="title" 
                type="text"
                value={form.title} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="title">Title</label>
            </div>
          </div>

          <div className="row white-text">
            <div className="input-field col s12">
              <input
                name="description" 
                id="description"
                type="text"
                value={form.description} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="description">Description</label>
            </div>
          </div>

          <div className="row white-text">
            <div className="input-field col s12">
              <input
                name="image" 
                id="image"
                type="text"
                value={form.image} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="image">Image-URL</label>
            </div>
          </div>

          <div className="row white-text">
            <div className="input-field col s12">
              <input
                name="price" 
                id="price"
                type="number"
                value={form.price} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="price">Price</label>
            </div>
          </div>
      
          <div className="card-action">
            <button 
              className={"btn cyan lighten-2 black-text"}
              onClick={addHandler}
              disabled={loading}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}