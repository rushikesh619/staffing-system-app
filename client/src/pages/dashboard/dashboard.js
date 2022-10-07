import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Link
} from "@mui/material";
import axios from "axios";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DevContainer = styled("div")({
    textAlign: "center",
    maxHeight: "50%",
    maxWidth: "50%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto"
});


export default function Dashboard() {

  useEffect(() => {
    axios
      .get("/api/vendors/getVendorsDetails")
      .then((res) => {
        console.log(res?.data?.result)
        setVendorsDetailsList(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [vendorsDetailsList, setVendorsDetailsList] = useState([]);

  return (
    <DevContainer>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Vendor Name</TableCell>
            <TableCell align="right">Technology</TableCell>
            <TableCell align="right">Resume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorsDetailsList.map((row) => (
            <TableRow
              key={row.fullName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="right">{row.vendorName}</TableCell>
              <TableCell align="right">{row.technology}</TableCell>
              <TableCell align="right">      <Link href={row.resumeFile} underline="none">
        view file
      </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </DevContainer>
  );
}
