/* eslint-disable no-unused-vars */
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import './Login.css'
import React, { Component } from 'react'
import history from '../../history'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }

    }
    Login=(e)=>{   
        const{email,password}=this.state; 
        if(email === "Admin" && password === "Admin@123"){
            localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
            history.push('/Home')
        }
        else
        {
            console.log('wrong password')
        }
       
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }

    render() {
        const{email,password}=this.state;
        return (
            <Container fluid>
            <Row className="loginBackground">
              <Col sm={4} md={4} lg={4} xs={4}></Col>
              <Col sm={4} md={4} lg={4} xs={4}>
              <Form onSubmit={this.Login} className="loginBox">
                  <h5 style={{textAlign:'center'}}>Login in to your account</h5>
                    
                    <InputGroup className="loginInput">                    
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <img 
                                alt="test"
                                style={{width:'20px'}}
                                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>                            
                                <Form.Control
                                type="text"
                                required
                                
                                placeholder="User Name"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                                />
                        </InputGroup>                  
                    <InputGroup>
                    
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <img 
                                    alt="test1"
                                    style={{width:'20px'}}
                                    src="data:image/png;base64,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"/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            
                            <Form.Control
                        type="password"
                        required                        
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
                        value={password}
                      />
                        </InputGroup>
      
                    <Row>
                      <Col></Col>
                      <Col>
                        <Button variant="primary" type="submit" className="mb-4 loginBtn">
                          Login
                        </Button>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Form>
                
              </Col>
              <Col sm={4} md={4} lg={4} xs={4}></Col>
              </Row>
              </Container>
              
        )
    }
}

