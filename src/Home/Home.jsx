import React, { useState } from "react";
import Calendar from 'react-calendar';
import Modal from '@material-ui/core/Modal';

import Day  from "../Day";

import "./home.scss";
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(null);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDayClick = value => {
    const date = (new Date(value)).getDate();
    setDate(date);
    setModalOpen(true);
  }

  return (
    <div className="aoc-home">
      <Calendar
        calendarType="US"
        minDate={new Date("Dec 1, 2020")}
        maxDate={new Date("Dec 25, 2020")}
        onClickDay={handleDayClick}
      />
      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <Day date={date} handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default Home;
