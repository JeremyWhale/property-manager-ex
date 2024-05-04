import { IcPageHeader, IcButton } from "@ukic/react";
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from '@mui/material/Toolbar';
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Add, Edit, Engineering } from "@mui/icons-material";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import { MenuItem, Modal, TextField, Typography } from "@mui/material";
import formatDisplayDate from "../components/formatdisplayDate";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";

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
  return order === "desc"
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
    id: "dateReported",
    numeric: false,
    disablePadding: false,
    label: "Date Reported",
  },
  {
    id: "property",
    numeric: false,
    disablePadding: false,
    label: "Property",
  },
  {
    id: "problem",
    numeric: false,
    disablePadding: false,
    label: "Problem",
  },
  {
    id: "dateAllocated",
    numeric: false,
    disablePadding: false,
    label: "Date Allocated",
  },
  {
    id: "dateResolved",
    numeric: false,
    disablePadding: false,
    label: "Date Resolved",
  },
  {
    id: "contractor",
    numeric: false,
    disablePadding: false,
    label: "Contractor",
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
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function IssueView() {
  const navigate = useNavigate();
  
  const { setIssueToEdit } = useAppContext()

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("dateReported");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([])
  const [filter, setFilter] = useState("none")
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractorName, setSelectedContractorName] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("");
  const [contractor, setContractor] = useState();

  useEffect(() => {
    axios
      .get(`${apiLocation}/issues/`)
      .then((response) => {
        const data = response.data;
        const mappedRows = data.map((issue) => ({
          id: issue.id,
          dateReported: issue.date_reported,
          property: issue.property,
          problem: issue.problem,
          dateAllocated: issue.date_allocated,
          dateResolved: issue.date_fixed,
          contractor: issue.contractor_responsible,
        }));

        setOriginalRows(mappedRows); // Update the state with the mapped data
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  useEffect(() => {
    if(filter === "unallocated"){
      const data = originalRows.filter(obj => {
        if (obj.dateResolved === "2000-01-01") {
            return true;
        }
        return false;
      })
      setRows(data)
    }
    if(filter === "allocated"){
      const data = originalRows.filter(obj => {
        if (obj.dateResolved === "2000-01-02") {
            return true;
        }
        return false;
      })
      setRows(data)
    }
    if(filter === "resolved"){
      const data = originalRows.filter(obj => {
        if (obj.dateResolved !== "2000-01-01" && obj.dateResolved !== "2000-01-02" && obj.dateResolved.length > 0) {
            return true;
        }
        return false;
      })
      setRows(data)
    }
    if(filter === "none"){
      setRows(originalRows)
    }
  })

  useEffect(() => {
    // Make an Axios GET request to fetch the data
    axios
      .get(`${apiLocation}/contractor-details/${selectedContractorName}/`)
      .then((response) => {
        const data = response.data;
        const mappedContractors = {
          name: data.name,
          address: data.address,
          phoneNumber: data.phone_number,
          email: data.email,
          bankSortCode: data.bank_sort_code,
          bankAccountNumber: data.bank_account_number,
        };

        setContractor(mappedContractors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedContractorName]);

  // Function to open the modal when the contractor name is clicked
  const handleOpenModal = (contractorName, issueID) => {
    setSelectedContractorName(contractorName);
    setSelectedIssueId(issueID);
  };

  const handleNotOpenModal = (contractorName, issueID) => {
    setSelectedContractorName(contractorName);
    setSelectedIssueId(issueID);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleIssueEditSelect = () => {
    setIssueToEdit(selectedIssueId)
    navigate('/issues/edit')
  }

  return (
    <>
      <IcPageHeader heading="Issues">
        <TextField
            slot="input"
            labelId="demo-simple-select-label"
            variant="outlined"
            id="demo-simple-select"
            value={filter}
            label="Filter"
            select
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
        >
          <MenuItem key="none" value="none"> {filter === 'none' ? "No filter" : "Remove filter"}</MenuItem>
          <MenuItem key="allocated" value="allocated">Allocated</MenuItem>
          <MenuItem key="unallocated" value="unallocated">Unallocated</MenuItem>
          <MenuItem key="resolved" value="resolved">Resolved</MenuItem>
        </TextField>
          <>
            {selectedContractorName.length !== 0 && selectedContractorName !== "None" && (
              <IcButton
                slot="actions"
                variant="tertiary"
                onClick={() => setModalOpen(true)}
              >
                <Engineering slot="left-icon" /> Contactor Details
              </IcButton>
            )}
            {selectedIssueId !== "" && (
              <IcButton
                slot="actions"
                variant="tertiary"
                onClick={handleIssueEditSelect}
              >
                <Edit slot="left-icon" /> Edit Issue
              </IcButton>
            )}
          </>        
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate("/issues/add")}
        >
          <Add slot="left-icon" /> Add Issue
        </IcButton>
      </IcPageHeader>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
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
                  let dateAllocatedContent = row.dateAllocated;
                  // Check if the dateResolved is '2000-01-01' and display 'Unresolved' in that case
                  let dateResolvedContent = row.dateResolved;
                  let contractorContent = row.contractor;
                  {
                    row.dateResolved === "2000-01-01" &&
                      (dateAllocatedContent = "Unallocated", dateResolvedContent = "")
                  }
                  {
                    row.dateResolved !== "2000-01-01" &&
                      (dateAllocatedContent = formatDisplayDate(
                        row.dateAllocated
                      ))
                  }
                  {
                    row.dateResolved === "2000-01-01" &&
                      (contractorContent = "None");
                  }
                  {
                    row.contractor.length === 0 &&
                      (contractorContent = "None")
                  }
                  {
                    row.dateResolved === "2000-01-02" &&
                      (dateResolvedContent = "Allocated");
                  }
                  {
                    row.dateResolved !== "2000-01-02" &&
                      row.dateResolved !== "2000-01-01" &&
                      (dateResolvedContent = formatDisplayDate(
                        row.dateResolved
                      )) 
                  }

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        dateResolvedContent !== "Unallocated"
                          ? handleOpenModal(row.contractor, row.id)
                          : handleNotOpenModal("None", row.id);
                      }} // Open modal when contractor name is clicked
                    >
                      <TableCell align="left">
                        {formatDisplayDate(row.dateReported)}
                      </TableCell>
                      <TableCell align="left">{row.property}</TableCell>
                      <TableCell align="left">{row.problem}</TableCell>
                      <TableCell align="left">{dateAllocatedContent}</TableCell>
                      <TableCell align="left">{dateResolvedContent}</TableCell>
                      <TableCell align="left">{contractorContent}</TableCell>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* Material-UI Modal */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 2,
              borderRadius: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {" "}
              Contractor{" "}
            </Typography>
            {contractor?.name && (
              <Typography sx={{ mt: 2 }}>
                <b>Name:</b> {contractor.name}
              </Typography>
            )}
            {contractor?.address && (
              <Typography sx={{ mt: 2 }}>
                <b>Address:</b> {contractor.address}
              </Typography>
            )}
            {contractor?.phoneNumber && (
              <Typography sx={{ mt: 2 }}>
                <b>Phone Number:</b> {contractor.phoneNumber}
              </Typography>
            )}
            {contractor?.email && (
              <Typography sx={{ mt: 2 }}>
                <b>Email:</b> {contractor.email}
              </Typography>
            )}
            {contractor?.bankSortCode && (
              <Typography sx={{ mt: 2 }}>
                <b>Bank Sort Code:</b> {contractor.bankSortCode}
              </Typography>
            )}
            {contractor?.bankAccountNumber && (
              <Typography sx={{ mt: 2 }}>
                <b>Bank Account Number:</b> {contractor.bankAccountNumber}
              </Typography>
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
}
