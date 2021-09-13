import React from 'react';
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
  onOpenModal,
  setEventStartTime,
  setEventEndTime,
  setEventDate,
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
            onOpenModal={onOpenModal}
            setEventStartTime={setEventStartTime}
            setEventEndTime={setEventEndTime}
            setEventDate={setEventDate}
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
  events: PropTypes.array.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setEventStartTime: PropTypes.func.isRequired,
  setEventEndTime: PropTypes.func.isRequired,
  setEventDate: PropTypes.func.isRequired,
};

export default Calendar;
