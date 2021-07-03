import React, {useState, useEffect, useCallback} from 'react';
import {ItemsComponent} from '../components/Items';
import {Loader} from '../components/Loader';
import {useHttp} from '../hooks/http.hook';

export const CatalogPage = () => {
  const {loading, request} = useHttp();

  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    try {
      const data = await request('/api/catalog/getAll');

      setItems(data);
    } catch (e) {}
  }, [request]);
 

  useEffect(() => {
    fetchItems(); 
  }, [fetchItems]);

  
  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <h1>Catalog</h1>

      {!loading && <ItemsComponent items={items} />}
    </>
  )
}