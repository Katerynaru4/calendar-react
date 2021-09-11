import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import './week.scss';

class Week extends Component {
  render() {
    const {
      weekDates,
      setIsPopupOpen,
      setEventIdToDelete,
      setPopupCoordinates,
      events,
    } = this.props;
    return (
      <div className="calendar__week">
        {weekDates.map((dayStart) => {
          const dayEnd = new Date(dayStart.getTime()).setHours(
            dayStart.getHours() + 24
          );

          //getting all events from the day we will render
          const dayEvents = events.filter(
            (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
          );

          return (
            <Day
              key={dayStart.getDate()}
              dataDay={dayStart.getDate()}
              dayEvents={dayEvents}
              setIsPopupOpen={setIsPopupOpen}
              setEventIdToDelete={setEventIdToDelete}
              setPopupCoordinates={setPopupCoordinates}
            />
          );
        })}
      </div>
    );
  }
}

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
};

export default Week;
