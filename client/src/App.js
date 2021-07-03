import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {useEdit} from './hooks/edit.hook';
import {AuthContext} from './context/authContext';
import {EditContext} from './context/editContext';
import 'materialize-css';
import { NavBar } from './components/Navbar';

 
function App() {
  const {token, login, logout, userId, admin, secret} = useAuth();
  const {editParams} = useEdit();
  const {id, title, image, price} = editParams;
  const isAuth = !!token;
  const isAdmin = admin;
  const secretWord = secret;

  const routes = useRoutes(isAuth, isAdmin, secretWord);
  return (
    <EditContext.Provider value={{id, title, image, price}}>
      <AuthContext.Provider value={{token, login, logout, userId, isAuth, isAdmin, secretWord}}>
        <BrowserRouter>
          <NavBar />
          
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
      </AuthContext.Provider> 
    </EditContext.Provider>
  );
}

export default App;
