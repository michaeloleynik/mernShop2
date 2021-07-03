import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/authContext';
import {useEdit} from '../hooks/edit.hook';
import {useMessage} from '../hooks/message.hook';
import {useHttp} from '../hooks/http.hook';
import {toCurrency} from '../hooks/toCurrency.hook';

import classes from '../pages/styles/FormComponent.module.css';

export const ItemsComponent = ({items}) => {  
  const {editRelocate} = useEdit();

  const message = useMessage();

  const {request} = useHttp();

  const auth = useContext(AuthContext);

  const editHandler = (id, title, description, image, price) => {
    try {
      editRelocate(id, title, description, image, price);

    } catch (e) {
      return message(e);
    }
  }

  const addToCartHandler = async (isAuth, itemId, title, image, price) => {
    try {
      if(!isAuth) {
        return message('You must to login or register!');
      }
      
      const data = await request('/api/user/addToCart', 'POST', {itemId, title, image, price}, {Autharization: `Bearer ${auth.token}`});

      message(data.message);

    } catch (e) {}
  }
 
  return (
    <AuthContext.Consumer>
      {context => (
        <div className="row">
          {
            !items.length ? <p>The catalog is empty!</p> : 
            
            <ul>
              {items.map(item => (
                <li key={item._id}>
                  <div className="col s10 m4">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={item.image} alt={item.title} />
                      </div>

                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{item.title}</span>
                        <b>{toCurrency(item.price)}</b>
                      </div>

                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{item.title}<i className="material-icons right">close</i></span>
                        
                        <p>{item.description}</p>
                      </div>

                      <div className="card-action">
                        <button className={classes.firstBtn + " btn btn-primary"} onClick={() => addToCartHandler(context.isAuth, item._id, item.title, item.image, item.price)}>Add to cart</button>

                        {
                          context.isAdmin && context.secretWord === 'MikeTheBest' 
                            && <Link to={`/edit/${item._id}`} onClick={() => editHandler(item._id, item.title, item.description, item.image, item.price)}>Edit</Link>
                        }
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-image">
                        <img src={item.image} alt={item.title} />

                        <span className="card-title">{item.title}</span>
                      </div>

                      <div className="card-content">
                        <b>{toCurrency(item.price)}</b> */}
                        {/* <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p> */}  
                      {/* </div>

                      <div className="card-action">
                        <button className={classes.firstBtn + " btn btn-primary"} onClick={() => addToCartHandler(context.isAuth)}>Add to cart</button>

                        {
                          context.isAdmin && context.secretWord === 'MikeTheBest' 
                            && <Link to={`/edit/${item._id}`} onClick={() => editHandler(item._id, item.title, item.image, item.price)}>Edit</Link>
                        }
                      </div>
                    </div> */}
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      )}
    </AuthContext.Consumer>
  )
}