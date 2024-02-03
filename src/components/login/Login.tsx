import React from 'react';
import './login.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { fetchLoginUser } from '../../redux/userSlice';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

const Login: React.FC = () => {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const dispatch: ThunkDispatch<any, any, AnyAction> =
    useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const loginUser = async () => {
    try {
      const data = { email, password };
      const userData = await dispatch(fetchLoginUser(data));

      if (!userData.payload) {
        return alert('Не удалось зарегистрироваться');
      }

      if ('token' in userData.payload) {
        localStorage.setItem('token', userData.payload.token);
      }
    } catch (err) {
      console.warn(err);
      alert('Не удалось войти в аккаунт');
    }
  };

  if (isAuthenticatedUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="wrapper">
      <div className="form-box">
        <div className="form">
          <span className="title">Войти в аккаунт</span>
          <div className="form-container">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Почта"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Пароль"
            />
          </div>
          <button onClick={loginUser}>Войти</button>
        </div>
        <div className="form-section">
          <p>
            Нету аккаунта? <Link to="/register">Регистрация</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
