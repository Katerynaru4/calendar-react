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
      data.map((event) => {
        event.dateFrom = new Date(event.dateFrom);
        event.dateTo = new Date(event.dateTo);
        return event;
      });
      this.setState({
        ...this.state,
        events: data,
      });
    });
  }
  setNewState = (name, value) => {
    this.state[name] = value;
    this.setState({
      ...this.state,
    });
  };

  componentDidMount() {
    this.updateEvents();
  }
  componentDidUpdate() {
    if (this.state.toUpdateEvents) {
      this.updateEvents();
      this.setNewState('toUpdateEvents', false);
    }
  }

  render() {
    const {
      weekStartDate,
      isModalOpen,
      eventStartTime,
      eventEndTime,
      eventDate,
      isPopupOpen,
      popupCoordinates,
      eventIdToDelete,
      toUpdateEvents,
      events,
    } = this.state;

    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    return (
      <>
        <Header
          currentWeekStartDate={weekStartDate}
          setCurrentWeek={(value) => this.setNewState('weekStartDate', value)}
          onOpenModal={(value) => this.setNewState('isModalOpen', value)}
        />
        <Calendar
          weekDates={weekDates}
          setIsPopupOpen={(value) => this.setNewState('isPopupOpen', value)}
          setEventIdToDelete={(value) =>
            this.setNewState('eventIdToDelete', value)
          }
          events={events}
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
        {isModalOpen && (
          <Modal
            onOpenModal={(value) => this.setNewState('isModalOpen', value)}
            setToUpdateEvents={(value) =>
              this.setNewState('toUpdateEvents', value)
            }
            startTime={eventStartTime}
            endTime={eventEndTime}
            date={eventDate}
            setDate={(value) => this.setNewState('eventDate', value)}
            setStartTime={(value) => this.setNewState('eventStartTime', value)}
            setEndTime={(value) => this.setNewState('eventEndTime', value)}
          />
        )}
        {isPopupOpen && (
          <Popup
            setIsPopupOpen={(value) => this.setNewState('isPopupOpen', value)}
            eventIdToDelete={eventIdToDelete}
            popupCoordinates={popupCoordinates}
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
