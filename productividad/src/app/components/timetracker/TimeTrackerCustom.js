import React, { useEffect, useState } from "react";


let today = new Date();

function TimeTrackerCustom({ minutes }) {

  const newToday = new Date();
  const [minutesConfig, setMinutesConfig] = useState(minutes)


  const calculateTimeLeft = () => {

    newToday.setMinutes(today.getMinutes() + minutesConfig);

    const newDiference = newToday - new Date()

    let timeLeft = {};


    if (newDiference > 0) {
      timeLeft = {
        days: Math.floor(newDiference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((newDiference / (1000 * 60 * 60)) % 24),
        m: Math.floor((newDiference / 1000 / 60) % 60),
        s: Math.floor((newDiference / 1000) % 60),
      };
    }

    return timeLeft;

  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {

    setMinutesConfig(minutes)

    setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

  }, [minutesConfig]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={timeLeft}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <label >
      {timerComponents.length ? timerComponents : "Tiempo Finalizado"}
    </label>
  );
}

export default TimeTrackerCustom;
