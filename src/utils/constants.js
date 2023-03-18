import Api from './Api';
import AuthApi from './AuthApi';

const API = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    Authorization: 'c50e0659-04f9-4bf8-9104-83ea027e1f40',
    'Content-Type': 'application/json'
  }
});

const AUTH_API = new AuthApi({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export {
  API,
  AUTH_API
};
