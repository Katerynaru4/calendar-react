import React, { useState, useEffect } from 'react';
import './redLine.scss';

const RedLine = () => {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => setFakeCurrentDate(new Date()), 60000);
    return clearTimeout(timeout);
  }, [fakeCurrentDate]);

  return (
    <span
      className="calendar__red-line"
      style={{ top: `${new Date().getMinutes() + 60}px` }}
    ></span>
  );
};

export default RedLine;
