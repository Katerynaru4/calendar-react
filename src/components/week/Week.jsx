import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day.jsx';
import './week.scss';

const Week = ({
  weekDates,
  setIsPopupOpen,
  setEventIdToDelete,
  setPopupCoordinates,
  events,
  onOpenModal,
  setEventStartTime,
  setEventEndTime,
  setEventDate,
}) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime());
        dayEnd.setHours(dayStart.getHours() + 24);
        // getting all events from the day we will render
        const dayEvents = events.filter((event) => {
          /* console.log(
            event.dateFrom,
            dayStart.toISOString(),
            event.dateFrom > dayStart.toISOString()
          );  */
          return (
            event.dateFrom > dayStart.toISOString() &&
            event.dateTo < dayEnd.toISOString()
          );
        });

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setIsPopupOpen={setIsPopupOpen}
            setEventIdToDelete={setEventIdToDelete}
            setPopupCoordinates={setPopupCoordinates}
            onOpenModal={onOpenModal}
            setEventStartTime={setEventStartTime}
            setEventEndTime={setEventEndTime}
            setEventDate={setEventDate}
            weekDay={weekDates[0]}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
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

export default Week;
