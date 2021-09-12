import React from 'react';
import PropTypes from 'prop-types';
import './event.scss';

const Event = ({
  height,
  marginTop,
  title,
  time,
  id,
  setIsPopupOpen,
  setEventIdToDelete,
  setPopupCoordinates,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const openPopup = (id, x, y) => {
    setIsPopupOpen(true);
    setEventIdToDelete(id.toString());
    setPopupCoordinates({ x: x, y: y });
  };

  return (
    <div
      style={eventStyle}
      className="event"
      onClick={(e) => {
        e.stopPropagation()
        openPopup(id, e.clientX, e.clientY);
      }}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number,
  marginTop: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
};

export default Event;
