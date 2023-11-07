import { useState } from 'react';

import styles from './counter.module.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    setCount(count - 1);
  };
  return (
    <div className={styles.counter}>
      <button onClick={decrementCount}>-</button> <p>{count}</p>
      <button onClick={incrementCount}>+</button>
    </div>
  );
};

export default Counter;
