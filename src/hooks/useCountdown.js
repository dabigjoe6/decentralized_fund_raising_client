import { useState, useEffect } from 'react';
import moment from 'moment';
import useInterval from './useInterval';

const useCountdown = (_timestamp) => {
  console.log('_timestamp');
  const end = moment(_timestamp);
  // const [timestamp, setTimestamp] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00:00');


  const updateCountdown = () => {
    console.log(end.format())
    const timeLeft = moment(end.diff(moment()));
    setFormattedTime(timeLeft.format('HH:mm:ss'))
  };

  // useEffect(() => {
  //   console.log('timestamp', timestamp);
  //   const _countdown = moment(timestamp).calendar()
  //   console.log('countdown', _countdown)
  //   setFormattedTime(_countdown);
  // }, [timestamp])

  useInterval(updateCountdown, 1000);

  return formattedTime;
};

export default useCountdown;