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
import API from "../../API_Config/api.config";
import axios from 'axios';

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

          machinename:"",          
          mobile:""
        };
      }

      componentDidMount(){
          const params={
              userid:this.props.userid
          }
        axios
        .get(`${API.API_ROOT}/getMachineById/${params.userid}`,)
        .then((response) => response.data)
        .then((result) => {
           this.setState({
               machinename:result.data[0].machinename,        
               mobile:result.data[0].mobile,
        
           })
          console.log(result);
        });
      }
      
      inputChange=(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
      }
      saveUser=(e)=>{
        e.preventDefault();
          const params={
              machineid:this.props.userid,
              machinename:this.state.machinename,              
              mobile:this.state.mobile,              
          }
          console.log(params)
          axios
                .put(`${API.API_ROOT}/updateMachine`, params)
                .then(response => response.data)
                .then(
                    result => {
                        console.log(result)
                        this.props.getUsers();
                        this.props.close();
                    })
          
          
      }
      closePopUp=()=>{
          this.props.close();
      }
      render() {
        const{machinename,mobile}=this.state
        return (
          <div>
            <div className="addUserTitle">
              Update User{" "}
              <span style={{ float: "right", marginRight: "10px" }}>
                <i class="fas fa-close" onClick={this.closePopUp} ></i>
              </span>
            </div>
    
            <div className="addUserBody">
                <Form onSubmit={this.saveUser}>
                    <Form.Row className="addBodyRow">
                        <Col>                    
                                 <Form.Control placeholder="Machine Name"
                                 name="machinename"
                                 value={machinename} onChange={this.inputChange} />
                        </Col>
                        <Col>
                                 <Form.Control placeholder="Mobile" value={mobile} name="mobile" onChange={this.inputChange} />
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
    