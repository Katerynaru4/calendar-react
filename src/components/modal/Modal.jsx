import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createEvent } from '../../gateway/events.js';
import './modal.scss';

const Modal = ({ onOpenModal, setToUpdateEvents }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  const eventData = {
    title,
    description,
    dateFrom: new Date(`${date}T${startTime}`),
    dateTo: new Date(`${date}T${endTime}`),
  };

  const onCreateEvent = () => {
    createEvent(eventData).then((res) => {
      if (res.ok) {
        setToUpdateEvents(true);
        onOpenModal(false);
      }
    });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={() => onOpenModal(false)}
          >
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={(e) => setEndTime(e.target.value)}
                value={endTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={(e) => {
                e.preventDefault();
                onCreateEvent();
              }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  setToUpdateEvents: PropTypes.func.isRequired,
};

export default Modal;
