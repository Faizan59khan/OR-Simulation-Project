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

export default function CustomizedTables({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Arrival Time</StyledTableCell>
            <StyledTableCell align="center">Service Time</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
            <StyledTableCell align="center">Turn Around Time</StyledTableCell>
            <StyledTableCell align="center">Wait Time</StyledTableCell>
            <StyledTableCell align="center">Response Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? data.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">
                    {row?.["arrT"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.["serT"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.["startT"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.["endT"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.["turnAroundTime"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.["waitTime"]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.["responseTime"]}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
