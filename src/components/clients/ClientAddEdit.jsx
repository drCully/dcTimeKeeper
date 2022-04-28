import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useAddClientMutation,
  useClientQuery,
  useUpdateClientMutation,
} from '../../services/timekeeperApi';

const initialState = {
  clientname: '',
  addr1: '',
  addr2: '',
  addr3: '',
  contact: '',
  email: '',
  active: true,
};

const ClientAddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();

  const { clientname, addr1, addr2, addr3, contact, email, active } = formValue;
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useClientQuery(id);

  useEffect(() => {
    if (error && id) {
      toast.error('Something went wrong');
    }
  }, [error, id]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!clientname && !addr1 && !addr2 && !addr3) {
      toast.error('Please provide value into each input field');
    } else {
      if (!editMode) {
        await addClient(formValue);
        navigate('/clients');
        toast.success('Client Added Successfully');
      } else {
        await updateClient(formValue);
        setEditMode(false);
        navigate('/clients');
        toast.success('Client Updated Successfully');
      }
    }
  };

  const handleCancel = (event) => {
    setEditMode(false);
    setFormValue({ ...initialState });
    navigate('/clients');
  };

  return (
    <div className='col-md-4 m-auto'>
      <form className='ms-3' onSubmit={handleSubmit}>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='clientname'
            name='clientname'
            value={clientname}
            onChange={handleInputChange}
          />
          <label htmlFor='clientname'>Client Name</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='addr1'
            name='addr1'
            value={addr1}
            onChange={handleInputChange}
          />
          <label htmlFor='addr1'>Address Line 1</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='addr2'
            name='addr2'
            value={addr2}
            onChange={handleInputChange}
          />
          <label htmlFor='addr2'>Address Line 2</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='addr3'
            name='addr3'
            value={addr3}
            onChange={handleInputChange}
          />
          <label htmlFor='addr3'>Address Line 3</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='contact'
            name='contact'
            value={contact}
            onChange={handleInputChange}
          />
          <label htmlFor='contact'>Contact Name</label>
        </div>{' '}
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>Contact Email</label>
        </div>
        <div className='form-check mb-3'>
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
      </form>
    </div>
  );
};

export default ClientAddEdit;
