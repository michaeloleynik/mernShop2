import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Modal} from 'react-materialize';
import {AuthContext} from '../context/authContext';

import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

import classes from '../pages/styles/FormComponent.module.css';

export const FinishOrder = ({totalItems, trigger}) => {
  const [form, setForm] = useState({firstName: '', secondName: '', adress: '', phone: '', isFinished: false});
  

  const history = useHistory();

  const auth = useContext(AuthContext);

  const {request} = useHttp();
  const message = useMessage();

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const finishHandler = async () => {
    try {
      const data = await request('/api/user/finishOrder', 'POST', { ...form, totalItems }, {Autharization: `Bearer ${auth.token}`});
      const finishHandlerPath = `/catalog`;
      console.log(data);
      message(data.message);
      history.push(finishHandlerPath);
      
    } catch (e) {} 
  }

  return (
    <Modal trigger={trigger}>
      <div className={classes.Card + " card red lighten-1"}>
        <div className="card-content white-text">
          <span className="card-title">Finish Order And Pay</span>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input 
              name="firstName"
              id="firstName" 
              type="text"
              value={form.firstName} 
              className={classes.labelInput + " validate"} 
              onChange={changeHandler}
            />

            <label htmlFor="firstName">First Name</label>
          </div>
        </div>

        <div className="row white-text">
          <div className="input-field col s12">
            <input
              name="secondName" 
              id="secondName"
              type="text"
              value={form.secondName} 
              className={classes.labelInput + " validate"} 
              onChange={changeHandler}
            />

            <label htmlFor="secondName">Second Name</label>
          </div>
        </div>

        <div className="row white-text">
          <div className="input-field col s12">
            <input
              name="adress" 
              id="adress"
              type="text"
              value={form.adress} 
              className={classes.labelInput + " validate"} 
              onChange={changeHandler}
            />

            <label htmlFor="adress">Your Adress</label>
          </div>
        </div>

        <div className="row white-text">
          <div className="input-field col s12">
            <input
              name="phone" 
              id="phone"
              type="text"
              value={form.phone} 
              className={classes.labelInput + " validate"} 
              onChange={changeHandler}
            />

            <label htmlFor="phone">Your Number</label>
          </div>
        </div>
    
        <div className="card-action">
          <button 
            className={"btn cyan lighten-2 black-text"}
            onClick={finishHandler}
            // disabled={loading}
          >
            Finish And Pay
          </button>
        </div>
      </div>
    </Modal>    
  )
}