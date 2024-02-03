import React from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { fetchRegisterUser } from '../../redux/userSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

function Register() {
  const [fullName, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  const fileRef = React.useRef<HTMLInputElement>(null);
  const dispatch: ThunkDispatch<any, any, AnyAction> =
    useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const isAuthenticatedUser = useSelector(isAuthenticated);

  const createUser = async () => {
    try {
      const data: RegisterUserData = { fullName, email, password, avatarUrl };
      const userData = await dispatch(fetchRegisterUser(data));

      if (!userData.payload) {
        return alert('Не удалось зарегистрироваться');
      }

      if ('token' in userData.payload) {
        localStorage.setItem('token', userData.payload.token);
      }
    } catch (err) {
      console.warn(err);
      alert('Не удалось создать аккаунт');
    }
  };

  if (isAuthenticatedUser) {
    return <Navigate to="/" />;
  }

  console.log(isAuthenticatedUser);

  return (
    <div className="wrapper">
      <div className="form-box">
        <div className="form">
          <span className="title">Регистрация аккаунта</span>
          <span className="subtitle">Пройти простую регистрацию и создать аккаунт.</span>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              onClick={() => fileRef.current?.click()}
              sx={{ width: 90, height: 90, cursor: 'pointer' }}
              src="/broken-image.jpg"
            />
          </div>
          <input ref={fileRef} type="file" name="" hidden />
          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Имя и Фамилия"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Почта"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Пароль"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="password" className="input" placeholder="Повторите пароль" required />
          </div>
          <button onClick={createUser}>Зарегистрироваться</button>
        </div>
        <div className="form-section">
          <p>
            Уже имееться аккаунт? <Link to="/login">Логин</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
