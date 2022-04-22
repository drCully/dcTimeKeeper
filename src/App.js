import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';

import Time from './components/time/Timesheets';
import TimeAddEdit from './components/time/TimeAddEdit';
import Billing from './components/billing/Billing';
import Clients from './components/clients/Clients';
import ClientAddEdit from './components/clients/ClientAddEdit';
import ClientInfo from './components/clients/ClientInfo';
import Users from './components/users/Users';
import UserAddEdit from './components/users/UserAddEdit';
import UserInfo from './components/users/UserInfo';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import { logout } from './slices/auth';

import EventBus from './common/EventBus';

const App = () => {
  const [billingUser, setbillingUser] = useState(false);
  const [adminUser, setadminUser] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setbillingUser(currentUser.roles.includes('ROLE_BILLING'));
      setadminUser(currentUser.roles.includes('ROLE_ADMIN'));
    } else {
      setbillingUser(false);
      setadminUser(false);
    }

    EventBus.on('logout', () => {
      logOut();
    });

    return () => {
      EventBus.remove('logout');
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light shadow rounded bg-white'>
          <div className='container-fluid'>
            <Link to={'/'} className='navbar-brand'>
              <img src='tk-logo.png' height='30' alt='' loading='lazy' />
              <span className='ms-2 me-5'>
                Time<b>Keeper</b>
              </span>
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarContent'
              aria-controls='navbarContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarContent'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                {currentUser && (
                  <React.Fragment>
                    <li className='nav-item'>
                      <NavLink to={'/time'} className='nav-link'>
                        Time
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}

                {billingUser && (
                  <li className='nav-item'>
                    <NavLink to={'/billing'} className='nav-link'>
                      Billing
                    </NavLink>
                  </li>
                )}

                {adminUser && (
                  <React.Fragment>
                    <li className='nav-item'>
                      <NavLink to={'/clients'} className='nav-link'>
                        Clients
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink to={'/users'} className='nav-link'>
                        Users
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
              </ul>

              {currentUser ? (
                <div className='navbar-nav ms-auto'>
                  <li className='nav-item dropdown'>
                    <Link
                      className='nav-link dropdown-toggle'
                      to={'#'}
                      id='navbarDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <FaUserCircle className='fs-4 me-2' />
                      {currentUser.username}
                    </Link>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='navbarDropdown'
                    >
                      <li>
                        <Link to={'/profile'} className='dropdown-item'>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item' to={'#'}>
                          Preferences
                        </Link>
                      </li>
                      <li>
                        <hr className='dropdown-divider' />
                      </li>
                      <li>
                        <a
                          href='/login'
                          className='dropdown-item'
                          onClick={logOut}
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <div className='navbar-nav ms-auto'>
                  <li className='nav-item'>
                    <Link
                      to={'/login'}
                      className='btn btn-outline-secondary btn-sm mt-2'
                      role='button'
                    >
                      Log In
                    </Link>
                  </li>
                  {/* <li className='nav-item'>
                    <Link
                      to={'/register'}
                      className='btn btn-outline-secondary btn-sm ms-2 mt-2'
                      role='button'
                    >
                      Sign Up
                    </Link>
                  </li> */}
                </div>
              )}
            </div>
          </div>
        </nav>

        <ToastContainer autoClose={2000} />
        <div className='container my-4 '>
          <div className='card p-2 mb-5 border-1'>
            <div className='card-body'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/time' element={<Time />} />
                <Route path='/timeadd' element={<TimeAddEdit />} />
                <Route path='/timeedit/:id' element={<TimeAddEdit />} />
                <Route path='/billing' element={<Billing />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/clientadd' element={<ClientAddEdit />} />
                <Route path='/clientedit/:id' element={<ClientAddEdit />} />
                <Route path='/clientinfo/:id' element={<ClientInfo />} />
                <Route path='/users' element={<Users />} />
                <Route path='/useradd' element={<UserAddEdit />} />
                <Route path='/useredit/:id' element={<UserAddEdit />} />
                <Route path='/userinfo/:id' element={<UserInfo />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route exact path='/profile' element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
