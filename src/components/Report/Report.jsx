/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";
import moment from 'moment';
import axios from "axios";
import JsPDF from 'jspdf';
import 'jspdf-autotable';
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



function Report() {

  useEffect(() => {
    console.log('mounted')
    getUsers();
    getMachine();
  
      
    }, [])
  
  const [userid,setUserid]=useState("");
  const[machineid,setmachineid]=useState("");
  const[machineData,setMachineData]=useState([])
  const [startDate,setStartDate]=useState(new Date().toLocaleDateString("fr-CA"));
  const [endDate,setEndDate]=useState(new Date().toLocaleDateString("fr-CA"));
  const [modules,setModules]=useState(AllCommunityModules);
  const [overlayLoadingTemplate,setOverlayLoadingTemplate]=useState( '<div class="ag-overlay-loading-top text-center mt-40"><p>Please wait while  loading</p><div class="loader5"></div></div></div>');
  const [columnDefs,setColumnDefs]=useState(
     [
      {
        headerName: "User Name",
        field: "firstname",
        sort: "asc",
        sortable: true,
        width: 300,
        // comparator: this.customComparator1
      },
      {
        headerName: "User Mobile",
        field: "umobile",
        sortable: true,
        width: 220,
        // comparator: this.customComparator1
      },
      {
        headerName: "Machine Name",
        field: "machinename",
        // sort: "asc",
        sortable: true,
        width: 300,
        // comparator: this.customComparator1
      },
      {
        headerName: "Machine Number",
        field: "mmobile",
        sortable: true,
        width: 220,
        // comparator: this.customComparator1
      },
      {
        headerName: "Base Amount",
        field: "baseamount",
        sortable: true,
        width: 220,
        // comparator: this.customComparator1
      }
      ,
      {
        headerName: "Time",
        field: "minutes",
        sortable: true,
        width: 220,
        // comparator: this.customComparator1
      },
      {
        headerName: "Status",
        field: "paidstatus",
        sortable: true,
        width: 220,
        // comparator: this.customComparator1
      }
      ,
      {
        headerName: "Status",
        field: "paidstatus",
        sortable: true,
        width: 220,
        // comparator: this.customComparator
      }
      ,
      {
        headerName: "Start Date",
        field: "startdate",
        sortable: true,
        width: 220,
        cellRenderer(params) {
          const date = new Date(params.data.startdate).toLocaleDateString('de-DE', {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit'
          });
          return date; // params.data.createdTime;
        }
        // comparator: this.customComparator1
      }
    ]
  );
  const[defaultColDef,setDefaultColDef]=useState({
    resizable: true,
    domLayout: "autoHeight",
  })
  const[rowData,setRowData]=useState([]);
  const[userData,setUserData]=useState([]);
  
  
 const onGridReady = (params) => {
    Report.gridApi = params.api;
    Report.gridColumnApi = params.columnApi;
    // this.gridApi.showLoadingOverlay();

    Report.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      Report.gridApi.sizeColumnsToFit();
    };
    Report.gridApi.setDomLayout("autoHeight");
    document.querySelector("#CatGrid").style.height = "";
  };

  useEffect(() => {   
    console.log("updation")       

  let params=""
      if(userid === "" && machineid === "")
      {
        params={
            startdate:startDate,
            enddate:endDate
             }
      }
       if(userid === "" && machineid !==""){
        console.log('no user id')
        params={
          startdate:startDate,
          enddate:endDate,
          machineid
      }

      }
       if(userid !== "" && machineid ===""){
        params={
            startdate:startDate,
            enddate:endDate,
            userid
        }
      }
      if(userid !== "" && machineid !==""){
        params={
            startdate:startDate,
            enddate:endDate,
            userid,
            machineid
        }
      }
     
       getReport(params);      
  }, [startDate,endDate,userid,machineid])

 const getUsers=()=>{
    axios
    .get(`${API.API_ROOT}/getAlluser`)
    .then((response) => response.data)
    .then((result) => {
      setUserData(result.data)
      
      console.log(result);
    });
  }
 



