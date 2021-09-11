import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import './day.scss';

const Day = ({
  dataDay,
  dayEvents,
  setIsPopupOpen,
  setEventIdToDelete,
  setPopupCoordinates,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            setIsPopupOpen={setIsPopupOpen}
            setEventIdToDelete={setEventIdToDelete}
            setPopupCoordinates={setPopupCoordinates}
            dataDay={dataDay}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number,
  dayEvents: PropTypes.array,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
};

export default Day;
