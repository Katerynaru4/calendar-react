import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour.jsx';
import './day.scss';

const Day = ({
  dataDay,
  dayEvents,
  setIsPopupOpen,
  setEventIdToDelete,
  setPopupCoordinates,
  onOpenModal,
  setEventStartTime,
  setEventEndTime,
  setEventDate,
  weekDay,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        // getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
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
            onOpenModal={onOpenModal}
            setEventStartTime={setEventStartTime}
            setEventEndTime={setEventEndTime}
            setEventDate={setEventDate}
            weekDay={weekDay}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setEventStartTime: PropTypes.func.isRequired,
  setEventEndTime: PropTypes.func.isRequired,
  setEventDate: PropTypes.func.isRequired,
  weekDay: PropTypes.object.isRequired,
};

export default Day;
