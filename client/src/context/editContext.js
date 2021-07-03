import {createContext} from 'react';

function nothing() {}

export const EditContext = createContext({
  id: null,
  title: '',
  image: '',
  price: null,
  editRelocate: nothing,
  delete: nothing 
});