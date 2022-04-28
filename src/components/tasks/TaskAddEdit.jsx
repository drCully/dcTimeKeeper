import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useAddTaskMutation,
  useTaskQuery,
  useUpdateTaskMutation,
} from '../../services/timekeeperApi';

const initialState = {
  taskname: '',
  active: true,
};

const TaskAddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { taskname, active } = formValue;
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useTaskQuery(id);

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
    if (!taskname) {
      toast.error('Please provide value into each input field');
    } else {
      if (!editMode) {
        await addTask(formValue);
        navigate('/tasks');
        toast.success('Task Added Successfully');
      } else {
        await updateTask(formValue);
        setEditMode(false);
        navigate('/tasks');
        toast.success('Task Updated Successfully');
      }
    }
  };

  const handleCancel = (event) => {
    setEditMode(false);
    setFormValue({ ...initialState });
    navigate('/tasks');
  };

  return (
    <div className='col-md-4 m-auto'>
      <form className='ms-3' onSubmit={handleSubmit}>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='taskname'
            name='taskname'
            value={taskname}
            onChange={handleInputChange}
          />
          <label htmlFor='taskname'>Task Name</label>
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

export default TaskAddEdit;
