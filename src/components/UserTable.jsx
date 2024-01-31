import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { TableCell } from '@mui/material';

const StyledTableCell = ({ children, isBold, isHeader, ...other }) => {
  return (
    <TableCell
      style={{
        fontWeight: isBold ? 'bold' : 'normal',
        borderBottom: isHeader ? '3px solid #04809c' : 'none',
        backgroundColor: isHeader ? '#04809c' : 'transparent',
        color: isHeader ? 'white' : 'inherit',
        transition: 'background-color 0.3s ease',
      }}
      {...other}
    >
      {children}
    </TableCell>
  );
};

const StyledTableRow = ({ children, isBold, ...other }) => {
  return (
    <TableRow
      style={{
        fontWeight: isBold ? 'bold' : 'normal',
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
        transition: 'background-color 0.3s ease',
      }}
      {...other}
    >
      {children}
    </TableRow>
  );
};

const UserTable = ({ filteredUsers, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleLoginDetailsClick }) => {
  return (
    <TableContainer component={Paper} elevation={3} style={{ marginTop: '10px', marginLeft: '7px', borderRadius: '8px' }}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell isBold isHeader>ID</StyledTableCell>
            <StyledTableCell isBold isHeader>Name</StyledTableCell>
            <StyledTableCell isBold isHeader>Email</StyledTableCell>
            <StyledTableCell isBold isHeader>Role</StyledTableCell>
            <StyledTableCell isBold isHeader>Team</StyledTableCell>
            <StyledTableCell isBold isHeader>Password</StyledTableCell>
            <StyledTableCell isBold isHeader>Login Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredUsers
          ).map((row) => (
            <StyledTableRow key={row.id} isBold={row.status === 'Administrator'}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.username}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>
                {row.status ? row.status : <span style={{ color: 'red' }}>Keine Daten vorhanden</span>}
              </StyledTableCell>
              <StyledTableCell>{row.sicherheitsgruppe}</StyledTableCell>
              <StyledTableCell>{row.password}</StyledTableCell>
              <StyledTableCell>
                <Tooltip title="Show Details" arrow enterTouchDelay={50} leaveTouchDelay={300}>
                  <IconButton
                    color="primary"
                    onClick={() => handleLoginDetailsClick(row)}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        style={{ backgroundColor: '#f5f5f5', borderRadius: '0 0 8px 8px' }}
        rowsPerPageOptions={[4, 6, 8, 10]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UserTable