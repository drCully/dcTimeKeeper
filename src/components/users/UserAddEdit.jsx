import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssignRoles from '../custom/AssignRoles';

import { toast } from 'react-toastify';
import {
  useAddUserMutation,
  useUserQuery,
  useUpdateUserMutation,
  useRolesQuery,
} from '../../services/timekeeperApi';

const initialState = {
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  initials: '',
  password: '',
  rate: 150,
  roles: [],
  active: true,
};

const UserAddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [assignedRoles, setAssignedRoles] = useState([]);
  const { data: rolesList } = useRolesQuery();

  const {
    username,
    firstname,
    lastname,
    initials,
    password,
    rate,
    roles,
    active,
  } = formValue;

  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useUserQuery(id);

  useEffect(() => {
    if (error && id) {
      toast.error('Something went wrong');
    }
  }, [id, error]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
        setAssignedRoles(data.roles);
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  useEffect(() => {
    setFormValue({ ...formValue, roles: assignedRoles });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedRoles]);

  const handleInputChange = (event) => {
    let target = event.target;
    if (target.name) {
      let name = target.name;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      setFormValue({ ...formValue, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username && !password) {
      toast.error('Please provide value into each input field');
    } else {
      if (!editMode) {
        await addUser(formValue);
        navigate('/users');
        toast.success('User Added Successfully');
      } else {
        await updateUser(formValue);
        setEditMode(false);
        navigate('/users');
        toast.success('User Updated Successfully');
      }
    }
  };

  const handleCancel = (event) => {
    setEditMode(false);
    setFormValue({ ...initialState });
    navigate('/users');
  };

  return (
    <div className='col-md-7 m-auto'>
      <h4>{editMode ? 'Edit User' : 'Add New User'}</h4>
      <form className='row g-3 ms-3' onSubmit={handleSubmit}>
        <div className='col-md-4'>
          <label htmlFor='username'>User Name</label>
          <input
            type='text'
            className='form-control'
            id='username'
            name='username'
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-md-5'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            className='form-control'
            id='passwordInput'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className='col mt-5 ms-4'>
          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='active'
              name='active'
              checked={active}
              onChange={handleInputChange}
            />
            <label htmlFor='active'>Active?</label>
          </div>
        </div>
        <div className='col-md-5'>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstname'
            name='firstname'
            value={firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-md-5'>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastname'
            name='lastname'
            value={lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-md-2'>
          <label htmlFor='initials'>Initials</label>
          <input
            type='text'
            className='form-control'
            id='initials'
            name='initials'
            value={initials}
            onChange={handleInputChange}
          />
        </div>

        <div className='col-md-3'>
          <label htmlFor='rate'>Bill Rate</label>
          <input
            type='number'
            step='any'
            className='form-control text-end'
            id='rate'
            name='rate'
            value={rate}
            onChange={handleInputChange}
          />
        </div>
        <div className='col'>
          <label htmlFor='roles'>Roles</label>
          <AssignRoles
            className='form-control'
            type='checkbox'
            id='roles'
            name='roles'
            value={roles}
            functions={[assignedRoles, setAssignedRoles]}
            items={rolesList?.map((item) => ({
              id: item._id,
              value: item.name,
            }))}
            onChange={handleInputChange}
          />
        </div>

        <div className='col-12 d-flex justify-content-end'>
          <input
            className='btn btn-success me-4'
            type='submit'
            value={editMode ? 'Update' : 'Save'}
          />
          <button
            className='btn btn-secondary'
            type='button'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAddEdit;
