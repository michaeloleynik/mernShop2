import React, {useState, useEffect, useCallback} from 'react';

import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {Loader} from './Loader';

import classes from '../pages/styles/FormComponent.module.css';

export const OrdersComponent = () => {
  const {loading, request} = useHttp();

  const [orders, setOrders] = useState([]);

  const message = useMessage();

  const fetchOrders = useCallback(async () => {
    try {
      const data = await request('/api/admin/getAllOrders');
      setOrders(data);

    } catch (e) {}
  }, [request]);

  const finishOrderHandler = async (id) => {
    const data = await request('/api/admin/finishOrder', 'POST', {id, isFinished: true});
    message(data.message);
    setOrders(prevState => prevState.filter(el => el._id !== id));
  }

  useEffect(() => {
    fetchOrders(); 
  }, [fetchOrders]);

  if(loading) {
    return <Loader />
  }

  return (
    <>
      {
        !loading && 
        <div className="row">
          {
            !orders.length ?

            <p>The order list is empty!</p> :

            <ul>
              {orders.map(order => (
                <li key={order._id}>
                  <div className="col s10 m4">
                    <div className={classes.Card + " card red lighten-1"}>
                      <div className="card-content white-text">
                        <span className="card-title activator">{order.firstName} {order.secondName}</span>
                        <span>{order.adress}</span>
                        <br/>
                        <span>{order.phone}</span>
                      </div>

                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Order Detail:<i className="material-icons right">close</i></span>
                        
                        <ul>
                          {order.order.map(el => (
                            <li key={el._id}>
                              {el.title} x {el.count}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="card-action">
                        <button className={classes.firstBtn + " btn btn-primary"} onClick={() => finishOrderHandler(order._id)}>Finish!</button>
                      </div>
                    </div>
                  </div>  
                </li>
              ))}
            </ul>
          }
        </div>
      }
    </>
    
  )
}