//export excel
const   exportexcel = () => {
  const Excel = require('exceljs');

  const workbook = new Excel.Workbook();
  //const { rowData, totalorder, totalamt} = this.state;
  

  const sheetname = 'Summary_Report_' + moment().format('MM_DD_YYYY_ h:mm:ss_A');
  const worksheet = workbook.addWorksheet('Summary_Report_1');

  worksheet.mergeCells('A1', 'I1');

  worksheet.getCell('A1,B1,C1,D1,E1,F1,G1,H1,I1').value = 'Summary Report';
  worksheet.getCell('A1,B1,C1,D1,E1,F1,G1,H1,I1').alignment = { horizontal: 'center' };
  worksheet.getCell('A1,B1,C1,D1,E1,F1,G1,H1,I1').font = { bold: true, name: 'Roboto', size: 12 };

  worksheet.getCell('A3').value = 'From-Date ';
  worksheet.getCell('A3').alignment = { horizontal: 'left' };
  worksheet.getCell('A3').font = { bold: true, name: 'Roboto', size: 10 };

  worksheet.getCell('B3').value = moment().format('MM/DD/YYYY');
  worksheet.getCell('B3').alignment = { vertical: 'bottom', horizontal: 'left' };

  worksheet.getCell('A4').value = 'To-Date ';
  worksheet.getCell('A4').alignment = { horizontal: 'left' };
  worksheet.getCell('A4').font = { bold: true, name: 'Roboto', size: 10 };

  worksheet.getCell('B4').value = moment().format('MM/DD/YYYY');
  worksheet.getCell('B4').alignment = { vertical: 'bottom', horizontal: 'left' };

  // worksheet.getCell('A4').value = 'Total Orders & Expenses ';
  // worksheet.getCell('A4').alignment = { horizontal: 'left' };
  // worksheet.getCell('A4').font = { bold: true, name: 'Roboto', size: 10 };

  // worksheet.getCell('B4').value ='abd'
  // worksheet.getCell('B4').alignment = { vertical: 'bottom', horizontal: 'left' };

   worksheet.getCell('A5').value = 'User';
  worksheet.getCell('A5').alignment = { horizontal: 'left' };
  worksheet.getCell('A5').font = { bold: true, name: 'Roboto', size: 10 };

  worksheet.getCell('B5').value ='karthik'
  worksheet.getCell('B5').alignment = { vertical: 'bottom', horizontal: 'left' };

  worksheet.getCell('A6').value = 'Machine';
  worksheet.getCell('A6').alignment = { horizontal: 'left' };
  worksheet.getCell('A6').font = { bold: true, name: 'Roboto', size: 10 };

  worksheet.getCell('B6').value ='Machine 1'
  worksheet.getCell('B6').alignment = { vertical: 'bottom', horizontal: 'left' };

  worksheet.getCell('A7').value = 'Created on';
  worksheet.getCell('A7').alignment = { horizontal: 'left' };
  worksheet.getCell('A7').font = { bold: true, name: 'Roboto', size: 10 };

  worksheet.getCell('B7').value = moment().format('MM/DD/YYYY h:mm:ss A ');
  worksheet.getCell('B7').alignment = { vertical: 'bottom', horizontal: 'left' };
  // worksheet.addRow({"":''})
  worksheet.getRow(9).values = ['User Name', 'User Mobile', 'Machine Name', 'Machine Mobile','Base Amount', 'Time(minutes)', 'Total Amount', 'Status', 'Start Date' ];
  worksheet.columns.forEach(column => {
    column.width = 25;
  });
  worksheet.getRow(9).font = {
    bold: true,
    name: 'Roboto',
    size: 10
  };

  worksheet.columns = [
    { key: 'User Name', width: 28 },
    { key: 'User Mobile', width: 35 },
    { key: 'Machine Name', width: 20 },
    { key: 'Machine Mobile', width: 35 },
    { key: 'Base Amount', width: 25 },
    { key: 'Time(minutes)', width: 25 },
    { key: 'Total Amount', width: 25 },
    { key: 'Status', width: 25 },
    { key: 'Start Date', width: 25 },
  ];
 // worksheet.getColumn(4).numFmt = '$0.00';
  var row_count = 9;
  rowData.forEach((e, index) => {
    row_count++;
    worksheet.addRow({
      'User Name': e.firstname,
      'User Mobile': e.umobile,
      'Machine Name': e.machinename,
      'Machine Mobile': e.mmobile,
      'Base Amount': e.baseamount,
      'Time(minutes)': e.minutes,
      'Total Amount': e.totalamount,
      'Status': e.paidstatus,
      'Start Date': e.startdate            
    });
  });
  
  const insideColumns = ['A', 'B', 'C', 'D' , 'E', 'F', 'G', 'H', 'I']; //,'J','K','L']

  var last_row_count = 1;
  worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    last_row_count++;

    if (rowNumber !== 9 && rowNumber > 9) {
      insideColumns.forEach(c => {
        worksheet.getCell(`${c}${row_count}`).border = {
          top: { style: 'none' },
          left: { style: 'none' },
          bottom: { style: 'thin' },
          right: { style: 'none' }
        };
        // if(c!=='B'){
        worksheet.getCell(`${c}${rowNumber}`).alignment = { horizontal: 'left' };

        //  }

        if (c === 'I') {
          worksheet.getCell(`I${rowNumber}`).border = {
            top: { style: 'none' },
            bottom: { style: 'none' },
            left: { style: 'none' },
            right: { style: 'thin' }
          };
          if (`I${row_count + 1}`) {
            worksheet.getCell(`I${row_count}`).border = {
              top: { style: 'none' },
              bottom: { style: 'thin' },
              left: { style: 'none' },
              right: { style: 'thin' }
            };
          }
        }
        if (rowNumber >= 2) {
          if (rowNumber % 2 === 0) {
            worksheet.getCell(`${c}${rowNumber}`).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'D6EDED' }
            };
          } else {
            worksheet.getCell(`${c}${rowNumber}`).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFFF' }
            };
          }
        }
      });
    }
  });
  insideColumns.forEach(v => {
    if (v !== 'L') {
      worksheet.getCell(`${v}${9}`).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'none' },
        right: { style: 'none' }
      };
      if (v === 'I') {
        worksheet.getCell(`${v}${9}`).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'none' },
          right: { style: 'thin' }
        };
      }
      // worksheet.getCell(`${v}${6}`).alignment = { horizontal: "center" }

      worksheet.getCell(`${v}${9}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '43ABAC' }
      };
    }
  });
  let FileSaver = require('file-saver');
  // save workbook to disk
  const book = workbook.xlsx
    .writeBuffer('D:/sample.xlsx')
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), sheetname + '.xlsx'))
    .catch(err => console.log('Error writing excel export', err));
};

const GeneratePDF = (Data,username,machinename,start,end) => {
	// initialize jsPDF
    const doc = new JsPDF('a4');
	const tableColumn = [
		'User Name',
            'User Mobile',
            'Machine Name',
            'Machine Mobile',
            'Base Amount',
            'Time(minutes)',
            'Total Amount',
            'Status',
            'Start Date' 
	];


	// define an empty array of rows
	const tableRows = [];

	// for each ticket pass all its data into an array
	rowData.forEach(e => {
		const ticketData = [
			e.firstname,
            e.umobile,
            e.machinename,
            e.mmobile,
             e.baseamount,
             e.minutes,
             e.totalamount,
            e.paidstatus,
            e.startdate 			
			
			// called date-fns to format the date on the ticket
			// format(new Date(ticket.updated_at), 'yyyy-MM-dd')
		];
		// push each tickcet's info into a row
		tableRows.push(ticketData);
	});

	// startY is basically margin-top
	//	doc.autoTable({ html: '#my-table' });

	doc.autoTable({
		html: '#table',
		didParseCell(data) {
			if (data.cell.row.index%2 === 0) {
				data.cell.styles.textColor = [255, 255, 255];
				data.cell.styles.fillColor = '#FF5783';
			}else{
				data.cell.styles.textColor = [255, 255, 255];
				data.cell.styles.fillColor = '#018E8F';
			}
		}
	});
	//     doc.autoTable({styles: { fontSize: 22},})

	// 	 doc.autoTable(tableColumn, tableRows, { startY: 20 ,didParseCell: (HookData) => {console.log(HookData); HookData.doc.setFontSize(10)} });
	//   //  doc.autoTable( {head:[[tableColumn]], body:[[tableRows]] });
	// 	doc.autoTable({styles: { fontSize: 22},})

	
	// var totalPagesExp=''
	// if (typeof doc.putTotalPages === 'function') {
	//     doc.putTotalPages(totalPagesExp);
	//   }
	function monthName(mon) {
		return [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'November',
			'December'
		][mon - 1];
	}

	console.log(monthName(7));
	const date = Date().split(' ');
	const date1 = new Date();

	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
	// ticket title. and margin-top + margin-left
	doc.setFontSize(10)
	doc.text('Summary Report', 95, 5);
	doc.setFontSize(6);
	 

	// doc.addImage(`${process.env.PUBLIC_URL}/assets/images/logos/Epllogo.png`, 'png', 165, 3, 29, 7);
	doc.text(`From-Date : ${startDate}`, 14, 10);
	doc.text(`To-Date :  ${endDate}`, 14, 15);
			// doc.text(`User Name : ${firstname}`, 14, 20);
			// doc.text(`Machine Name : ${machinename}`, 14, 25);
		doc.text(`Created on : ${moment().format('MM/DD/YYYY h:mm:ss A ')}`, 14, 30);

	// doc.text(`Year : ${year }`, 14, 15);
	doc.autoTable(tableColumn, tableRows, {
		startY: 32,
		theme: 'grid',
		alternateRowStyles: {
			fillColor: [213, 237, 237],
		  },
		  minCellHeight: 4,

		 
		headerStyles: {
			//  lineWidth: 1,
			fontSize: 5,
			textColor: '#111111',
			fillColor: '#43ABAC' //! important
		},
		didParseCell(data) {
			console.log('data',data);			
			data.cell.styles.fontSize = 6;
			
			console.log(data);
		},
		
		didDrawPage: data => {
			const pages = doc.internal.getNumberOfPages();
			console.log(doc.internal);
            console.log(doc.internal.pages.length);
            let tot=doc.internal.pages.length
			// Footer
			const str = `Page ${doc.internal.getNumberOfPages()}` //+ `of ${doc.internal.pages.length - 1}`;
			// Total page number plugin only available in jspdf v1.0+
			if (typeof doc.putTotalPages === 'function') {
				// str = `${str} of ${totalPagesExp}`;
				//	console.log(doc.putTotalPages());
			}
			doc.setFontSize(6);

			// jsPDF 1.4+ uses getWidth, <1.4 uses .width
			const { pageSize } = doc.internal;
			const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
			doc.text(str, data.settings.margin.left, pageHeight - 10);
		},
		margin: { top: 33 }
	});
	// we define the name of our PDF file.
	// doc.autoTable({html: '#table', styles: {fontSize: 12}})
	doc.save(`Summary_Report_${moment().format('MM_DD_YYYY_ h:mm:ss_A')}.pdf`);
};

//export excel



function myNewFunction(sel) {
  alert(sel.options[sel.selectedIndex].text);
}

  const getMachine=()=>{
    axios
    .get(`${API.API_ROOT}/getallmachines`)
    .then((response) => response.data)
    .then((result) => {
      setMachineData(result.data)
      
      console.log(result);
    });
  }
  const getReport=(params)=>{
    axios
    .post(`${API.API_ROOT}/getBillsbyDate`,params)
    .then((response) => response.data)
    .then((result) => {      
        setRowData(result.data);
      console.log(result);
    });

  }
 
    const DateChange=(e)=>{                    
       if(e.target.name ==="startDate")
       {
         console.log(e.target.value)
         setStartDate(e.target.value)
       }
       if(e.target.name ==="endDate")
       {
         setEndDate(e.target.value)
       }
      
      
      }

     const InputChange=(e)=>{
        if(e.target.name === "machineid")
        {
            setmachineid(e.target.value);
            
            
        }
        else
        {
          setUserid(e.target.value)   
        }
             
      }
    



 

  return (
    <div className="userHead">
      <Row>
        <Col sm={8} md={8} lg={8}>
        <h2 className="userTitle">Report</h2>
        </Col>
        <Col sm={2} md={2} lg={2}>
        <Button  className="submitBtn"      
      onClick={GeneratePDF}>Generate Pdf</Button>
        </Col>
        <Col sm={2} md={2} lg={2}>
          
        <Button  className="submitBtn" onClick={exportexcel}>Generate Excel</Button>
        </Col>
      
      
      </Row>
      
      <Form.Row className="acount-filled">
      
      <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} xl={2}>
      
      </Form.Group>   
      <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} xl={2}>
      
      
      </Form.Group>    
      <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} xl={2}>
      
      <Form.Label>Machine</Form.Label>
      <Form.Control as="select" name="machineid"
         value={machineid} 
        onChange={(e)=>InputChange(e)}
        >
                       <option value="" />
                      {machineData.length > 0 ? (
                          machineData.map(i => <option value={i.machineid}>{i.machinename}</option>)
                      ) : (
                          <option value="" />
                      )}
                  </Form.Control>
      </Form.Group>
     
      <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} xl={2}>
      <Form.Label>User</Form.Label>
      <Form.Control as="select" name="userid"
         value={userid} 
        onChange={(e)=>InputChange(e)}
        >
                       <option value="" />
                      {userData.length > 0 ? (
                          userData.map(i => <option value={i.userid}>{i.firstname} {i.lastname} </option>)
                      ) : (
                          <option value="" />
                      )}
                  </Form.Control>
      </Form.Group>
      <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} xl={2}>
        
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            required
            type="date"              
            onChange={e=>DateChange(e)}
            placeholder="date"
            value={startDate}
          //   value="2011-08-19"
            name="startDate"
          />
        </Form.Group>
        <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} xl={2}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            required
            type="date"
            onChange={e=>DateChange(e)}
            placeholder="enddate"
            value={endDate}
            name="endDate"
          />
        </Form.Group>
        </Form.Row>

      <div
        id="CatGrid"
        style={{
          height: "90%",
          width: "99%",
        }}
        className="ag-theme-balham userGrid"
      >
        <AgGridReact
         suppressRowClickSelection={true}
          modules={modules}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          overlayLoadingTemplate={overlayLoadingTemplate}
          onGridReady={onGridReady}
          rowData={rowData}
          pagination
          paginationPageSize="25"
          domLayout={defaultColDef.domLayout}
        />
      </div>
    </div>
  );

}

export default Report



