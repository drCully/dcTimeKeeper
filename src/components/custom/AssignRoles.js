const AssignRoles = (props) => {
  const items = props.items;
  const value = props.value;
  const [assignedRoles, setAssignedRoles] = props.functions;

  function handleOnClick(item) {
    if (!isItemInSelection(item)) {
      setAssignedRoles([...assignedRoles, item.id]);
    } else {
      let newAssignedRoles = assignedRoles.filter(
        (current) => current !== item.id
      );
      setAssignedRoles([...newAssignedRoles]);
    }
  }

  const isItemInSelection = (item) => {
    if (assignedRoles.includes(item.id)) {
      return true;
    }
    return false;
  };

  return (
    <div className='d-flex'>
      <ul className='list-group list-group-horizontal'>
        {items?.map((item) => (
          <li className='list-group-item border-0' key={item.id}>
            <input
              className='form-check-input me-2 m-auto'
              type='checkbox'
              value={value}
              onClick={() => handleOnClick(item)}
              onChange={props.onChange}
              checked={isItemInSelection(item)}
            ></input>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignRoles;
