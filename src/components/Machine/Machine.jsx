/* eslint-disable no-unused-vars */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";
import UpdateMachine from './UpdateMachine'
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import API from "../../API_Config/api.config";
import AddMachine from './AddMachine';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userid:'',
      open: false,
      openEdit:false,
      modules: AllCommunityModules,
      overlayLoadingTemplate:
        '<div class="ag-overlay-loading-top text-center mt-40"><p>Please wait while  loading</p><div class="loader5"></div></div></div>',

      columnDefs: [
        {
          headerName: "Machine Name",
          field: "machinename",
          sort: "asc",
          sortable: true,
          width: 400,
          // comparator: this.customComparator1
        },
        {
          headerName: "Mobile",
          field: "mobile",
          sortable: true,
          width: 400,
          // comparator: this.customComparator1
        },
        {
          headerName: "Edit",
          field: "icon",
          sortable: true,
          width: 400,
          lockPosition: false,
          cellRenderer: (params) => {
            const link = document.createElement("span");
            link.innerHTML =
              '<span class="iconColor"><i class="fas fa-pen"></i></span>';

            link.addEventListener("click", (e) => {
              e.preventDefault();
              this.setState({
                  userid:params.data.machineid
              })
              this.update(params.data.machineid);
            });
            return link;
          },
        },
        {
          headerName: "Delete",
          field: "icon",
          sortable: true,
          width: 400,
          lockPosition: false,
          cellRenderer: (params) => {
            const link = document.createElement("span");
            link.innerHTML =
              '<span class="icondelete"><i class="fas fa-trash"></i></span>';

            link.addEventListener("click", (e) => {
              e.preventDefault();
              this.deleteUser(params.data.machineid);
            });
            return link;
          },
        },
      ],
      defaultColDef: {
        resizable: true,
        domLayout: "autoHeight",
      },
      rowSelection: "single",
      rowData: [{ Name: "Vetri" }],
      paginationPageSize: 25,
    };
  }

  componentDidMount() {
   this.getUsers(); 
  }
  getUsers=()=>{
    axios
    .get(`${API.API_ROOT}/getallmachines`)
    .then((response) => response.data)
    .then((result) => {        
      this.setState({
        rowData: result.data,
      });
      console.log(result);
    });
  }
  update=()=>{
    this.setState({
        openEdit:!this.state.openEdit
    })
  }
  deleteUser=(id)=>{
      const params={
          userid:id
      }
    axios
    .delete(`${API.API_ROOT}/deleteMachine/${params.userid}`,)
    .then(response => response.data)
    .then(
        result => {
            this.getUsers();            
        })


  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.showLoadingOverlay();

    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    };
    this.gridApi.setDomLayout("autoHeight");
    document.querySelector("#CatGrid").style.height = "";
  };

  openPopUp = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
}
  render() {
    const { open,openEdit,userid } = this.state;
    return (
      <div className="userHead">
        <h2 className="userTitle">Machine List</h2>
        <Row>
          <Col sm={6} md={6} lg={6}></Col>

          <Col sm={3} md={3} lg={3}></Col>

          <Col sm={3} md={3} lg={3}>
            <div style={{ marginLeft: "40px" }}>
              <InputGroup className="loginInput">
                <Form.Control
                  type="text"                                    
                  onInput={this.onQuickFilterChanged.bind(this)}
                  placeholder="Search"                  
                  id="quickFilter"                  
                />
                <FontAwesome
                  className="useradd"
                  name="plus-circle"
                  onClick={this.openPopUp}
                />
              </InputGroup>
            </div>
          </Col>
        </Row>

        <div
          id="CatGrid"
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-balham userGrid"
        >
          <AgGridReact
           suppressRowClickSelection={true}
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            pagination
            paginationPageSize={this.state.paginationPageSize}
            domLayout={this.state.domLayout}
          />
        </div>

        <Modal
          show={open}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"

          //   centered
        >
          <AddMachine close={this.openPopUp.bind(this)} 
          getUsers={this.getUsers.bind(this)}
          />
        </Modal>


        <Modal
          show={openEdit}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"

          //   centered
        >
          <UpdateMachine close={this.update.bind(this)} 
          getUsers={this.getUsers.bind(this)}
          userid={userid}
          />
        </Modal>
      </div>
    );
  }
}
