import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from "axios";
import Moment from 'moment';

const api_url = 'http://localhost:3001'

class Reports extends Component {
  state = {
    members: []
  }

  componentDidMount() {
    axios.get(api_url+`/reports`)
      .then(res => {
          const members = res.data;
          this.setState({ members });
      })
  };

//Start RENDER
  render() {
        Moment.locale('en');
        var sortBy = (function () {
        var toString = Object.prototype.toString,
            // default parser function
            parse = function (x) { return x; },
            // gets the item to be sorted
            getItem = function (x) {
              var isObject = x != null && typeof x === "object";
              var isProp = isObject && this.prop in x;
              return this.parser(isProp ? x[this.prop] : x);
            };
        /**
         * Sorts an array of elements.
         *
         * @param {Array} array: the collection to sort
         * @param {Object} cfg: the configuration options
         * @property {String}   cfg.prop: property name (if it is an Array of objects)
         * @property {Boolean}  cfg.desc: determines whether the sort is descending
         * @property {Function} cfg.parser: function to parse the items to expected type
         * @return {Array}
         */
        return function sortby (array, cfg) {
          if (!(array instanceof Array && array.length)) return [];
          if (toString.call(cfg) !== "[object Object]") cfg = {};
          if (typeof cfg.parser !== "function") cfg.parser = parse;
          cfg.desc = !!cfg.desc ? -1 : 1;
          return array.sort(function (a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
          });
        };
      
      }());

      //sortBy(this.state.members, { prop: "date" });
      sortBy(this.state.members, {
        prop: "date",
        desc: true,
        parser: function (item) {
            return item.toUpperCase();
        }
    });

  //Format phone
  function normalize(phone) {
      //normalize string and remove all unnecessary characters
      phone = phone.replace(/[^\d]/g, "");
      //check if number length equals to 10
      if (phone.length === 10) {
          //reformat and return phone number
          return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      return null;
  }//end format phone

  const nr = window.location.href.split('reports/')
  const Page = parseInt(nr[1])
  const perPage = 50
  //console.log('PAGE: ', Page )
  var listItems = ''
  var total = 0
  total = this.state.members.length ? total = this.state.members.length : total = 0

  if(total > 0  ){
    listItems = this.state.members.map((member, index) => 
                      ( index < ((Page)*perPage) ) && (index >= (perPage*(Page-1) )) ?
                            <tr key={member.appointments_id}>
                              <td>{index+1}</td>
                              <td>{member.customerFirstName}</td>
                              <td>{member.customerLastName}</td>
                              <td>{normalize(member.customerPhone)}</td>
                              <td>{member.customerEmail}</td>
                              <td>{Moment(member.date).format('MM/DD/YYYY')}</td>
                              <td>{member.time}</td>
                              <td>{member.length} mins.</td>
                              <td><Badge color={member.book_by === "Salon" ? "success" : ( member.book_by === "Salon-outside" ? "danger" : "warning")}>{member.book_by}</Badge></td>
                              <td>{member.therapistName}</td>
                              <td>{member.ServerDateStamp ? Moment(member.ServerDateStamp).format('MM/DD/YYYY'):''}</td>
                              <td>{member.ServerTimeStamp}</td>
                              <td>{member.appointment_note}</td>
                            </tr>
                        : undefined
      );
  }else{
  listItems = <tr><td colSpan='6'>No data OR database connection.</td></tr>
  }
    //Start Pagination
      var pages = []
      var nrPages = Math.ceil(total / perPage)
      var j = 1
      for (var i = 1; i <= total;) {
        i = i + perPage
        pages.push('/#/pages/reports/'+j)
        j++
      }
      var prevPageURLNr = Page-1
      var prevURL = undefined
      prevPageURLNr > 0 ?  prevURL = '/#/pages/reports/'+prevPageURLNr : prevURL = undefined

      var nextPageURLNr = Page+1
      var nextURL = undefined
      nextPageURLNr <= nrPages ?  nextURL = '/#/pages/reports/'+nextPageURLNr : nextURL = undefined
      
      const pageIng = () => {
        
        return ( 
          <Pagination>
            <PaginationItem disabled={Page === 1 ? true : false}>
              <a href={prevURL}>
                <PaginationLink previous tag="button">Prev</PaginationLink>
              </a>
            </PaginationItem>
          { 
            pages.map( (url, index) => (
                <PaginationItem  key={index} active={Page === index+1 ? true : false} >
                  <a href={url}>
                    <PaginationLink tag="button">{index+1}</PaginationLink>
                  </a>
                </PaginationItem>
              )
            ) 
          }
          <PaginationItem disabled={Page === nrPages ? true : false}>
              <a href={nextURL}>
                <PaginationLink next tag="button">Next</PaginationLink>
              </a>
            </PaginationItem>
          </Pagination>
        )
      }
    //end pagination

      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> New Appointments List
                </CardHeader>
                <CardBody>
                  {pageIng()}
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Client FirstName</th>
                      <th>Client LastName</th>
                      <th>ClientPhoneNR</th>
                      <th>Client Email</th>
                      <th>App.Date</th>
                      <th>App.Time</th>
                      <th>App.Lenght</th>
                      <th>BookedBy</th>
                      <th>Therapist</th>
                      <th>BookingDate</th>
                      <th>BookingTime</th>
                      <th>Note</th>
                    </tr>
                    </thead>
                      <tbody>
                      {listItems}
                    </tbody>
                  </Table>
                  {pageIng()}
                  Showing {Page*perPage+1-perPage} to { (perPage*Page) < total ? perPage*Page : total } of {total} entries
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
  }// end RENDER
}

export default Reports;