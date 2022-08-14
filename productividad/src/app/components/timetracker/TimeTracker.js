import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const TimeTracker = ({ config, onChange }) => {

  let startTime = config.startTime
  let start = moment().add(startTime, 's')

  return (
    <label >
      <Moment date={start} format="hh:mm:ss" durationFromNow interval={1000} onChange={onChange} />
    </label>
  );

};

export default TimeTracker;