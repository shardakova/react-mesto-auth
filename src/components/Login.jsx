import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import useValidation from '../hooks/useValidation';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import InfoTooltip from './InfoTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function Login () {
  const auth = useAuth();
  const navigate = useNavigate();
  const [onInput, errors, isValid] = useValidation();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSignedInWithError, setIsSignedInWithError] = useState(false);
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  function handleSubmit () {
    setIsFormLoading(true);
    auth.signIn({
      email: emailRef.current.value,
      password: passwordRef.current.value
    }, err => {
      if (err) {
        setIsSignedInWithError(true);
      } else {
        navigate('/', { replace: true });
      }
      setIsFormLoading(false);
    });
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
          className="sign_in_form" name="login-form"
          noValidate
        >
          <h3 className="sign_in_form__title">Вход</h3>
          <div className="sign_in_form__field">
            <input
              ref={emailRef}
              onInput={(event) => {
                onInput(event);
              }}
              className="sign_in_form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={isFormLoading}
            />
            {errors.email && (<span className="sign_in_form__span sign_in_form__span-error">{errors.email}</span>)}
          </div>
          <div className="sign_in_form__field">
            <input
              ref={passwordRef}
              onInput={(event) => {
                onInput(event);
              }}
              className="sign_in_form__input"
              type="password"
              name="password"
              placeholder="Пароль"
              required
              disabled={isFormLoading}
            />
            {errors.password && (<span className="sign_in_form__span sign_in_form__span-error">{errors.password}</span>)}
          </div>
          <button
            className="button button_type_login_form"
            type="submit"
            disabled={isFormLoading || !isValid}
          >
            {
              isFormLoading ? 'Входим...' : 'Войти'
            }
          </button>
        </form>
        <InfoTooltip
          text="Данные введены неверно."
          icon={<FontAwesomeIcon icon={faCircleXmark} />}
          isOpen={isSignedInWithError}
          onClose={() => {
            setIsSignedInWithError(false);
          }}
        />
        <Footer />
      </div>
    </div>
  );
}

export default Login;
