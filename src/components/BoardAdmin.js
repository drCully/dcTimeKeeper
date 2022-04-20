import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';
import EventBus from '../common/EventBus';

const BoardAdmin = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      }
    );
  }, []);

  return (
    <div className='card p-3 m-3'>
      <div className='card-body'>
        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default BoardAdmin;
