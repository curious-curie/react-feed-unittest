import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../components/auth/LoginForm';
import { requestLogin } from '../../modules/auth';
import history from '../../history';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (userInfo) => {
    const { email, password } = userInfo;
    await dispatch(requestLogin({ email, password }));
  };

  useEffect(() => {
    if (user && user.logged_in) history.push('/articles');
  }, [user]);

  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
}
