import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

/**
 * It's a React component that displays a timer that starts at a configurable time and updates every
 * second
 * @returns A React component that displays the time.
 */
const TimeTracker = ({ config, onChange }) => {

  let startTime = config.startTime
  let start = moment().add(startTime, 'm')

  return (
    <label >
      <Moment date={start} format="hh:mm:ss" durationFromNow interval={1000} onChange={onChange} />
    </label>
  );

};

export default TimeTracker;