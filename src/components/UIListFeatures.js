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
    textTransform: "capitalize",
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

export default function UILisFeatures({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">id</StyledTableCell>
            <StyledTableCell align="left">type</StyledTableCell>
            <StyledTableCell align="left">external id</StyledTableCell>
            <StyledTableCell align="left">magnitude</StyledTableCell>
            <StyledTableCell align="left">place</StyledTableCell>
            <StyledTableCell align="left">time</StyledTableCell>
            <StyledTableCell align="left">tsunami</StyledTableCell>
            <StyledTableCell align="left">mag type</StyledTableCell>
            <StyledTableCell align="left">title</StyledTableCell>
            <StyledTableCell align="left">longitude</StyledTableCell>
            <StyledTableCell align="left">latitude</StyledTableCell>
            <StyledTableCell align="left">external url</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <StyledTableCell align="left">{row.type}</StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.external_id}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.magnitude}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.place}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.time}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.tsunami ? "true" : "false"}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.mag_type}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.title}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.coordinates.longitude}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.attributes.coordinates.latitude}
              </StyledTableCell>

              <StyledTableCell align="left">
                {row.links.external_url}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
