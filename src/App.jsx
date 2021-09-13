import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import Popup from './components/popup/Popup.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { getEvents } from './gateway/events.js';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventStartTime, setEventStartTime] = useState(null);
  const [eventEndTime, setEventEndTime] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [popupCoordinates, setPopupCoordinates] = useState(null);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [toUpdateEvents, setToUpdateEvents] = useState(false);
  const [events, setEvents] = useState([]);

  const updateEvents = () => {
    getEvents().then((data) => {
      data.map((event) => {
        event.dateFrom = new Date(event.dateFrom);
        event.dateTo = new Date(event.dateTo);
        return event;
      });
      setEvents(data);
      setToUpdateEvents(false);
    });
  };

  useEffect(() => {
    updateEvents();
  }, [toUpdateEvents]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  return (
    <>
      <Header
        currentWeekStartDate={weekStartDate}
        setCurrentWeek={setWeekStartDate}
        onOpenModal={setIsModalOpen}
        setEventDate={setEventDate}
        setEventStartTime={setEventStartTime}
        setEventEndTime={setEventEndTime}
      />
      <Calendar
        weekDates={weekDates}
        setIsPopupOpen={setIsPopupOpen}
        setEventIdToDelete={setEventIdToDelete}
        events={events}
        setPopupCoordinates={setPopupCoordinates}
        onOpenModal={setIsModalOpen}
        setEventDate={setEventDate}
        setEventStartTime={setEventStartTime}
        setEventEndTime={setEventEndTime}
      />
      {isModalOpen && (
        <Modal
          onOpenModal={setIsModalOpen}
          setToUpdateEvents={setToUpdateEvents}
          startTime={eventStartTime}
          endTime={eventEndTime}
          date={eventDate}
          setEventDate={setEventDate}
          setEventStartTime={setEventStartTime}
          setEventEndTime={setEventEndTime}
        />
      )}
      {isPopupOpen && (
        <Popup
          setIsPopupOpen={setIsPopupOpen}
          eventIdToDelete={eventIdToDelete}
          popupCoordinates={popupCoordinates}
          setToUpdateEvents={setToUpdateEvents}
        />
      )}
    </>
  );
};

export default App;
