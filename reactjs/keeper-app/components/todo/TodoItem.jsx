const TodoItem = ({ todo, deleteItem, id }) => {
  return (
    <p onClick={deleteItem} id={id}>
      {parseInt(id.split('-')[1]) + 1} {todo}
    </p>
  );
};

export default TodoItem;
