import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem,SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import './Home.scss';
import FontAwesome from 'react-fontawesome';
import Users from '../User/User';
import Report from '../Report/Report' 
import Machine from '../Machine/Machine';
import history from '../../history';



export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            isActiveReport:true,
            isActiveUser:false,
            isActiveMachine:false,
        }

    }
    
    activeMenu = text=> event=> {
        event.preventDefault()
        console.log(text)
        if(text === "isActiveReport")
         {
             this.setState({
                 isActiveMachine:false,
                 isActiveReport:true,
                 isActiveUser:false
             })
         }
         if(text === "isActiveMachine"){
            this.setState({
                isActiveMachine:true,
                isActiveReport:false,
                isActiveUser:false
            })
         }
         if(text === "isActiveUser"){
            this.setState({
                isActiveMachine:false,
                isActiveReport:false,
                isActiveUser:true
            })
         }
      }
    render() {
        const{isActiveUser,isActiveReport,isActiveMachine}=this.state
        return (
            <div style={{display:'flex'}}>                
            <ProSidebar className="sidebarMenu">
                <SidebarHeader className="menuHeader">
                
                       <img src="./company.png"
                       alt="test"
                       style={{width:"100px",height:'100px'}}/>
                       <div style={{marginTop:'-10px'}}>
                           Welcome to ABC Company
                       </div>
                        
                </SidebarHeader>

  <SidebarContent>  
            <Menu iconShape="square" className="menu">
            <MenuItem             
            onClick={this.activeMenu("isActiveReport")}
            active={isActiveReport}
                    icon={<FontAwesome   
                        className="pro-item-content"                         
                            name="file"                            
                                                        
                        />} >
          Report
          </MenuItem>
                <MenuItem
                active={isActiveUser}
                onClick={this.activeMenu("isActiveUser")}
                icon={<FontAwesome   
                    className="pro-item-content"                         
                        name="user"                            
                                                    
                    />} 
                >Users</MenuItem>

                <MenuItem 
                active={isActiveMachine}
                onClick={this.activeMenu("isActiveMachine")}
                icon={<FontAwesome   
                    className="pro-item-content"                         
                        name="cog"                            
                                                    
                    />} 
                
                >Machines</MenuItem>
                
                
            </Menu>
            </SidebarContent>
            <SidebarFooter className="menuFooter">
                <div style={{border:'1px solid white',cursor:'pointer',
                marginLeft:'100px',marginRight:'100px',borderRadius:'5px'}}
                onClick={
                    ()=>{
                        localStorage.clear();
                        history.push('/')
                    }
                }
                >
            <FontAwesome   
                        className="pro-item-content"                         
                            name="sign-out"                            
                                                        
                        />
      Log out
      </div>
  </SidebarFooter>
            </ProSidebar>

        {/* show hide menu here */}
        
            
        
        {
            isActiveReport ?<Report />:isActiveUser ? <Users /> :<Machine />
        }
             
        {/* show hide menu here */}
            </div>
        )
    }
}
