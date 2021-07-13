import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appointmentActions from "../appointmentActions";

const CalendarComponent = ({ history, location, match, appointments, appointmentActions }) => {

    const [month, setMonth] = useState((moment().month() + 1).toString());
    const [year, setYear] = useState(moment().year().toString());
    const [currentMonth, setCurrentMonth] = useState(moment().daysInMonth());
    const [show, setShow] = useState(false);
    const [appointmentInfo, setAppointmentInfo] = useState(null);
    const [appointmentsArr, setAppointmentsArr] = useState([]);

    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        appointmentActions.createAppointment(data);
        setShow(false);
    }

    useEffect(() => {
        if (appointments && appointments.length !== 0) {
            localStorage.setItem('appointments', JSON.stringify(appointments));
            setAppointmentsArr(JSON.parse(localStorage.getItem('appointments')).sort(function(a, b) {
                var timeA = a.time; // ignore upper and lowercase
                var timeB = b.time; // ignore upper and lowercase
                if (timeA < timeB) {
                  return -1;
                }
                if (timeA > timeB) {
                  return 1;
                }
                return 0;
              }));
        }
    }, [appointments]);

    const handleChange = (event) => {
        if (event.target.id === "month") {
            setMonth(event.target.value);
        }
        if (event.target.id === "year") {
            setYear(event.target.value);
        }
    }

    const handleClose = (event) => {
        setShow(false);
    }

    const renderAppointmentForm = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => 
                                    <div className="mb-2">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input {...field} type="text" className="form-control" id="name" />
                                    </div>
                        }
                    />
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => 
                        <div className="mb-2">
                            <label htmlFor="gender" className="form-label">Name</label>
                            <select id="gender" {...field} className="form-control form-select">
                                <option value="">{'Open this select menu'}</option>
                                <option value="Male">{'Male'}</option>
                                <option value="Female">{'Female'}</option>
                                <option value="Others">{'Others'}</option>
                            </select>
                        </div>
                        }
                    />
                    <Controller
                        name="age"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => 
                                    <div className="mb-2">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input {...field} type="number" className="form-control" id="age" min="2" />
                                    </div>
                        }
                    />
                    <Controller
                        name="date"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => 
                                    <div className="mb-2">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input {...field} type="date" className="form-control" id="date" min="2019-01-01" max="2021-12-31" />
                                    </div>
                        }
                    />
                    <Controller
                        name="time"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => 
                        <div className="mb-3">
                            <label htmlFor="time" className="form-label">Time</label>
                            <select id="time" {...field} className="form-control form-select">
                                <option value="">{'Open this select menu'}</option>
                                <option value="6:01 - 6:30 pm">{'6:01 - 6:30 pm'}</option>
                                <option value="6:31 - 7:00 pm">{'6:31 - 7:00 pm'}</option>
                                <option value="7:01 - 7:30 pm">{'7:01 - 7:30 pm'}</option>
                                <option value="7:31 - 8:00 pm">{'7:31 - 8:00 pm'}</option>
                                <option value="8:01 - 8:30 pm">{'8:01 - 8:30 pm'}</option>
                                <option value="8:31 - 9:00 pm">{'8:31 - 9:00 pm'}</option>
                                <option value="9:01 - 9:30 pm">{'9:01 - 9:30 pm'}</option>
                                <option value="9:30 - 10:00 pm">{'9:30 - 10:00 pm'}</option>
                            </select>
                        </div>
                        }
                    />
                    <input type="submit" className="btn btn-outline-success float-right" />
                </form>
                </Modal.Body>
            </Modal>
        );
    }

    const showAppointmentModal = (event) => {
        setShow(!show);
    }

    const renderHeader = () => {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="row d-flex justify-content-around">
                        <div className="col-sm-12 col-md-4 mb-2">
                            <select id="month" value={month} className="form-control form-select" onChange={handleChange}>
                                <option value="">{'Open this select menu'}</option>
                                <option value="1">{'1'}</option>
                                <option value="2">{'2'}</option>
                                <option value="3">{'3'}</option>
                                <option value="4">{'4'}</option>
                                <option value="5">{'5'}</option>
                                <option value="6">{'6'}</option>
                                <option value="7">{'7'}</option>
                                <option value="8">{'8'}</option>
                                <option value="9">{'9'}</option>
                                <option value="10">{'10'}</option>
                                <option value="11">{'11'}</option>
                                <option value="12">{'12'}</option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-2">
                            <select id="year" value={year} className="form-control form-select" onChange={handleChange}>
                                <option value="">{'Open this select menu'}</option>
                                <option value="2019">{'2019'}</option>
                                <option value="2020">{'2020'}</option>
                                <option value="2021">{'2021'}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                    <button className="btn btn-outline-info" onClick={showAppointmentModal} style={{ marginRight: '5rem' }}>{'Create Appointment'}</button>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (month && year) {
            setCurrentMonth(moment(year.concat("-", month), "YYYY-M").daysInMonth());
            history.push(`/year/month/${year}/${month}`);
        }
    }, [month, year]);

    const [appointmentDetailsIndexArr, setAppointmentDetailsIndexArr] = useState([]);
    const [appointmentDetailsIndex, setAppointmentDetailsIndex] = useState(-1);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    const setAppointmentIndex = (event, id, details) => {
        setAppointmentDetailsIndexArr([...appointmentDetailsIndexArr, id]);
        setAppointmentDetailsIndex(id);
        setAppointmentDetails(details);
    }

    const closeAppointmentDetails = (event) => {
        setAppointmentDetailsIndexArr([]);
        setAppointmentDetailsIndex(-1);
        setAppointmentDetails(null);
    }

    const renderAppointmentDetails = () => {
        if (appointmentDetails) {
            return (
                <Modal show={appointmentDetailsIndexArr.includes(appointmentDetailsIndex)} onHide={closeAppointmentDetails}>
                    <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-secondary">{`Name: ${appointmentDetails.name}`}</p>
                        <p className="text-secondary">{`Gender: ${appointmentDetails.gender}`}</p>
                        <p className="text-secondary">{`Age: ${appointmentDetails.age}`}</p>
                        <p className="text-secondary">{`Date: ${appointmentDetails.date}`}</p>
                        <p className="text-secondary">{`Time: ${appointmentDetails.time}`}</p>
                    </Modal.Body>
                </Modal>
            );
        }
    }

    const renderCalendar = () => {
        var calendarItems = [];
        for(var i = 1; i < currentMonth + 1; i++) {
            calendarItems.push(
                <Card key={i} className="d-inline-block" style={{ width: '18rem', height: '12rem' }}>
                    <Card.Body>
                        <Card.Title>{i}</Card.Title>
                        {appointmentsArr && 
                            appointmentsArr.length !== 0 &&
                                <div style={{ width: '100%', height: '100px', overflow: 'auto' }}>
                                    <ListGroup>
                                    {appointmentsArr && 
                                        appointmentsArr.length !== 0 &&
                                        appointmentsArr.map((value, index) => {
                                            if (year && month && value.date && year.concat("-", month).concat("-", i) === moment(value.date).format("YYYY-M-D")) {
                                                return  <ListGroup.Item key={index} style={{color: 'teal'}} onClick={(event) => setAppointmentIndex(event, index, value)}>{`Appointment ${index + 1}`}</ListGroup.Item>
                                            }
                                        })
                                    }
                                    </ListGroup>
                                </div>
                        }
                    </Card.Body>
                </Card>
            );
        }
        return calendarItems;
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-12 mt-5 mb-5">
                {renderHeader()}
                {renderAppointmentForm()}
            </div>
            <div className="col-12">
                {renderCalendar()}
            </div>
        </div>
        {renderAppointmentDetails()}
      </div>
    );
}

const mapStateToProps = (state) => ({
    appointments: state.appointmentReducer.appointments
});
  
const mapDispatchToProps = (dispatch) => ({
    appointmentActions: bindActionCreators(appointmentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);