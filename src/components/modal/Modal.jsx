import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createEvent } from '../../gateway/events.js';
import './modal.scss';

const isTimeGapCorrect = (start, end) =>
  end > start ? undefined : 'Start time should be less then end time.';

const isTimeGapWithinSixHours = (start, end) =>
  end - start < 21600000
    ? undefined
    : 'Event should last for less then 6 hours.';

const isEventTimeDivisibleQuarter = (start, end) =>
  start % 15 === 0 && end % 15 === 0
    ? undefined
    : 'The beginning of the event and the duration must be divisible by 15 minutes.';

const toValidate = (start, end) => {
  return [
    isTimeGapCorrect(start, end),
    isTimeGapWithinSixHours(start, end),
    isEventTimeDivisibleQuarter(start.getMinutes(), end.getMinutes()),
  ]
    .filter((el) => el)
    .map((el) => {
      return el;
    });
};

const Modal = ({
  onOpenModal,
  setToUpdateEvents,
  startTime,
  endTime,
  date,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onCreateEvent = () => {
    const eventData = {
      title,
      description,
      dateFrom: new Date(`${date}T${startTime}`),
      dateTo: new Date(`${date}T${endTime}`),
    };
    const errorMessages = toValidate(eventData.dateFrom, eventData.dateTo);

    if (errorMessages.length !== 0) {
      alert(errorMessages[0]);
    } else {
      createEvent(eventData).then((res) => {
        if (res.ok) {
          setToUpdateEvents(true);
          onOpenModal(false);
        }
      });
    }
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
          <form
            className="event-form"
            onSubmit={(e) => {
              e.preventDefault();
              onCreateEvent();
            }}
          >
            <input
              required
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className="event-form__time">
              <input
                required
                type="date"
                name="date"
                className="event-form__field"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <input
                required
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              />
              <span>-</span>
              <input
                required
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
            <button type="submit" className="event-form__submit-btn">
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
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  date: PropTypes.string,
};

export default Modal;
