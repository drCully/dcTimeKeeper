import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import {
  useClientLookupQuery,
  useTaskLookupQuery,
  useAddTimeMutation,
  useTimeQuery,
  useUpdateTimeMutation,
} from '../../services/timekeeperApi';

const TimeAddEdit = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const initialState = {
    date: format(new Date(), 'yyyy-MM-dd'),
    timekeeper: currentUser.id,
    client: '',
    task: '',
    hours: 0.5,
    rate: currentUser.rate,
    description: '',
    billable: true,
    billed: false,
  };

  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addTime] = useAddTimeMutation();
  const [updateTime] = useUpdateTimeMutation();

  const {
    date,
    timekeeper,
    client,
    task,
    hours,
    rate,
    description,
    billable,
    billed,
  } = formValue;
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useTimeQuery(id);

  const { data: clientlookup } = useClientLookupQuery();
  const { data: tasklookup } = useTaskLookupQuery();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);

  const handleInputChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date && !timekeeper && !client && !description && !rate) {
      toast.error('Please provide value into each input field');
    } else {
      if (!editMode) {
        await addTime(formValue);
        navigate('/time');
        toast.success('Time record Added Successfully');
      } else {
        await updateTime(formValue);
        setEditMode(false);
        navigate('/time');
        toast.success('Time record Updated Successfully');
      }
    }
  };

  const handleCancel = (event) => {
    setEditMode(false);
    setFormValue({ ...initialState });
    navigate('/time');
  };

  return (
    <div className='col-md-7 m-auto'>
      <h5>{editMode ? 'Edit Time' : 'Add Time'}</h5>
      <form className='row g-3 ms-3' onSubmit={handleSubmit}>
        <div className='col-md-4'>
          <label htmlFor='date'>Date</label>
          <input
            type='Date'
            className='form-control'
            id='date'
            name='date'
            value={date}
            onChange={handleInputChange}
          />
        </div>
        <input
          type='hidden'
          id='timekeeper'
          name='timekeeper'
          value={timekeeper}
        />
        <div className='col-md-6'>
          <label htmlFor='client'>Client</label>
          <select
            className='form-select'
            id='client'
            name='client'
            value={client}
            onChange={handleInputChange}
          >
            <option value=''> -- Select a Client -- </option>
            {clientlookup?.map((client) => (
              <option key={client._id} value={client._id}>
                {client.clientname}
              </option>
            ))}
          </select>
        </div>
        <div className='col-md-4'>
          <label htmlFor='task'>Task</label>
          <select
            className='form-select'
            id='task'
            name='task'
            value={task}
            onChange={handleInputChange}
          >
            <option value=''> -- Select a task -- </option>
            {tasklookup?.map((task) => (
              <option key={task._id} value={task._id}>
                {task.taskname}
              </option>
            ))}
          </select>
        </div>
        <div className='col-md-2'>
          <label htmlFor='hours'>Hours</label>
          <input
            type='number'
            className='form-control'
            id='hours'
            name='hours'
            value={hours}
            onChange={handleInputChange}
          />
        </div>
        <div className='row'>
          <div className='col'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='form-control'
              rows='2'
              id='description'
              name='description'
              value={description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <input type='hidden' id='rate' name='rate' value={rate} />
        <input type='hidden' id='billable' name='billable' value={billable} />
        <input type='hidden' id='billed' name='billed' value={billed} />

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

export default TimeAddEdit;
