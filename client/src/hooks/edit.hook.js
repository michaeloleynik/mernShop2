import {useState, useCallback} from 'react';

export const useEdit = () => {
  const storageName = 'CurrentEditItem';

  const [editParams, setEditParams] = useState({id: null, title: null, description: null, image: null, price: null});

  const editRelocate = useCallback((id, title, description, image, price) => {
    setEditParams({id, title, description, image, price});

    localStorage.setItem(storageName, JSON.stringify({editId: id, editTitle: title, editDescription: description, editImage: image, editPrice: price}));
  }, []);

  return {editRelocate, editParams, storageName};
}