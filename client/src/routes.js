import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {CartPage} from './pages/CartPage';
import {CatalogPage} from './pages/CatalogPage';
import {AuthPage} from './pages/AuthPage';
import {DetailPage} from './pages/DetailPage';
import {AdminPage} from './pages/AdminPage';
import {EditPage} from './pages/EditPage';

export const useRoutes = (isAuth, isAdmin, secretWord) => {
  if (isAuth) {
    return (
      <Switch>
        {
          isAdmin && secretWord === 'MikeTheBest' 
            ?
              <Route path="/admin">
                <AdminPage />
              </Route>

            : null
        }

        <Route path="/edit/:id">
          <EditPage />
        </Route>

        <Route path="/" exact>
          <CatalogPage />
        </Route>

        <Route path="/cart">
          <CartPage />
        </Route>

        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <CatalogPage />
      </Route>

      <Route path="/auth">
        <AuthPage />
      </Route>

      <Route path="/detail/:id">
        <DetailPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  ) 
}

