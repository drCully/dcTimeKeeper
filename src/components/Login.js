import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserCircle } from 'react-icons/fa';

import { login } from '../redux/slices/auth';
import { clearMessage } from '../redux/slices/message';

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        props.history.push('/user');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to='/time' />;
  }

  return (
    <div className='card m-auto' style={{ maxWidth: 350 }}>
      <div className='card-body'>
        <div className='d-flex justify-content-center my-4'>
          <FaUserCircle style={{ fontSize: '7em', color: '#C0C0C0' }} />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <Field name='username' type='text' className='form-control' />
              <ErrorMessage
                name='username'
                component='div'
                className='alert alert-danger'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Field name='password' type='password' className='form-control' />
              <ErrorMessage
                name='password'
                component='div'
                className='alert alert-danger'
              />
            </div>

            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary btn-block mt-3'
                disabled={loading}
              >
                {loading && (
                  <span className='spinner-border spinner-border-sm'></span>
                )}
                <span style={{ fontSize: '1.1em' }}>
                  <i className='bi bi-box-arrow-in-right me-2'></i>Log In
                </span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {message && (
        <div className='form-group'>
          <div className='alert alert-danger' role='alert'>
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
