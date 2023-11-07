const Input = ({ type, placeholder, handleChange, inputValue, name }) => {
  return (
    <input
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      aria-label={placeholder}
      value={inputValue}
      name={name}
    />
  );
};

export default Input;
