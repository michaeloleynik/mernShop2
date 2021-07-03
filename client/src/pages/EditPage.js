import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

import classes from './styles/FormComponent.module.css';
import { useEdit } from '../hooks/edit.hook';

export const EditPage = () => {
  const history = useHistory();

  const {loading, error, request, clearError} = useHttp();
  const {storageName} = useEdit();
  
  const message = useMessage();

  const [form, setForm] = useState({id: '', title: '', description: '', image: '', price: ''});

  const catalogPath = `/catalog`;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    setForm({id: data.editId, title: data.editTitle, description: data.editDescription, image: data.editImage, price: data.editPrice});
    message(error);
    clearError();
  }, [error, message, clearError, storageName]);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const editHandler = async () => {
    try {
      await request('/api/user/updateCartItems', 'POST', {...form});

      const data = await request('/api/admin/updateItem', 'POST', { ...form });
      
      history.push(catalogPath);

      message(data.message);

      localStorage.removeItem(storageName);
    } catch (e) {} 
  }

  const removeHandler = async () => {
    try {
      await request('/api/user/removeCartItems', 'POST', {...form});
      
      const data = await request('/api/admin/removeItem', 'POST', { ...form });

      history.push(catalogPath);

      message(data.message);

      localStorage.removeItem(storageName);
    } catch (e) {} 
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Edit Panel</h1>

        <div className={classes.Card + " card red lighten-1"}>
          <div className="card-content white-text">
            <span className="card-title">Edit item</span>
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

              <label htmlFor="title" className="active">Title</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input 
                name="description"
                id="description" 
                type="text"
                value={form.description} 
                className={classes.labelInput + " validate"} 
                onChange={changeHandler}
              />

              <label htmlFor="description" className="active">Description</label>
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

              <label htmlFor="image" className="active">Image-URL</label>
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

              <label htmlFor="price" className="active">Price</label>
            </div>
          </div>
      
          <div className="card-action">
            <button 
              className={classes.firstBtn + " btn cyan lighten-2 black-text"}
              onClick={editHandler}
              disabled={loading}
            >
              Edit
            </button>

            <button 
              className="btn cyan lighten-2 black-text"
              onClick={removeHandler}
              disabled={loading}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  
}