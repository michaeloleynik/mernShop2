import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import classes from '../pages/styles/Navbar.module.css';

export const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = e => {
    e.preventDefault();
    
    auth.logout();

    history.push('/');
  }

  return (
    <AuthContext.Consumer>
      {context => (
        <nav className={classes.NavBar + " red lighten-1"}>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">MernShop</a>
          
            {context.isAuth
              ?
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  { 
                    context.isAdmin && context.secretWord === 'MikeTheBest' 
                    && <li><NavLink to="/admin">Admin</NavLink></li>
                  }

                  <li><NavLink to="/">Catalog</NavLink></li>
                  <li><NavLink to="/cart">Cart</NavLink></li>

                  <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
              :
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><NavLink to="/">Catalog</NavLink></li>
                  <li><NavLink to="/auth">Auth</NavLink></li>
                </ul>
            }
          </div>
        </nav>
      )}
    </AuthContext.Consumer>
    
  )

}

