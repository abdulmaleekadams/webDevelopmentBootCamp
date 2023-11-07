import { useState } from 'react';
import styles from './time.module.css';

const Time = () => {
  const [time, setTime] = useState('00:00:00');

  const getTime = () => {
    const time = new Date().toTimeString().split(' ')[0];
    setTime(time);

    setInterval(getTime, 1000);
  };

  return (
    <div className={styles.timer}>
      
        <p>{time}</p>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
};

export default Time;
