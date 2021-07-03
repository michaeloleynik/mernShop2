import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [secret, setSecret] = useState(null);

  const login = useCallback((jwtToken, id, isAdmin, secretWord) => {
    setToken(jwtToken);
    setUserId(id);
    setAdmin(isAdmin);
    setSecret(secretWord)

    localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken, admin: isAdmin, secret: secretWord}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setAdmin(null);
    setSecret(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.admin, data.secret);
    }
  }, [login]);

  return {login, logout, token, userId, admin, secret};
}