import React, { useState } from 'react';
import './auth.css';

export default function LoginForm({ handleSubmit }) {
  const userEmail = 'swpp@snu.ac.kr';
  const userPW = 'iluvswpp';
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (userInfo.email !== userEmail || userInfo.password !== userPW) {
      alert('Email or password is wrong');
      return;
    }
    handleSubmit(userInfo);
  };
  return (
    <div className="login-form__wrapper">
      <input
        name="email"
        id="email-input"
        placeholder="email"
        className="user-input"
        onChange={handleChange}
        autoComplete="false"
        value={userInfo?.email || ''}
      />
      <input
        name="password"
        id="pw-input"
        type="password"
        className="user-input"
        placeholder="password"
        onChange={handleChange}
        autoComplete="false"
        value={userInfo?.password || ''}
      />
      <button className="login-button" id="login-button" onClick={onSubmit}>
        Login
      </button>
    </div>
  );
}
