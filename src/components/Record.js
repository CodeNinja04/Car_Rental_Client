import "./index.css";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const baseURL = "http://localhost:5000/api/cars/records";
  const [record, setRecord] = useState();
  const [id,setId]=useState(0)
//   useEffect(() => {
//     async function fetchData() {
//       axios.get(baseURL).then((response) => {
//         console.log(response.data.rec);
//         setRecords(response.data.rec);

//         console.log(records);
//       });
//     }

//     fetchData();
//   }, []);

const getRecord = async() => {

     axios.get(baseURL).then((response) => {
        console.log(response.data.rec);
        setRecord(response.data.rec);

        console.log(record);
     }) }


if (record == null || record === "") {
    //fetchData()
    return (
      <>
        <div className="landing-wrapper">
          <div id="heading">Car Rental Management</div>

          <div
            style={{
              width: "50%",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            CARS
          </div>
          <div style={{ textAlign: "center", padding: "10%" }}>
            <Box sx={{ color: "grey.500" }}>
              <CircularProgress color="inherit" />
            </Box>
          </div>
        </div>
      </>
    );
  }

 
  return (
    <div class="landing-wrapper">
      <div id="heading">Car Rental Management</div>

      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Product ID"
          onChange={(e) => setId(e.target.value)}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search" onClick={getRecord}>
          <SearchIcon />
        </IconButton>


        <TableContainer
          component={Paper}
          sx={{ width: "80%", margin: "auto", marginTop: "5%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Sr. No.</StyledTableCell>

                <StyledTableCell align="left">Car ID</StyledTableCell>
                <StyledTableCell align="left">Car Name</StyledTableCell>
                <StyledTableCell align="left">Car Model</StyledTableCell>
                <StyledTableCell align="left">Car Price</StyledTableCell>
                <StyledTableCell align="left">Car SKU</StyledTableCell>
                <StyledTableCell align="left">Client Name</StyledTableCell>
                <StyledTableCell align="left">Client Email</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Day</StyledTableCell>
                <StyledTableCell align="right">Created at</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {record.map((row, iterator) => (
                <StyledTableRow
                  key={iterator}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {iterator + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.car}</StyledTableCell>
                  <StyledTableCell align="left">{row.carname}</StyledTableCell>
                  <StyledTableCell align="left">{row.carmodel}</StyledTableCell>
                  <StyledTableCell align="left">
                    ${row.carprice}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.carsku}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.clientname}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.clientemail}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell align="left">{row.day}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.createdAt}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <p style={{ paddingTop: "3%" }}>Made By: Hemendra Sharma </p>
    </div>
  );
};

export default Home;
