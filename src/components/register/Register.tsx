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
import { getStorage, ref, uploadBytes, getDownloadURL, UploadTask } from 'firebase/storage';
import app from '../../firebase';

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
  // state for firebase
  const [avatar, setAvatar] = React.useState<File | null>(null);
  // ====================
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

  const uploadFile = (file: File | null) => {
    if (!file) return;

    const storage = getStorage(app);
    const newFile = new Date().getTime() + file.name;
    const storageRef = ref(storage, newFile);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL: string) => {
          setAvatarUrl(downloadURL);
        });
      })
      .catch((error: string) => {
        console.warn(error);
      });
  };

  React.useEffect(() => {
    avatar && uploadFile(avatar);
  }, [avatar]);

  if (isAuthenticatedUser) {
    return <Navigate to="/" />;
  }

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
              src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
            />
          </div>
          <input
            ref={fileRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setAvatar(e.target.files[0]);
              }
            }}
            type="file"
            name=""
            accept="image/*"
            hidden
          />
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
