import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables({data}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Arrival Time</StyledTableCell>
            <StyledTableCell align="right">Service Time</StyledTableCell>
            <StyledTableCell align="right">Menu</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data  ? data.map((row) => (
            <StyledTableRow >
              <StyledTableCell align="right">{row?.["Customer ID"]}</StyledTableCell>
              <StyledTableCell align="right">{row?.["Arrival Time(minute)"]}</StyledTableCell>
              <StyledTableCell align="right">{row?.["Service Time(minute)"]}</StyledTableCell>
              <StyledTableCell align="right">{row?.["Menu"]}</StyledTableCell>
            </StyledTableRow>
          )): null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

