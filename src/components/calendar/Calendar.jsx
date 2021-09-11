import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({
  weekDates,
  setIsPopupOpen,
  setEventIdToDelete,
  events,
  setPopupCoordinates,
}) => {

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            setIsPopupOpen={setIsPopupOpen}
            setEventIdToDelete={setEventIdToDelete}
            events={events}
            setPopupCoordinates={setPopupCoordinates}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  events: PropTypes.array,
  setPopupCoordinates: PropTypes.func.isRequired,
};

export default Calendar;
