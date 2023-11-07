import { useState } from 'react';
import InputArea from '../../components/todo/InputArea';
import TodoItem from '../../components/todo/TodoItem';

export default function Todo() {
  const [todoItems, setTodoItems] = useState(['Buy Milk']);
  const [inputValue, setInputValue] = useState('');

  function handleAddItem(e) {
    e.preventDefault();

    inputValue.trim() !== '' &&
      setTodoItems((prevValue) => {
        return [...prevValue, inputValue];
      });
    setInputValue('');
  }

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleDeleteItem(e) {
    const id = parseInt(e.target.id.split('-')[1]);
    setTodoItems(
      todoItems.filter((item, idx) => {
        return idx !== id;
      })
    );
  }

  return (
    <div>
      <h1>Todo List</h1>
      <InputArea
        inputValue={inputValue}
        inputChange={handleInput}
        addItem={handleAddItem}
      />
      <div>
        {todoItems.map((todoDetails, index) => (
          <TodoItem
            key={`todo-${index}`}
            todo={todoDetails}
            id={`todo-${index}`}
            deleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}
