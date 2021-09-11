import React from 'react';
import PropTypes from 'prop-types';
import './popup.scss';
import { deleteEvent } from '../../gateway/events.js';

const Popup = ({
  setIsPopupOpen,
  eventIdToDelete,
  popupCoordinates,
  setToUpdateEvents,
}) => {
  const onDeleteEvent = () => {
    setIsPopupOpen(false);
    deleteEvent(eventIdToDelete).then((res) => {
      if (res.ok) {
        setToUpdateEvents(true);
      }
    });
  };

  return (
    <div className="popup overlay">
      <div className="popup__overlay"></div>
      <div
        className="popup__content"
        style={{
          top: `${popupCoordinates.y}px`,
          left: `${popupCoordinates.x}px`,
        }}
      >
        <i className="material-icons">delete</i>
        <button className="delete-event-btn" onClick={onDeleteEvent}>
          Delete
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  setIsPopupOpen: PropTypes.func.isRequired,
  eventIdToDelete: PropTypes.string,
  popupCoordinates: PropTypes.object,
  setToUpdateEvents: PropTypes.func.isRequired,
};

export default Popup;
