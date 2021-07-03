import React, {useState, useEffect, useCallback, useContext} from 'react';
import {ItemsCartComponent} from '../components/ItemsCart';
// import {FinishOrder} from '../components/FinishOrder';
import {Loader} from '../components/Loader';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/authContext';

export const CartPage = () => {
  const {loading, request} = useHttp();

  const [cartItems, setCartItems] = useState([]);
  // const [isFinished, setIsFinished] = useState(false);

  const auth = useContext(AuthContext);

  const fetchCartItems = useCallback(async () => {
    try {
      const data = await request('/api/user/getAllFromCart', 'GET', null, {Autharization: `Bearer ${auth.token}`});
      
      setCartItems(data);
      

    } catch (e) {}
  }, [request, auth.token]);

  // const changeFinish = () => {
	// 	setIsFinished(!isFinished);
	// 	console.log(isFinished);
	// }
 

  useEffect(() => {
    fetchCartItems(); 
  }, [fetchCartItems]);

  
  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <h1>Cart</h1>

      {/* {isFinished && <FinishOrder totalItems={cartItems}/>} */}

      {/* {!loading && isFinished ? <FinishOrder totalItems={cartItems}/> && <ItemsCartComponent cartItems={cartItems} changeFinish={changeFinish} /> : */}
      {
        !loading && <ItemsCartComponent cartItems={cartItems} />
      }
    </>
  )
  
}