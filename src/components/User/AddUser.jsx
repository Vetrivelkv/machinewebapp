/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "./AddUser.css";
import API from "../../API_Config/api.config";
import axios from 'axios';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      role:"",
      mobile:""
    };
  }
  
  inputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
  }
  saveUser=(e)=>{
    e.preventDefault();
      const params={
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          mobile:this.state.mobile,
          role:this.state.role,
          otp:''
      }
      console.log(params)
      axios
			.post(`${API.API_ROOT}/creatuser`, params)
			.then(response => response.data)
			.then(
				result => {
                    this.props.getUsers();
                    this.props.close();
                })
      
      
  }
  closePopUp=()=>{
      this.props.close();
  }
  render() {
    const{firstName,lastName,role,mobile}=this.state
    return (
      <div>
        <div className="addUserTitle">
          Add User{" "}
          <span style={{ float: "right", marginRight: "10px" }}>
            <i class="fas fa-close" onClick={this.closePopUp} ></i>
          </span>
        </div>

        <div className="addUserBody">
            <Form onSubmit={this.saveUser}>
                <Form.Row className="addBodyRow">
                    <Col>                    
                             <Form.Control placeholder="First name"
                             name="firstName"
                             value={firstName} onChange={this.inputChange} />
                    </Col>
                    <Col>
                             <Form.Control
                             name="lastName"
                             value={lastName}
                             onChange={this.inputChange}
                             placeholder="Last name" />
                    </Col>
                </Form.Row>
                <Form.Row className="addBodyRow">
                    <Col>
                             <Form.Control placeholder="Mobile" value={mobile} name="mobile" onChange={this.inputChange} />
                    </Col>
                    <Col>                                                                              
                    <Form.Control as="select" name="role" value={role} onChange={this.inputChange}>
                       <option>Select Role</option>
                        <option>Admin</option>
                        <option>User</option>
                    </Form.Control>
    
                    </Col>
                </Form.Row>

                <Form.Row className="addBodyRow">
                <Col sm={5} md={5} lg={5}>
                </Col>
                <Col sm={2} md={2} lg={2}>
                <Button type="submit" className="submitBtn">Submit</Button>
                
                </Col>
                <Col sm={5} md={5} lg={5}>
                </Col>
                </Form.Row>

                

            </Form>
        </div>
      </div>
    );
  }
}
