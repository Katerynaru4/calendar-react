import React from 'react';
import PropTypes from 'prop-types';
import RedLine from '../redLine/RedLine';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataDay,
  dataHour,
  hourEvents,
  setIsPopupOpen,
  setEventIdToDelete,
  setPopupCoordinates,
}) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {new Date().getDate() === dataDay &&
      new Date().getHours() === dataHour + 1 ? (
        <RedLine />
      ) : null}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            setIsPopupOpen={setIsPopupOpen}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
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
  dataDay: PropTypes.number,
  dataHour: PropTypes.number,
  hourEvents: PropTypes.array,
  setIsPopupOpen: PropTypes.func.isRequired,
  setEventIdToDelete: PropTypes.func.isRequired,
  setPopupCoordinates: PropTypes.func.isRequired,
};

export default Hour;
