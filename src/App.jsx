import React, { Component } from 'react';
import moment from 'moment';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import Popup from './components/popup/Popup.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { getEvents } from './gateway/events.js';
import './common.scss';

class App extends Component {
  state = {
    weekStartDate: new Date(),
    isModalOpen: false,
    eventStartTime: moment().format('HH:00'),
    eventEndTime: moment().format('HH:15'),
    eventDate: moment().format('YYYY-MM-DD'),
    isPopupOpen: false,
    popupCoordinates: null,
    eventIdToDelete: null,
    toUpdateEvents: false,
    events: [],
  };
  updateEvents() {
    getEvents().then((data) => {
      data.forEach((event) => {
        event.dateFrom = new Date(event.dateFrom);
        event.dateTo = new Date(event.dateTo);
      });
      this.setState({
        ...this.state,
        events: data,
      });
    });
  }

  componentDidMount() {
    this.updateEvents();
  }
  componentDidUpdate() {
    if (this.state.toUpdateEvents) {
      this.updateEvents();
      this.setNewState('toUpdateEvents', false);
    }
  }

  setNewState = (name, value) => {
    this.state[name] = value;
    this.setState({
      ...this.state,
    });
  };

  render() {
    const weekDates = generateWeekRange(
      getWeekStartDate(this.state.weekStartDate)
    );

    return (
      <>
        <Header
          currentWeek={this.state.weekStartDate}
          setCurrentWeek={(value) => this.setNewState('weekStartDate', value)}
          onOpenModal={(value) => this.setNewState('isModalOpen', value)}
        />
        <Calendar
          weekDates={weekDates}
          setIsPopupOpen={(value) => this.setNewState('isPopupOpen', value)}
          setEventIdToDelete={(value) =>
            this.setNewState('eventIdToDelete', value)
          }
          events={this.state.events}
          setPopupCoordinates={(value) =>
            this.setNewState('popupCoordinates', value)
          }
          onOpenModal={(value) => this.setNewState('isModalOpen', value)}
          setEventStartTime={(value) =>
            this.setNewState('eventStartTime', value)
          }
          setEventEndTime={(value) => this.setNewState('eventEndTime', value)}
          setEventDate={(value) => this.setNewState('eventDate', value)}
        />
        {this.state.isModalOpen && (
          <Modal
            onOpenModal={(value) => this.setNewState('isModalOpen', value)}
            setToUpdateEvents={(value) =>
              this.setNewState('toUpdateEvents', value)
            }
            startTime={this.state.eventStartTime}
            endTime={this.state.eventEndTime}
            date={this.state.eventDate}
          />
        )}
        {this.state.isPopupOpen && (
          <Popup
            setIsPopupOpen={(value) => this.setNewState('isPopupOpen', value)}
            eventIdToDelete={this.state.eventIdToDelete}
            popupCoordinates={this.state.popupCoordinates}
            setToUpdateEvents={(value) =>
              this.setNewState('toUpdateEvents', value)
            }
          />
        )}
      </>
    );
  }
}

export default App;
