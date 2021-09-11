import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getDisplayedMonth } from '../../utils/dateUtils.js';
import './header.scss';

const Header = ({ setCurrentWeek, currentWeek, onOpenModal }) => {
  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => onOpenModal(true)}
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
              new Date(moment(currentWeek, 'DD-MM-YYYY').add(-7, 'days'))
            )
          }
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() =>
            setCurrentWeek(
              new Date(moment(currentWeek, 'DD-MM-YYYY').add(7, 'days'))
            )
          }
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getDisplayedMonth(new Date(currentWeek))}
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  setCurrentWeek: PropTypes.func.isRequired,
  currentWeek: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Header;
