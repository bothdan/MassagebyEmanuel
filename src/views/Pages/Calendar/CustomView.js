// import React, { Component } from "react";
import React, { Component } from 'react';
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dateFns from "date-fns";


const api_url = 'http://localhost:3001'

function myFunction(date) {
  return date.toLocaleDateString();
}

class CustomView extends Component {

  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    days: [{
      dayone : 'test'
    }]
  };

  
  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle" >
        <div className="col col-start" >
          <div className="icon" onClick={this.prevMonth}>
            <i className="icon-arrow-left"></i> PREV
          </div>
        </div>
        <div className="col col-center top">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">
            NEXT <i className="icon-arrow-right"></i> 
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];
    
    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={ () => { 
                this.onDateClick(dateFns.parse(cloneDay))
                console.log(cloneDay)
                console.log(myFunction(cloneDay))
              }
            }
          >
            <span className="number">{formattedDate}</span>
            <span className="event">
             <strong>Eva Soto</strong><br/> <i className="icon-calendar"></i> 9 - 10 AM <br/> <i className="icon-user"></i> 60 min.
            </span>
            <span className="event">
              <strong>Mike Dolores</strong><br/> <i className="icon-calendar"></i> 11 - 12:30 PM <br/> <i className="icon-user"></i> 90 min.
            </span>
            <span className="event">
              <strong>Jessica Hong</strong><br/> <i className="icon-calendar"></i> 2 - 3 PM <br/> <i className="icon-user"></i> 60 min.
            </span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <style>{"\
          .foo-bar{\
            background: #4dbd74;\
            color: #ffffff;\
          }\
          .col-start{width: 33.33%; text-align: left;}\
          .col-center{width: 33.33%; text-align: center;}\
          .col-end{width: 33.33%; text-align: right;}\
          .top{font-size: 25px;}\
          .days.row{font-size: 12px; color: #4D4D4D; font-weight: 500;}\
          .cell{border: 1px solid #E1E1E1; box-sizing: border-box;width: 14.285%; transition: all 0.3s; color: #4D4D4D; font-weight: 400; font-size: 12px; padding: 1.5% 1.5% 5%; vertical-align: initial; padding: 4px 4px; min-height: 120px;background-color: #E1E1E1; border-radius: 3px; margin: 5px;}\
          .cell:hover{background-color: rgba(0,0,0,0.1); cursor:pointer;}\
          span.event { min-height: 60px; background-color: #fff; display: block; _margin: 5px 10%; _border-radius: 2px; border-left: 4px solid #91c33b; padding: 3px; margin: 2px 5px;}\
          .number{font-size: 18px;}\
          "}
        </style>
          <ToastContainer />
          <Row>
            <Col xs="12" md="12" lg="12">
              <Card>
                <CardHeader>

                  {this.renderHeader()}
                  {this.renderDays()}
                  {this.renderCells()}

                </CardHeader>
                <CardBody>
                  
                </CardBody>
              </Card>
              
            </Col>
          </Row>
      </div>
    );
  }
}

export default CustomView;