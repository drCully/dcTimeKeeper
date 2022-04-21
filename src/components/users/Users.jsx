import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useUsersQuery,
  useDeleteUserMutation,
} from '../../services/timekeeperApi';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

const Users = () => {
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const pageSizes = [10, 15, 20];

  const {
    data: users,
    isLoading,
    error,
  } = useUsersQuery(`username=${searchUser}&page=${page - 1}&size=${perPage}`);

  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPerPage(event.target.value);
    setPage(1);
  };

  const onChangeSearchUser = (event) => {
    const searchUser = event.target.value;
    setSearchUser(searchUser);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete user account? ')) {
      await deleteUser(id);
      toast.success('User Deleted Successfully');
    }
  };

  return (
    <div>
      <div className='col-md-8 m-auto'>
        <div className='d-flex'>
          <div className='col-md-2 me-auto'>
            <h4>Users</h4>
          </div>
          <div className='input-group me-4'>
            <input
              type='search'
              className='form-control'
              placeholder='Search by user name'
              value={searchUser}
              onChange={onChangeSearchUser}
            />
            <button
              className='btn btn-outline-secondary'
              type='button'
              //onClick={}
            >
              Search
            </button>
          </div>
          <Link
            to={'/useradd'}
            className='btn btn-primary text-nowrap'
            style={{ width: '10rem' }}
          >
            Add New
          </Link>
        </div>

        <div className='m-2 list'></div>
        <table className='table table-sm table-striped table-hover'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Active?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      checked={item.active}
                      disabled
                    />
                  </td>
                  <td>
                    <Link to={`/useredit/${item._id}`}>
                      <FaRegEdit className='text-success fs-6 me-4' />
                    </Link>
                    <FaRegTrashAlt
                      className='text-danger fs-6 me-4'
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className='d-flex'>
          <div className='col-md-3 ms-3 me-auto'>
            {'Items per Page: '}
            <select onChange={handlePageSizeChange} value={perPage}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {users.totalPages > 1 && (
            <Pagination
              className='me-5'
              count={users?.totalPages}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant='outlined'
              shape='rounded'
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
