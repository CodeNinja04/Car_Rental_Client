import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import "./index.css";

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



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m:2
  
};



const Home = () => {
  const baseURL = "https://car-rent-server.herokuapp.com/api/cars";
  
  const [cars, setCars] = useState();
  const [info, setInfo] = useState({
    name: "",
    model: "",
    sku: "",
    price: "",
  });

  const [car, setCar] = useState({
    name: "",
    model: "",
    sku: "",
    price: "",
    clientname:""	,
    clientemail:""	,
    Date:""	,
    Day:""
  });

    const [open, setOpen] = useState(false);
    
    const handleOpen = (row) => {
     
      if(row){
      setOpen(true);

      setCar({name:row.name,model:row.model,sku:row.sku,price:row.price})
      console.log(car)
      }
    
    }
    
    
    const handleClose = () => setOpen(false);



  useEffect(() => {
    async function fetchData() {
      axios.get(baseURL).then((response) => {
        console.log(response.data.cars);
        setCars(response.data.cars);

        console.log(cars);
      });
    }

    fetchData();
    console.log(info)
  }, []);


  let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(baseURL+"/register",info,config).then((response) => {

      alert("CAR IS ADDED ")
      console.log(response);
    });
  };

   const SubmitRecord = (e) => {
     e.preventDefault();

     axios.post(baseURL+"/record", car, config).then((response) => {
       alert("Record updated");
       console.log(response);
     });
   };

  
  if (cars == null || cars === "") {
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

      <div className="car-input">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Car Name"
            focused
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <TextField
            label="Model"
            color="primary"
            focused
            onChange={(e) => setInfo({ ...info, model: e.target.value })}
          />
          <TextField
            label="SKU"
            color="primary"
            focused
            onChange={(e) => setInfo({ ...info, sku: e.target.value })}
          />
          <TextField
            label="Price (USD)"
            color="primary"
            focused
            onChange={(e) => setInfo({ ...info, price: e.target.value })}
          />

          <Button
            size="large"
            style={{ backgroundColor: "#673AB7", color: "white" }}
            onClick={handleSubmit}
          >
            {" "}
            Add
          </Button>
        </Box>
      </div>

      <div style={{ marginTop: "2%", fontWeight: "bold" }}>CAR LIST</div>

      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ width: "50%", margin: "auto", marginTop: "5%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                {/* <StyledTableCell>Check</StyledTableCell> */}
                <StyledTableCell>Sr. No.</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Model</StyledTableCell>
                <StyledTableCell align="left">SKU</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="right">Created at</StyledTableCell>
                <StyledTableCell align="right">Sell Car</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {cars.map((row, iterator) => (
                <StyledTableRow
                  key={iterator}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <StyledTableCell>
                    <Checkbox {...label} defaultChecked color="secondary" />
                  </StyledTableCell> */}
                  <StyledTableCell component="th" scope="row">
                    {iterator + 1}
                  </StyledTableCell>

                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.model}</StyledTableCell>
                  <StyledTableCell align="left">{row.sku}</StyledTableCell>
                  <StyledTableCell align="left">${row.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleOpen(row)}>SELL</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <p style={{ paddingTop: "3%" }}>Made By: Hemendra Sharma </p>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ display: "flex", flexDirection: "column",justifyContent:"center",margin:"auto",alignItems:"center" }}>

              <p style={{fontSize:"2rem",fontWeight:"bold",color:"skyblue"}}>Please Fill The Details</p>
              <p>
                <TextField
                  label="Client Name"
                  focused
                  onChange={(e) =>
                    setCar({ ...car, clientname: e.target.value })
                  }
                />
              </p>

              <p>
                <TextField
                  label="Client Email"
                  focused
                  onChange={(e) =>
                    setCar({ ...car, clientemail: e.target.value })
                  }
                />
              </p>
              <p>
                <TextField
                  label="Date"
                  focused
                  onChange={(e) => setCar({ ...car, date: e.target.value })}
                />
              </p>
              <p>
                <TextField
                  label="Day"
                  focused
                  onChange={(e) => setCar({ ...car, day: e.target.value })}
                />
              </p>

              <p>
                <Button variant="contained" onClick={SubmitRecord}>
                  SEND
                </Button>
              </p>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Home;
