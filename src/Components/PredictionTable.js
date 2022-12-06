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



export default function CustomizedTables({times,randomValues}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">No of Time b/w Arrivals</StyledTableCell>
            <StyledTableCell align="right">Commulative Probability</StyledTableCell>
            <StyledTableCell align="right">Inter Arrivals</StyledTableCell>
            <StyledTableCell align="right">Arrival Time</StyledTableCell>
            <StyledTableCell align="right">Service Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {randomValues  ? randomValues.map((entry,index) => (
            <StyledTableRow >
              <StyledTableCell align="right">{entry?.timeBWArrivals}</StyledTableCell>
              <StyledTableCell align="right">{entry?.commulativeProb}</StyledTableCell>
              <StyledTableCell align="right">{times?.intArr[index]}</StyledTableCell>
              <StyledTableCell align="right">{times?.arrTime[index]}</StyledTableCell>
              <StyledTableCell align="right">{times?.serTime[index]}</StyledTableCell>
            </StyledTableRow>
          )): null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

