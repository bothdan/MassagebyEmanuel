import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from "axios";
import Moment from 'moment';

const api_url = 'http://localhost:3001'

class UsersLogs extends Component {
  state = {
    logs: []
  }

  componentDidMount() {
    axios.get(api_url+`/logs/users`)
      .then(res => {
          const logs = res.data;
          this.setState({ logs });
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

      //sortBy(this.state.logs, { prop: "date" });
      sortBy(this.state.logs, {
        prop: "date",
        desc: true,
        parser: function (item) {
            return item.toUpperCase();
        }
    });

  const nr = window.location.href.split('userslogs/')
  const Page = parseInt(nr[1])
  const perPage = 100
  //console.log('PAGE: ', Page )
  var listItems = ''
  var total = ''
  total = this.state.logs.length ? total = this.state.logs.length : total = 0

  if(total > 0  ){
    listItems = this.state.logs.map((log, index) => 
                      ( index < ((Page)*perPage) ) && (index >= (perPage*(Page-1) )) ?
                            <tr key={log.login_id}>
                              <td>{log.login_id}</td>
                              <td>{log.user_id}</td>
                              <td>{log.username}</td>
                              <td>{Moment(log.date).format('MM/DD/YYYY')}</td>
                              <td>{log.time}</td>
                              <td>{log.IP}</td>
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
        pages.push('/#/pages/logs/userslogs/'+j)
        j++
      }
      var prevPageURLNr = Page-1
      var prevURL = undefined
      prevPageURLNr > 0 ?  prevURL = '/#/pages/logs/userslogs/'+prevPageURLNr : prevURL = undefined

      var nextPageURLNr = Page+1
      var nextURL = undefined
      nextPageURLNr <= nrPages ?  nextURL = '/#/pages/logs/userslogs/'+nextPageURLNr : nextURL = undefined
      
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
                  <i className="fa fa-align-justify"></i> Admin Logs
                </CardHeader>
                <CardBody>
                  {pageIng()}
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>Login ID</th>
                      <th>User ID</th>
                      <th>UserName/Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>IP</th>
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

export default UsersLogs;