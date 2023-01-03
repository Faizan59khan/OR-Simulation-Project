import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function CustomizedTables({ times, randomValues }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              No of Time b/w Arrivals
            </StyledTableCell>
            <StyledTableCell align="center">
              Commulative Probability
            </StyledTableCell>
            <StyledTableCell align="center">Inter Arrivals</StyledTableCell>
            <StyledTableCell align="center">Arrival Time</StyledTableCell>
            <StyledTableCell align="center">Service Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {randomValues
            ? randomValues.map((entry, index) => (
                <StyledTableRow>
                  <StyledTableCell align="center">
                    {entry?.timeBWArrivals}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {entry?.commulativeProb}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {times?.intArr[index]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {times?.arrTime[index]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {times?.serTime[index]}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
