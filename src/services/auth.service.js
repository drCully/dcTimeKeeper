import axios from 'axios';

const API_URL = 'https://boiling-river-55915.herokuapp.com/api/auth/';
//const API_URL = process.env.REACT_APP_API_URL + 'auth/';

const register = (
  username,
  password,
  firstname,
  lastname,
  initials,
  rate,
  active
) => {
  return axios.post(API_URL + 'signup', {
    username,
    password,
    firstname,
    lastname,
    initials,
    rate,
    active,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
