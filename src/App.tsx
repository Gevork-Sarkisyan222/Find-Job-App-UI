import './App.scss';
import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import NotFound from './components/NotFound/NotFound';
import { fetchAuthMe } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

function App() {
  const dispatch: ThunkDispatch<any, any, AnyAction> =
    useDispatch<ThunkDispatch<any, any, AnyAction>>();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
