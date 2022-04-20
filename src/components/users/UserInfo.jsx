import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserQuery } from '../../services/timekeeperApi';

const UserInfo = () => {
  const { id } = useParams();
  const { data, error } = useUserQuery(id);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);

  return (
    <div className='col-md-6 m-auto'>
      <div className='card'>
        <div className='card-header'>
          <h5>User Detail</h5>
        </div>
        <div className='container m-3'>
          <strong>User Name: </strong>
          <span>{data && data.username}</span>
          <br />
          <br />
          <strong>First Name: </strong>
          <span>{data && data.firstname}</span>
          <br />
          <br />
          <strong>Last Name: </strong>
          <span>{data && data.lastname}</span>
          <br />
          <br />
          <strong>Initials: </strong>
          <span>{data && data.initials}</span>
          <br />
          <br />
          <strong>Password: </strong>
          <span>{data && data.password}</span>
          <br />
          <br />
          <strong>Rate: </strong>
          <span>{data && data.rate}</span>
          <br />
          <br />
          <Link to='/users'>
            <button className='btn btn-success float-end me-5'>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
