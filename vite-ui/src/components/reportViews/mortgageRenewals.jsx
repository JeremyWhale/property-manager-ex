import { IcPageHeader, IcButton } from "@ukic/react";
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Add, Edit, Engineering } from "@mui/icons-material";
import axios from "axios";
import apiLocation from "../apiLocation";
import StaticAlert from "../staticAlert";
import formatDisplayDate from "../formatdisplayDate";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'dateDue',
    numeric: false,
    disablePadding: false,
    label: 'Date Due',
  },
  {
    id: 'property',
    numeric: false,
    disablePadding: false,
    label: 'Property',
  },
  {
    id: 'lender',
    numeric: false,
    disablePadding: false,
    label: 'Lender',
  },
  {
    id: 'accountNumber',
    numeric: false,
    disablePadding: false,
    label: 'Account Number',
  },
  {
    id: 'amountBorrowed',
    numeric: false,
    disablePadding: false,
    label: 'Amount Borrowed',
  },
  {
    id: 'interestRate',
    numeric: false,
    disablePadding: false,
    label: 'Interest Rate',
  },
  {
    id: 'monthlyAmount',
    numeric: false,
    disablePadding: false,
    label: 'Monthly Amount',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function MortgageReviewsTable(props) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('dateDue');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(`${apiLocation}/mortgage-renewals-due/${props.range}/`)
      .then(response => {
        const data = response.data;

        // Create an array of Axios requests to fetch the URLs
        const urlRequests = data.map(issue =>
            axios.get(`${apiLocation}/urls/${issue.property}`)
              .then(urlResponse => urlResponse)
              .catch(urlError => {
                console.error(`Error fetching URL for ${issue.property}:`, urlError);
                return ''; // Provide a default value or handle the error as needed
            })
        );

        return Promise.all(urlRequests).then(urlResponses => {
            const mappedRows = data.map((issue, index) => ({
                dateDue: issue.renewal_date,
                property: issue.property,
                lender: issue.lender_name,
                accountNumber: issue.account_number,
                amountBorrowed: issue.amount_borrowed,
                interestRate: issue.interest_rate,
                monthlyAmount: issue.monthly_amount,
                urlLink: urlResponses[index].data[0].other_docs_url, // Use the fetched URL
            }));

            setRows(mappedRows); // Update the state with the mapped data
        })
      })
      .catch(error => {
        console.error("There was an error fetching the issues:", error);
      });
  }, [props.range]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  if(rows.length === 0){
    const rangeMonths = props.range/30
    return(
        <StaticAlert type='success' message={`No Mortgage Renewals due within ${rangeMonths} month(s)`} />
    )
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
              {visibleRows.map((row, index) => {

                  return (
                    <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {window.open(row.urlLink, '_blank');}}
                    >
                      <TableCell align="left">{formatDisplayDate(row.dateDue)}</TableCell>
                      <TableCell align="left">{row.property}</TableCell>
                      <TableCell align="left">{row.lender}</TableCell>
                      <TableCell align="left">{row.accountNumber}</TableCell>
                      <TableCell align="left">£{row.amountBorrowed}</TableCell>
                      <TableCell align="left">{row.interestRate}%</TableCell>
                      <TableCell align="left">£{row.monthlyAmount}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
