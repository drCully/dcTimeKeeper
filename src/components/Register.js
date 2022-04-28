import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserCircle } from 'react-icons/fa';

import { register } from '../redux/slices/auth';
import { clearMessage } from '../redux/slices/message';

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    initials: '',
    rate: 150,
    active: true,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required('This field is required!'),
    firstname: Yup.string().required('This field is required!'),
    lastname: Yup.string().required('This field is required!'),
    initials: Yup.string().required('This field is required!'),
    rate: Yup.string().required('This field is required!'),
  });

  const handleRegister = (formValue) => {
    const { username, password, firstname, lastname, initials, rate, active } =
      formValue;
    setSuccessful(false);

    dispatch(
      register({
        username,
        password,
        firstname,
        lastname,
        initials,
        rate,
        active,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className='card m-auto' style={{ maxWidth: 350 }}>
      <div className='card-body'>
        <div className='d-flex justify-content-center my-4'>
          <FaUserCircle style={{ fontSize: '7em', color: '#C0C0C0' }} />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
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
                  <Field
                    name='password'
                    type='password'
                    className='form-control'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='firstname'>First Name</label>
                  <Field
                    name='firstname'
                    type='text'
                    className='form-control'
                  />
                  <ErrorMessage
                    name='firstname'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='lastname'>Last Name</label>
                  <Field name='lastname' type='text' className='form-control' />
                  <ErrorMessage
                    name='lastname'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='initials'>Initials</label>
                  <Field name='initials' type='text' className='form-control' />
                  <ErrorMessage
                    name='initials'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='rate'>Billing Rate</label>
                  <Field name='rate' type='number' className='form-control' />
                  <ErrorMessage
                    name='rate'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block mt-3'
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className='form-group'>
          <div
            className={
              successful ? 'alert alert-success' : 'alert alert-danger'
            }
            role='alert'
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
