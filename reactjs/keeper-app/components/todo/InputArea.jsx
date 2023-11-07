const InputArea = ({ inputChange, addItem, inputValue }) => {
  return (
    <form>
      <input
        type='text'
        placeholder='What are you doing today?'
        onChange={inputChange}
        value={inputValue}
      />
      <button type="submit" onClick={addItem}>Add</button>
    </form>
  );
};

export default InputArea;
