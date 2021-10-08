import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getDisplayedMonth } from '../../utils/dateUtils';
import './header.scss';

const Header = ({
  setCurrentWeek,
  currentWeekStartDate,
  onOpenModal,
  setEventDate,
  setEventStartTime,
  setEventEndTime,
}) => {
  const openModalByCreateEventBtn = () => {
    onOpenModal(true);
    setEventDate(moment().format('YYYY-MM-DD'));
    setEventStartTime(moment().format('HH:00'));
    setEventEndTime(moment().format('HH:30'));
  };

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={openModalByCreateEventBtn}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => setCurrentWeek(new Date())}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() =>
            setCurrentWeek(
              new Date(
                moment(currentWeekStartDate, 'DD-MM-YYYY').add(-7, 'days')
              )
            )
          }
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() =>
            setCurrentWeek(
              new Date(
                moment(currentWeekStartDate, 'DD-MM-YYYY').add(7, 'days')
              )
            )
          }
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getDisplayedMonth(new Date(currentWeekStartDate))}
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  setCurrentWeek: PropTypes.func.isRequired,
  currentWeekStartDate: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  setEventDate: PropTypes.func.isRequired,
  setEventStartTime: PropTypes.func.isRequired,
  setEventEndTime: PropTypes.func.isRequired,
};

export default Header;
