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


const api_url = 'http://localhost:3001'

class Info extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      adminInfo: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // notify = () => toast("Wow so easy !");
  
  componentDidMount() {
    axios.get(api_url+`/admin/info`)
      .then(res => {
          const adminInfo = res.data;
          this.setState({ adminInfo });
          console.log(res.data)
      })
    }
    
    handleSubmit(e) {
      e.preventDefault();
     
     console.log('API call to DB');
     const adminFirst = e.target.elements.firstName.value.trim();
     const adminLast = e.target.elements.lastName.value.trim();
     const adminPhone = e.target.elements.phone.value.trim();
     const adminEmail = e.target.elements.email.value.trim();
     const adminAddress = e.target.elements.address.value.trim();
     const adminCity = e.target.elements.city.value.trim();
     const adminState = e.target.elements.state.value.trim();
     const adminZip = e.target.elements.zip.value.trim();
     const adminCP = e.target.elements.cp.value.trim();

    this.setState( () => ({ 
        adminInfo: [{  
                      user_id: 1,          
                      first: adminFirst,
                      last: adminLast,
                      phone: adminPhone,
                      email: adminEmail,
                      address: adminAddress,
                      city: adminCity,
                      state: adminState,
                      zip: adminZip,
                      cancellation_policy: adminCP
          }]
        }));
        

  fetch(api_url+`/admin/info/update/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      adminInfo: [{  
        user_id: 1,          
        first: adminFirst,
        last: adminLast,
        phone: adminPhone,
        email: adminEmail,
        address: adminAddress,
        city: adminCity,
        state: adminState,
        zip: adminZip,
        cancellation_policy: adminCP
      }]              
    })
  }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    
    toast(myJson.message, {
      closeButton: true,
      hideProgressBar: true,
      className: 'foo-bar',
      position: toast.POSITION.BOTTOM_RIGHT
    })
  });
        
  // console.log('first: ', adminFirst);
  // console.log('last: ', adminLast);
  // console.log('adminInfo: ', this.state.adminInfo[0].first)
  // console.log('state adminInfo: ', this.state.adminInfo)
//test 00201
}

handlePageChange(e){
  e.preventDefault();
  window.location.hash = "#/dashboard";
}

  render() {
    return (
      <div className="animated fadeIn">
        <style>{"\
          .foo-bar{\
            background: #4dbd74;\
            color: #ffffff;\
          }\
          "}
        </style>
          <ToastContainer />
        <Row>
          <Col xs="12" md="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Administrator Information </strong> 
              </CardHeader>
              <CardBody>
                <Form  onSubmit={this.handleSubmit} key={this.state.id}>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="first-name">First Name</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="firstName" id="first-name" placeholder="First Name"  defaultValue={item.first} key={key}/>  ) } 
                      <FormText color="muted">Enter Admin First Name</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="last-name">Last Name</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="lastName" id="last-name" placeholder="Last Name"  defaultValue={item.last} key={key}/>  ) } 
                      <FormText color="muted">Enter Admin Last Name</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="phone">Phone</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="phone" id="phone" placeholder="Phone"  defaultValue={item.phone} key={key}/>  ) } 
                      <FormText color="muted">Enter Phone Number</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="email">Email</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="email" id="email" placeholder="Email"  defaultValue={item.email} key={key}/>  ) }
                      <FormText className="help-block">Enter Email</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="address">Street Address</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="address" id="address" placeholder="Address"  defaultValue={item.address}  key={key}/>  ) }
                      <FormText color="muted">Enter Street Address</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="city">City</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="city" id="city" placeholder="City"  defaultValue={item.city}  key={key}/>  ) }
                      <FormText color="muted">Enter City</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="state">State</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="state" placeholder="State" id="state" defaultValue={item.state}  key={key}/>  ) }
                      <FormText color="muted">Enter State</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="zip-code">ZipCode</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="text" name="zip" placeholder="Zip Code" id="zip-code" defaultValue={item.zip}  key={key} />  ) }
                      <FormText color="muted">Enter ZipCode</FormText>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                    </Col>
                    <Col xs="12" md="10">
                      {this.state.adminInfo.map( (item, key) => <Input type="textarea" name="cp" id="cancellation-policy" rows="9" placeholder="Cancellation policy content..."  defaultValue={item.cancellation_policy}  key={key}/>  ) }
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="12">
                      <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>
                      <Button type="cancel" size="sm" color="danger" onClick={this.handlePageChange}><i className="fa fa-ban"></i> Cancel</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default Info;