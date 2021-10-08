import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RedLine from '../red-line/RedLine.jsx';
import Event from '../event/Event.jsx';
import { formatMins, getWeekStartDate } from '../../utils/dateUtils';

const Hour = ({
  dataDay,
  dataHour,
  hourEvents,
  setIsPopupOpen,
  setEventIdToDelete,
  setPopupCoordinates,
  onOpenModal,
  setEventStartTime,
  setEventEndTime,
  setEventDate,
  weekDay,
}) => {
  const openModalBySlot = () => {
    onOpenModal(true);
    setEventDate(moment(weekDay.setDate(dataDay)).format('YYYY-MM-DD'));
    setEventStartTime(`${dataHour.toString().padStart(2, 0)}:00`);
    setEventEndTime(`${(dataHour + 1).toString().padStart(2, 0)}:00`);
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={openModalBySlot}
    >
      {/* check if it's the hour slot with current time */}
      {getWeekStartDate(weekDay) - getWeekStartDate(new Date()) === 0 &&
      new Date().getDate() === dataDay &&
      new Date().getHours() === dataHour + 1 ? (
        <RedLine />
      ) : null}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            setIsPopupOpen={setIsPopupOpen}
            // calculating event height = duration of event in minutes
            height={(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60)}
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            setEventIdToDelete={setEventIdToDelete}
            setPopupCoordinates={setPopupCoordinates}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setEventStartTime: PropTypes.func.isRequired,
  setEventEndTime: PropTypes.func.isRequired,
  setEventDate: PropTypes.func.isRequired,
  weekDay: PropTypes.object.isRequired,
};

export default Hour;
