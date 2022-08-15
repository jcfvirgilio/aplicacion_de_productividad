import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

/**
 * It's a React component that displays a timer that starts at a configurable time and updates every
 * second
 * @returns A React component that displays the time.
 */
const TimeTrackerCustom = ({ config, handlerChange }) => {

  let startTime = config.startTime
  let start = moment().add(startTime, 'm')

  return (

    <Moment date={start} format="hh:mm:ss" durationFromNow interval={1000} onChange={handlerChange} />

  );

};

export default TimeTrackerCustom;