import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useClientQuery } from '../../services/timekeeperApi';

const ClientInfo = () => {
  const { id } = useParams();
  const { data, error } = useClientQuery(id);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);
  return (
    <div className='col-md-6 m-auto'>
      <div className='card'>
        <div className='card-header'>
          <h5>Client Detail</h5>
        </div>
        <div className='container m-3'>
          <strong>Client Name: </strong>
          <span>{data && data.clientname}</span>
          <br />
          <br />
          <strong>Address Line 1: </strong>
          <span>{data && data.addr1}</span>
          <br />
          <br />
          <strong>Address Line 2: </strong>
          <span>{data && data.addr2}</span>
          <br />
          <br />
          <strong>Address Line 3: </strong>
          <span>{data && data.addr3}</span>
          <br />
          <br />
          <strong>Contact Name: </strong>
          <span>{data && data.contact}</span>
          <br />
          <br />
          <strong>Contact Email: </strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <Link to='/clients'>
            <button className='btn btn-success float-end me-5'>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
