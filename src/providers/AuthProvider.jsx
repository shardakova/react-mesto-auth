import { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { AUTH_API } from '../utils/constants';
import LoadingLayout from '../components/LoadingLayout';

function AuthProvider (props) {
  const [user, setUser] = useState();
  const [isTokenChecked, setIsTokenChecked] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setIsTokenChecked(true);
      return;
    }
    AUTH_API.getUserInfo()
      .then(res => {
        setUser({
          email: res.data.email
        });
      })
      .catch(err => {
        if (err.status === 401) {
          localStorage.removeItem('authToken');
        }
        console.error(err);
      })
      .finally(() => {
        setIsTokenChecked(true);
      });
  }, []);

  const signIn = ({ email, password }, callback) => {
    AUTH_API.signIn({
      email,
      password
    })
      .then(res => {
        localStorage.setItem('authToken', res.token);
        setUser({
          email
        });
        callback();
      })
      .catch(err => {
        console.error(err);
        callback(err);
      });
  };

  const signOut = (callback) => {
    localStorage.removeItem('authToken');
    setUser(null);
    callback();
  };

  const register = ({ email, password }, callback) => {
    AUTH_API.signUp({
      email,
      password
    })
      .then(() => {
        callback();
      })
      .catch(err => {
        err
          .json()
          .then(res => {
            callback(res.error);
          })
          .catch(() => {
            callback();
          });
      });
  };

  const value = { user, signIn, signOut, register };

  return (
    <AuthContext.Provider value={value}>
      {!isTokenChecked ? <LoadingLayout /> : props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
